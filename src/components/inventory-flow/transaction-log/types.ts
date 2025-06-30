
export interface Transaction {
  id: string;
  date: string;
  time: string;
  from: string;
  to: string;
  product: string;
  quantity: number;
  type: 'Receipt from Factory' | 'Assignment to DA' | 'Return from DA' | 'Transfer Between DAs' | 'Return to Factory';
  initiated_by: string;
  status: 'Completed' | 'In Transit' | 'Pending' | 'Failed';
  reference_number: string;
  notes?: string;
}

export interface TransactionFilters {
  da_filter: string;
  product_filter: string;
  date_from: string;
  date_to: string;
  movement_type: string;
  search_term: string;
  status_filter: string;
}

export interface SortConfig {
  key: keyof Transaction;
  direction: 'asc' | 'desc';
}
