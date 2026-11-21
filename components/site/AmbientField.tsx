export function AmbientField() {
  return (
    <div
      aria-hidden="true"
      className="site-ambient pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="site-ambient__orb site-ambient__orb--a" />
      <div className="site-ambient__orb site-ambient__orb--b" />
      <div className="site-ambient__orb site-ambient__orb--c" />
      <div className="site-ambient__grain" />
    </div>
  );
}
