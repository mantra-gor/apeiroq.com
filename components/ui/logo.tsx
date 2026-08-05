import Image from "next/image";
import lockupInk from "@/public/logos/apeiroq-lockup-ink.png";
import lockupWhite from "@/public/logos/apeiroq-lockup-white.png";
import { cn } from "@/lib/utils";

/**
 * The supplied Apeiroq lockup (mark + wordmark).
 *
 * Both files are generated from public/logos/apeiroq-logo-transparent-horizontal.png:
 * tightly trimmed, transparent, and recoloured to --ink for light canvases.
 * Regenerate both if the source artwork changes.
 *
 * Statically imported so next/image gets intrinsic dimensions at build time —
 * width and height are always in the HTML, so the logo cannot shift layout.
 */

/** Trimmed artwork: 790x167 overall, the mark occupying the left 146px. */
const LOCKUP_RATIO = 790 / 167;
const MARK_RATIO = 146 / 167;

export function Logo({
  tone = "ink",
  collapsed = false,
  height = 28,
  className,
}: {
  /** "adaptive" renders both and lets CSS pick — used by the overlay header. */
  tone?: "ink" | "white" | "adaptive";
  /**
   * Clip to the mark alone. The morph is a width transition on one asset
   * rather than an asset swap, so nothing extra is downloaded (DESIGN.md §2 #7).
   */
  collapsed?: boolean;
  height?: number;
  className?: string;
}) {
  const width = Math.round(height * LOCKUP_RATIO);
  const markWidth = Math.round(height * MARK_RATIO);

  return (
    <span
      className={cn(
        "inline-block overflow-hidden",
        "transition-[width] duration-240 ease-standard",
        className,
      )}
      style={{ height, width: collapsed ? markWidth : width }}
    >
      <span className="relative block" style={{ height, width }}>
        {tone !== "white" && (
          <Image
            data-logo="ink"
            src={lockupInk}
            alt=""
            height={height}
            width={width}
            loading="eager"
            className="absolute inset-0 transition-opacity duration-240 ease-standard"
          />
        )}
        {tone !== "ink" && (
          <Image
            data-logo="white"
            src={lockupWhite}
            alt=""
            height={height}
            width={width}
            loading="eager"
            className="absolute inset-0 transition-opacity duration-240 ease-standard"
          />
        )}
      </span>
    </span>
  );
}
