
import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { FileText, Download, Search, ArrowUpDown, RefreshCw, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Transaction {
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

const TransactionLogTab = () => {
  const [filters, setFilters] = useState({
    da_filter: 'all',
    product_filter: 'all',
    date_from: '',
    date_to: '',
    movement_type: 'all',
    search_term: '',
    status_filter: 'all'
  });
  
  const [sortConfig, setSortConfig] = useState<{ key: keyof Transaction; direction: 'asc' | 'desc' }>({ 
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
    let filtered = transactions.filter(transaction => {
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

    // Sorting
    filtered.sort((a, b) => {
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

    return filtered;
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
    const csvContent = [
      ['ID', 'Date', 'Time', 'From', 'To', 'Product', 'Quantity', 'Type', 'Status', 'Reference', 'Initiated By'].join(','),
      ...filteredAndSortedTransactions.map(t => [
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

  const getStatusBadge = (status: Transaction['status']) => {
    const statusColors = {
      'Completed': 'bg-green-500/20 text-green-400',
      'In Transit': 'bg-blue-500/20 text-blue-400',
      'Pending': 'bg-yellow-500/20 text-yellow-400',
      'Failed': 'bg-red-500/20 text-red-400'
    };
    
    return <Badge className={statusColors[status]}>{status}</Badge>;
  };

  const getMovementTypeBadge = (type: Transaction['type']) => {
    const typeColors = {
      'Receipt from Factory': 'bg-green-500/20 text-green-400',
      'Assignment to DA': 'bg-blue-500/20 text-blue-400',
      'Return from DA': 'bg-orange-500/20 text-orange-400',
      'Transfer Between DAs': 'bg-purple-500/20 text-purple-400',
      'Return to Factory': 'bg-yellow-500/20 text-yellow-400'
    };
    
    return <Badge className={typeColors[type]}>{type}</Badge>;
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h3 className="text-indigo-400 font-semibold text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Transaction Log
          </h3>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Calendar className="h-4 w-4" />
            <span>Last updated: {lastRefresh.toLocaleTimeString()}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            onClick={handleRefresh} 
            disabled={isRefreshing}
            variant="outline" 
            size="sm"
            className="text-slate-300 border-slate-600 hover:bg-slate-700"
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button onClick={handleExport} className="bg-indigo-600 hover:bg-indigo-700 text-white">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="search_term" className="text-slate-300">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="search_term"
              value={filters.search_term}
              onChange={(e) => setFilters({ ...filters, search_term: e.target.value })}
              placeholder="Search transactions..."
              className="bg-slate-700 border-slate-600 text-white pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="da_filter" className="text-slate-300">DA Filter</Label>
          <Select
            value={filters.da_filter}
            onValueChange={(value) => setFilters({ ...filters, da_filter: value })}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="All DAs" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600 z-50">
              <SelectItem value="all" className="text-white">All DAs</SelectItem>
              {deliveryAgents.map(da => (
                <SelectItem key={da} value={da} className="text-white">
                  {da}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="product_filter" className="text-slate-300">Product</Label>
          <Select
            value={filters.product_filter}
            onValueChange={(value) => setFilters({ ...filters, product_filter: value })}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="All Products" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600 z-50">
              <SelectItem value="all" className="text-white">All Products</SelectItem>
              {products.map(product => (
                <SelectItem key={product} value={product} className="text-white">
                  {product}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="movement_type" className="text-slate-300">Type</Label>
          <Select
            value={filters.movement_type}
            onValueChange={(value) => setFilters({ ...filters, movement_type: value })}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600 z-50">
              <SelectItem value="all" className="text-white">All Types</SelectItem>
              {movementTypes.map(type => (
                <SelectItem key={type} value={type} className="text-white">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="status_filter" className="text-slate-300">Status</Label>
          <Select
            value={filters.status_filter}
            onValueChange={(value) => setFilters({ ...filters, status_filter: value })}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600 z-50">
              <SelectItem value="all" className="text-white">All Status</SelectItem>
              {statusOptions.map(status => (
                <SelectItem key={status} value={status} className="text-white">
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date_from" className="text-slate-300">From</Label>
          <Input
            id="date_from"
            type="date"
            value={filters.date_from}
            onChange={(e) => setFilters({ ...filters, date_from: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date_to" className="text-slate-300">To</Label>
          <Input
            id="date_to"
            type="date"
            value={filters.date_to}
            onChange={(e) => setFilters({ ...filters, date_to: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-slate-400">
          Showing {paginatedTransactions.length} of {filteredAndSortedTransactions.length} transactions
        </div>
        <Button 
          onClick={clearFilters} 
          variant="outline" 
          size="sm"
          className="text-slate-300 border-slate-600 hover:bg-slate-700"
        >
          Clear Filters
        </Button>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-slate-700 hover:bg-slate-700/50">
              <TableHead 
                className="text-slate-300 cursor-pointer hover:text-white"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center gap-2">
                  Date & Time
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="text-slate-300 cursor-pointer hover:text-white"
                onClick={() => handleSort('from')}
              >
                <div className="flex items-center gap-2">
                  From
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="text-slate-300 cursor-pointer hover:text-white"
                onClick={() => handleSort('to')}
              >
                <div className="flex items-center gap-2">
                  To
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="text-slate-300 cursor-pointer hover:text-white"
                onClick={() => handleSort('product')}
              >
                <div className="flex items-center gap-2">
                  Product
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead 
                className="text-slate-300 cursor-pointer hover:text-white"
                onClick={() => handleSort('quantity')}
              >
                <div className="flex items-center gap-2">
                  Quantity
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead className="text-slate-300">Type</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
              <TableHead className="text-slate-300">Reference</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.map((transaction) => (
              <TableRow key={transaction.id} className="border-slate-700 hover:bg-slate-700/30">
                <TableCell className="text-white font-medium">
                  <div>
                    <div>{transaction.date}</div>
                    <div className="text-slate-400 text-sm">{transaction.time}</div>
                  </div>
                </TableCell>
                <TableCell className="text-white">{transaction.from}</TableCell>
                <TableCell className="text-white">{transaction.to}</TableCell>
                <TableCell className="text-white">{transaction.product}</TableCell>
                <TableCell className="text-white font-medium">{transaction.quantity}</TableCell>
                <TableCell>{getMovementTypeBadge(transaction.type)}</TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                <TableCell className="text-white font-mono text-sm">{transaction.reference_number}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer text-slate-300 hover:text-white'}
                />
              </PaginationItem>
              {[...Array(totalPages)].map((_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    onClick={() => setCurrentPage(i + 1)}
                    isActive={currentPage === i + 1}
                    className="cursor-pointer text-slate-300 hover:text-white"
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer text-slate-300 hover:text-white'}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <div className="mt-4 text-sm text-slate-400">
        API: GET /api/inventory/transaction-log | Auto-refresh: 30s
      </div>
    </div>
  );
};

export default TransactionLogTab;
