export const MONTHS_PT = ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'];
export interface YearMonth { year: number; month: number; }
const pad = (n: number) => String(n).padStart(2, '0');
export function toISO(date: Date): string { return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`; }
export function todayISO(): string { return toISO(new Date()); }
export function addDaysISO(iso: string, days: number): string { const [y, m, d] = iso.split('-').map(Number); return toISO(new Date(y, m - 1, d + days)); }
export function isoToBr(iso: string): string { const [y, m, d] = iso.split('-'); return `${d}/${m}/${y}`; }
export function brToISO(br: string): string | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(br.trim()); if (!match) return null;
  const day = Number(match[1]); const month = Number(match[2]); const year = Number(match[3]);
  const check = new Date(year, month - 1, day);
  const valid = check.getFullYear() === year && check.getMonth() === month - 1 && check.getDate() === day;
  return valid ? `${match[3]}-${match[2]}-${match[1]}` : null;
}
export function maskBrDate(text: string): string {
  const digits = text.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}
export function currentYearMonth(): YearMonth { const now = new Date(); return { year: now.getFullYear(), month: now.getMonth() + 1 }; }
export function shiftMonth(ym: YearMonth, delta: number): YearMonth { const index = ym.year * 12 + (ym.month - 1) + delta; return { year: Math.floor(index / 12), month: (index % 12) + 1 }; }
export function monthRange(ym: YearMonth): { start: string; endExclusive: string } { const next = shiftMonth(ym, 1); return { start: `${ym.year}-${pad(ym.month)}-01`, endExclusive: `${next.year}-${pad(next.month)}-01` }; }
export function monthLabel(ym: YearMonth): string { return `${MONTHS_PT[ym.month - 1]} ${ym.year}`; }
export function dayLabel(iso: string, today: string = todayISO()): string { if (iso === today) return 'Hoje'; if (iso === addDaysISO(today, -1)) return 'Ontem'; return isoToBr(iso).slice(0, 5); }
