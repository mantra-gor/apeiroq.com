import { cn } from "@/lib/utils";

/** Content shell: 1280px max, gutter padding. DESIGN.md §6. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-[1280px] px-gutter", className)}>
      {children}
    </div>
  );
}
