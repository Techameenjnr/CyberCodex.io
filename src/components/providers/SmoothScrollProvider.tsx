/**
 * SmoothScrollProvider
 *
 * Currently disabled to allow native browser scrolling with scroll wheel.
 * Native scrolling provides better compatibility and instant response.
 * CSS smooth scroll-behavior is used instead (see globals.css).
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  // Using native browser scrolling for proper scroll wheel support
  return <>{children}</>;
}
