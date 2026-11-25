import type { Transaction } from '@/types';
import { isoToBr } from './date';
function cell(value: string): string { const safe = /^[=+\-@]/.test(value) ? `'${value}` : value; return `"${safe.replace(/"/g, '""')}"`; }
export function toCsv(transactions: Transaction[]): string {
  const header = 'data;tipo;categoria;descricao;valor';
  const rows = transactions.map((t) => [isoToBr(t.date), t.type === 'income' ? 'Receita' : 'Despesa', cell(t.category?.name ?? ''), cell(t.description), t.amount.toFixed(2).replace('.', ',')].join(';'));
  return [header, ...rows].join('\n');
}
