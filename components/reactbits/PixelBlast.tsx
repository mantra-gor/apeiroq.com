"use client";

/**
 * PixelBlast — dithered pixel field on a fullscreen WebGL quad.
 *
 * Source:  https://reactbits.dev/backgrounds/pixel-blast
 * Variant: PixelBlast-TS-TW (registry: https://reactbits.dev/r/PixelBlast-TS-TW.json)
 * Added:   2026-08-05
 *
 * Heavily stripped from upstream — per CLAUDE.md, once vendored this is our
 * code. What was removed and why:
 *
 * - `liquid` / `liquidStrength` / `liquidRadius` / `liquidWobbleSpeed` and the
 *   pointer touch-texture, plus `noiseAmount`. Both branches were the only
 *   consumers of `postprocessing` (EffectComposer / EffectPass / Effect), so
 *   dropping them drops that dependency entirely — `three` is now the only
 *   runtime this component pulls in.
 * - `enableRipples` and the pointer handlers. The click-ripple loop ran ten
 *   iterations per fragment and added pointerdown/pointermove listeners over
 *   the whole hero, which costs INP for an effect sitting behind an <h1>.
 * - `variant` / the circle, triangle and diamond masks. We use `square`, which
 *   needs no mask function at all (coverage is the value).
 * - `antialias`. We draw hard-edged blocks; MSAA changes nothing visible and
 *   costs fill rate. Hardcoded off.
 * - `transparent`. Always transparent — this composites over `--color-ink`.
 * - `pixelSizeJitter`, `style`. Unused at the call site.
 *
 * Two upstream bugs fixed:
 * - `autoPauseOffscreen` did nothing: `visibilityRef` was initialised to
 *   `{ visible: true }` and never written to. It now backs a real
 *   IntersectionObserver, and also pauses on tab hide.
 * - Device pixel ratio was capped at 2, which quadruples fill rate on a retina
 *   display for a full-viewport quad. Capped at 1.5; `uPixelSize` scales with
 *   the ratio, so the pixels stay the same visual size either way.
 *
 * Props are read once at mount — the call site passes literals. Nothing here
 * reacts to prop changes, which is what lets the effect be a single mount-once
 * pass instead of upstream's 20-dependency reinitialisation branch.
 */

import { useEffect, useRef } from "react";
import {
  Clock,
  Color,
  GLSL3,
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

type PixelBlastProps = {
  /** Any CSS colour string. Pass a resolved value — not a CSS custom property. */
  color?: string;
  /** Block size in CSS pixels. */
  pixelSize?: number;
  /** Noise frequency. Higher = busier field. */
  patternScale?: number;
  /** Coverage. Higher = more lit blocks. */
  patternDensity?: number;
  /** Animation rate. */
  speed?: number;
  /** 0–0.5. Fades the field out towards the viewport edges. */
  edgeFade?: number;
  className?: string;
};

const VERTEX_SRC = /* glsl */ `
void main() {
  gl_Position = vec4(position, 1.0);
}
`;

const FRAGMENT_SRC = /* glsl */ `
precision highp float;

uniform vec3  uColor;
uniform vec2  uResolution;
uniform float uTime;
uniform float uPixelSize;
uniform float uScale;
uniform float uDensity;
uniform float uEdgeFade;

out vec4 fragColor;

float Bayer2(vec2 a) {
  a = floor(a);
  return fract(a.x / 2. + a.y * a.y * .75);
}
#define Bayer4(a) (Bayer2(.5*(a))*0.25 + Bayer2(a))
#define Bayer8(a) (Bayer4(.5*(a))*0.25 + Bayer2(a))

/*
 * Upstream uses 5. Each octave is 8 hash11() calls — 8 sin() per fragment —
 * and at 5 octaves this shader alone was eating the frame budget across a full
 * viewport, which is what made scrolling stutter.
 *
 * Octaves 4 and 5 contribute detail finer than the 8*pixelSize cell the result
 * is quantised into, so almost all of that work was being thrown away before it
 * reached a pixel. Three is where the field stops changing visibly.
 */
#define FBM_OCTAVES     3
#define FBM_LACUNARITY  1.25
#define FBM_GAIN        1.0

float hash11(float n){ return fract(sin(n)*43758.5453); }

float vnoise(vec3 p){
  vec3 ip = floor(p);
  vec3 fp = fract(p);
  float n000 = hash11(dot(ip + vec3(0.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n100 = hash11(dot(ip + vec3(1.0,0.0,0.0), vec3(1.0,57.0,113.0)));
  float n010 = hash11(dot(ip + vec3(0.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n110 = hash11(dot(ip + vec3(1.0,1.0,0.0), vec3(1.0,57.0,113.0)));
  float n001 = hash11(dot(ip + vec3(0.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n101 = hash11(dot(ip + vec3(1.0,0.0,1.0), vec3(1.0,57.0,113.0)));
  float n011 = hash11(dot(ip + vec3(0.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  float n111 = hash11(dot(ip + vec3(1.0,1.0,1.0), vec3(1.0,57.0,113.0)));
  vec3 w = fp*fp*fp*(fp*(fp*6.0-15.0)+10.0);
  float x00 = mix(n000, n100, w.x);
  float x10 = mix(n010, n110, w.x);
  float x01 = mix(n001, n101, w.x);
  float x11 = mix(n011, n111, w.x);
  float y0  = mix(x00, x10, w.y);
  float y1  = mix(x01, x11, w.y);
  return mix(y0, y1, w.z) * 2.0 - 1.0;
}

float fbm2(vec2 uv, float t){
  vec3 p = vec3(uv * uScale, t);
  float amp = 1.0;
  float freq = 1.0;
  float sum = 1.0;
  for (int i = 0; i < FBM_OCTAVES; ++i){
    sum  += amp * vnoise(p * freq);
    freq *= FBM_LACUNARITY;
    amp  *= FBM_GAIN;
  }
  return sum * 0.5 + 0.5;
}

void main(){
  float pixelSize = uPixelSize;
  vec2 fragCoord = gl_FragCoord.xy - uResolution * .5;
  float aspectRatio = uResolution.x / uResolution.y;

  float cellPixelSize = 8.0 * pixelSize;
  vec2 cellId = floor(fragCoord / cellPixelSize);
  vec2 cellCoord = cellId * cellPixelSize;
  vec2 uv = cellCoord / uResolution * vec2(aspectRatio, 1.0);

  float base = fbm2(uv, uTime * 0.05);
  base = base * 0.5 - 0.65;

  float feed = base + (uDensity - 0.5) * 0.3;

  float bayer = Bayer8(fragCoord / uPixelSize) - 0.5;
  float M = step(0.5, feed + bayer);

  if (uEdgeFade > 0.0) {
    vec2 norm = gl_FragCoord.xy / uResolution;
    float edge = min(min(norm.x, norm.y), min(1.0 - norm.x, 1.0 - norm.y));
    M *= smoothstep(0.0, uEdgeFade, edge);
  }

  vec3 color = uColor;

  // Linear -> sRGB, so the colour lands where the token says it should.
  vec3 srgbColor = mix(
    color * 12.92,
    1.055 * pow(color, vec3(1.0 / 2.4)) - 0.055,
    step(0.0031308, color)
  );

  fragColor = vec4(srgbColor, M);
}
`;

export default function PixelBlast({
  color = "#ffffff",
  pixelSize = 4,
  patternScale = 2,
  patternDensity = 1,
  speed = 0.5,
  edgeFade = 0.5,
  className,
}: PixelBlastProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Read once at mount. Refs, not deps — see the header note.
  const props = useRef({
    color,
    pixelSize,
    patternScale,
    patternDensity,
    speed,
    edgeFade,
  });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const {
      color,
      pixelSize,
      patternScale,
      patternDensity,
      speed,
      edgeFade,
    } = props.current;

    const renderer = new WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: "high-performance",
    });
    /*
     * Deliberately 1, not devicePixelRatio. This draws hard-edged blocks whose
     * CSS size is held constant by scaling uPixelSize with the ratio, so a
     * retina buffer buys no visible sharpness — it only quadruples the number
     * of fragments, which is pure cost on the shared frame budget the page
     * needs for scrolling.
     */
    renderer.setPixelRatio(1);
    renderer.setClearAlpha(0);

    const canvas = renderer.domElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    container.appendChild(canvas);

    const uniforms = {
      uResolution: { value: new Vector2(0, 0) },
      uTime: { value: 0 },
      uColor: { value: new Color(color) },
      uPixelSize: { value: pixelSize * renderer.getPixelRatio() },
      uScale: { value: patternScale },
      uDensity: { value: patternDensity },
      uEdgeFade: { value: edgeFade },
    };

    const scene = new Scene();
    const camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new PlaneGeometry(2, 2);
    const material = new ShaderMaterial({
      vertexShader: VERTEX_SRC,
      fragmentShader: FRAGMENT_SRC,
      uniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      glslVersion: GLSL3,
    });
    scene.add(new Mesh(geometry, material));

    const setSize = () => {
      renderer.setSize(container.clientWidth || 1, container.clientHeight || 1, false);
      uniforms.uResolution.value.set(canvas.width, canvas.height);
      uniforms.uPixelSize.value = pixelSize * renderer.getPixelRatio();
    };
    setSize();

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);

    /*
     * Pause whenever the field cannot be seen — scrolled past, or the tab is in
     * the background. Upstream exposed this as a prop but never wired it up; an
     * unthrottled rAF loop running under the rest of the page is exactly the
     * kind of thing the DESIGN.md §9 TBT budget is there to prevent.
     */
    let onScreen = true;
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const clock = new Clock();
    // Desynchronise the loop start so a reload does not always show frame zero.
    const timeOffset = Math.random() * 1000;

    /*
     * Redraw at 30fps, not 60.
     *
     * The field drifts slowly by design, so half the frames are indistinguish-
     * able — and handing every other frame back to the compositor is what keeps
     * scrolling smooth while the hero is on screen. This is the single largest
     * saving in the component.
     */
    const frameInterval = 1 / 30;
    let lastFrame = -Infinity;

    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!onScreen || document.hidden) return;

      const elapsed = clock.getElapsedTime();
      if (elapsed - lastFrame < frameInterval) return;
      lastFrame = elapsed;

      uniforms.uTime.value = timeOffset + elapsed * speed;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.remove();
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
