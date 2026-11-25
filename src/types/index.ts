export type TransactionType = 'income' | 'expense';
export interface Category { id: string; name: string; type: TransactionType; icon: string; color: string; }
export type TransactionSource = 'manual' | 'open_finance';
export interface Transaction {
  id: string; user_id: string; category_id: string; type: TransactionType; description: string;
  amount: number; date: string; created_at: string; category: Category | null;
  source: TransactionSource; connection_id: string | null; external_id: string | null; account_name: string | null;
}
export interface TransactionInput { category_id: string; type: TransactionType; description: string; amount: number; date: string; }
export interface BankConnection { id: string; pluggy_item_id: string; institution_name: string; institution_image_url: string | null; status: 'connected' | 'error'; last_error: string | null; last_synced_at: string | null; created_at: string; }
export interface SyncResult { connection_id: string; imported: number; fetched: number; }
