
import React, { useState, useEffect, useMemo } from 'react';
import { useToast } from '@/hooks/use-toast';
import TransactionHeader from './transaction-log/TransactionHeader';
import TransactionFiltersComponent from './transaction-log/TransactionFilters';
import TransactionTable from './transaction-log/TransactionTable';
import TransactionPagination from './transaction-log/TransactionPagination';
import { Transaction, TransactionFilters, SortConfig } from './transaction-log/types';
import { filterTransactions, sortTransactions, exportToCSV } from './transaction-log/utils';

const TransactionLogTab = () => {
  const [filters, setFilters] = useState<TransactionFilters>({
    da_filter: 'all',
    product_filter: 'all',
    date_from: '',
    date_to: '',
    movement_type: 'all',
    search_term: '',
    status_filter: 'all'
  });
  
  const [sortConfig, setSortConfig] = useState<SortConfig>({ 
    key: 'date', 
    direction: 'desc' 
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  
  const { toast } = useToast();

  const movementTypes = [
    'Receipt from Factory',
    'Assignment to DA',
    'Return from DA',
    'Transfer Between DAs',
    'Return to Factory'
  ];

  const deliveryAgents = [
    'Femi Adebayo',
    'Tobi Johnson',
    'Amaka Okafor',
    'Kemi Williams',
    'Chidi Okonkwo',
    'Ngozi Ikechi'
  ];

  const products = [
    'Fulani Shampoo',
    'Hydration Tea',
    'Pomade',
    'Conditioner',
    'Body Lotion',
    'Face Cream'
  ];

  const statusOptions = ['Completed', 'In Transit', 'Pending', 'Failed'];

  // Enhanced mock transaction data with more realistic entries
  const [transactions] = useState<Transaction[]>([
    {
      id: 'TXN-001',
      date: '2024-01-17',
      time: '14:30',
      from: 'Factory',
      to: 'Central Warehouse',
      product: 'Fulani Shampoo',
      quantity: 500,
      type: 'Receipt from Factory',
      initiated_by: 'Sarah Johnson',
      status: 'Completed',
      reference_number: 'RF-2024-001',
      notes: 'Batch #FS-240117'
    },
    {
      id: 'TXN-002',
      date: '2024-01-17',
      time: '15:45',
      from: 'Central Warehouse',
      to: 'Femi Adebayo',
      product: 'Fulani Shampoo',
      quantity: 50,
      type: 'Assignment to DA',
      initiated_by: 'Michael Chen',
      status: 'Completed',
      reference_number: 'AD-2024-001'
    },
    {
      id: 'TXN-003',
      date: '2024-01-17',
      time: '09:15',
      from: 'Tobi Johnson',
      to: 'Central Warehouse',
      product: 'Pomade',
      quantity: 15,
      type: 'Return from DA',
      initiated_by: 'Tobi Johnson',
      status: 'Completed',
      reference_number: 'RD-2024-001',
      notes: 'Damaged packaging'
    },
    {
      id: 'TXN-004',
      date: '2024-01-17',
      time: '11:20',
      from: 'Femi Adebayo',
      to: 'Amaka Okafor',
      product: 'Hydration Tea',
      quantity: 25,
      type: 'Transfer Between DAs',
      initiated_by: 'Sarah Johnson',
      status: 'In Transit',
      reference_number: 'TD-2024-001'
    },
    {
      id: 'TXN-005',
      date: '2024-01-16',
      time: '13:10',
      from: 'Central Warehouse',
      to: 'Factory',
      product: 'Conditioner',
      quantity: 30,
      type: 'Return to Factory',
      initiated_by: 'Michael Chen',
      status: 'Completed',
      reference_number: 'RF-2024-002'
    },
    {
      id: 'TXN-006',
      date: '2024-01-16',
      time: '16:30',
      from: 'Factory',
      to: 'Central Warehouse',
      product: 'Body Lotion',
      quantity: 300,
      type: 'Receipt from Factory',
      initiated_by: 'Sarah Johnson',
      status: 'Completed',
      reference_number: 'RF-2024-003'
    },
    {
      id: 'TXN-007',
      date: '2024-01-16',
      time: '10:45',
      from: 'Central Warehouse',
      to: 'Chidi Okonkwo',
      product: 'Face Cream',
      quantity: 40,
      type: 'Assignment to DA',
      initiated_by: 'Michael Chen',
      status: 'Pending',
      reference_number: 'AD-2024-002'
    },
    {
      id: 'TXN-008',
      date: '2024-01-15',
      time: '12:15',
      from: 'Ngozi Ikechi',
      to: 'Central Warehouse',
      product: 'Hydration Tea',
      quantity: 8,
      type: 'Return from DA',
      initiated_by: 'Ngozi Ikechi',
      status: 'Failed',
      reference_number: 'RD-2024-002',
      notes: 'Transport issues'
    }
  ]);

  // Filtering and sorting logic
  const filteredAndSortedTransactions = useMemo(() => {
    const filtered = filterTransactions(transactions, filters);
    return sortTransactions(filtered, sortConfig);
  }, [transactions, filters, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredAndSortedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (key: keyof Transaction) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    console.log('Refreshing transaction log: GET /api/inventory/transaction-log');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setLastRefresh(new Date());
    setIsRefreshing(false);
    
    toast({
      title: "Refreshed successfully",
      description: "Transaction log has been updated with latest data",
      variant: "default"
    });
  };

  const handleExport = () => {
    exportToCSV(filteredAndSortedTransactions);
    
    toast({
      title: "Export completed",
      description: `${filteredAndSortedTransactions.length} transactions exported to CSV`,
      variant: "default"
    });
  };

  const clearFilters = () => {
    setFilters({
      da_filter: 'all',
      product_filter: 'all',
      date_from: '',
      date_to: '',
      movement_type: 'all',
      search_term: '',
      status_filter: 'all'
    });
    setCurrentPage(1);
  };

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isRefreshing) {
        handleRefresh();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [isRefreshing]);

  return (
    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-6">
      <TransactionHeader
        onRefresh={handleRefresh}
        onExport={handleExport}
        isRefreshing={isRefreshing}
        lastRefresh={lastRefresh}
      />

      <TransactionFiltersComponent
        filters={filters}
        onFiltersChange={setFilters}
        onClearFilters={clearFilters}
        deliveryAgents={deliveryAgents}
        products={products}
        movementTypes={movementTypes}
        statusOptions={statusOptions}
      />

      <div className="text-sm text-slate-400 mb-4">
        Showing {paginatedTransactions.length} of {filteredAndSortedTransactions.length} transactions
      </div>

      <TransactionTable
        transactions={paginatedTransactions}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      <TransactionPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalItems={filteredAndSortedTransactions.length}
        itemsPerPage={itemsPerPage}
      />

      <div className="mt-4 text-sm text-slate-400">
        API: GET /api/inventory/transaction-log | Auto-refresh: 30s
      </div>
    </div>
  );
};

export default TransactionLogTab;
