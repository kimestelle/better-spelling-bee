/** One random duck briefly flaps every two seconds; no positional idle motion. */
export function startIdleFlapping(count: number, show: (index: number | null) => void, canFlap = () => true, random = Math.random) {
  let finish: ReturnType<typeof setTimeout> | undefined;
  const interval = setInterval(() => {
    if (!count || !canFlap()) return;
    show(Math.min(count - 1, Math.floor(random() * count)));
    finish = setTimeout(() => show(null), 400);
  }, 2000);
  return () => { clearInterval(interval); clearTimeout(finish); };
}
