/** Corner brackets for HUD frames. Place inside a `relative` element. */
export default function Brackets() {
  const corner = "border-ink pointer-events-none absolute size-2.5";
  return (
    <>
      <span aria-hidden="true" className={`${corner} -top-1 -left-1 border-t border-l`} />
      <span aria-hidden="true" className={`${corner} -top-1 -right-1 border-t border-r`} />
      <span aria-hidden="true" className={`${corner} -bottom-1 -left-1 border-b border-l`} />
      <span aria-hidden="true" className={`${corner} -right-1 -bottom-1 border-r border-b`} />
    </>
  );
}
