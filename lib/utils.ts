import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Compose Tailwind classes, resolving conflicts so later wins. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
