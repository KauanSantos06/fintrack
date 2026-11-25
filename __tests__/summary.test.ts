import type { Category, Transaction } from '@/types';
import { toCsv } from '@/utils/csv';
import { filterTransactions, groupByDate, summarize } from '@/utils/summary';
const food: Category = { id: 'c1', name: 'Alimentação', type: 'expense', icon: 'restaurant', color: '#F97316' };
function make(partial: Partial<Transaction> & Pick<Transaction, 'id'>): Transaction { return { user_id: 'u1', category_id: 'c1', type: 'expense', description: 'Teste', amount: 10, date: '2026-09-10', created_at: '2026-09-10T12:00:00Z', category: food, source: 'manual', connection_id: null, external_id: null, account_name: null, ...partial }; }
const list: Transaction[] = [make({ id: '1', type: 'income', amount: 3000, description: 'Salário' }), make({ id: '2', amount: 0.1 }), make({ id: '3', amount: 0.2 })];
describe('summarize', () => { it('soma receitas, despesas e saldo', () => { const s = summarize(list); expect(s.income).toBe(3000); expect(s.expense).toBe(0.3); expect(s.balance).toBe(2999.7); }); });
describe('toCsv', () => { it('gera cabeçalho e linhas', () => { const csv = toCsv([list[0]]); expect(csv).toContain('Receita'); }); });
