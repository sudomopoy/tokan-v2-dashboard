export function tomanToIrr(toman: string | number) {
  const n = Number(String(toman).replace(/,/g, ""));
  if (!Number.isFinite(n) || n <= 0) return null;
  return Math.round(n * 10);
}

export function irrToTomanDisplay(irr: number) {
  const n = Math.floor(Number(irr) / 10);
  if (!Number.isFinite(n)) return "0";
  return n.toLocaleString("fa-IR");
}
