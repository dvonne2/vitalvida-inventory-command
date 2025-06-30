
import { Transaction, TransactionFilters, SortConfig } from './types';

export const filterTransactions = (
  transactions: Transaction[],
  filters: TransactionFilters
): Transaction[] => {
  return transactions.filter(transaction => {
    const matchesSearch = !filters.search_term || 
      transaction.id.toLowerCase().includes(filters.search_term.toLowerCase()) ||
      transaction.product.toLowerCase().includes(filters.search_term.toLowerCase()) ||
      transaction.from.toLowerCase().includes(filters.search_term.toLowerCase()) ||
      transaction.to.toLowerCase().includes(filters.search_term.toLowerCase()) ||
      transaction.reference_number.toLowerCase().includes(filters.search_term.toLowerCase());

    const matchesDA = filters.da_filter === 'all' || 
      transaction.from === filters.da_filter || 
      transaction.to === filters.da_filter;

    const matchesProduct = filters.product_filter === 'all' || 
      transaction.product === filters.product_filter;

    const matchesType = filters.movement_type === 'all' || 
      transaction.type === filters.movement_type;

    const matchesStatus = filters.status_filter === 'all' || 
      transaction.status === filters.status_filter;

    const matchesDateFrom = !filters.date_from || 
      transaction.date >= filters.date_from;

    const matchesDateTo = !filters.date_to || 
      transaction.date <= filters.date_to;

    return matchesSearch && matchesDA && matchesProduct && matchesType && 
           matchesStatus && matchesDateFrom && matchesDateTo;
  });
};

export const sortTransactions = (
  transactions: Transaction[],
  sortConfig: SortConfig
): Transaction[] => {
  return [...transactions].sort((a, b) => {
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (sortConfig.key === 'date') {
      const aDateTime = new Date(`${a.date} ${a.time}`);
      const bDateTime = new Date(`${b.date} ${b.time}`);
      return sortConfig.direction === 'asc' 
        ? aDateTime.getTime() - bDateTime.getTime()
        : bDateTime.getTime() - aDateTime.getTime();
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    const aStr = String(aValue).toLowerCase();
    const bStr = String(bValue).toLowerCase();
    
    return sortConfig.direction === 'asc' 
      ? aStr.localeCompare(bStr)
      : bStr.localeCompare(aStr);
  });
};

export const exportToCSV = (transactions: Transaction[]): void => {
  const csvContent = [
    ['ID', 'Date', 'Time', 'From', 'To', 'Product', 'Quantity', 'Type', 'Status', 'Reference', 'Initiated By'].join(','),
    ...transactions.map(t => [
      t.id, t.date, t.time, t.from, t.to, t.product, t.quantity, t.type, t.status, t.reference_number, t.initiated_by
    ].join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `transaction-log-${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};
