
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Search, ArrowUpDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const TransactionLogTab = () => {
  const [filters, setFilters] = useState({
    da_filter: '',
    product_filter: '',
    date_from: '',
    date_to: '',
    movement_type: '',
    search_term: ''
  });
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });
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
    'Kemi Williams'
  ];

  const products = [
    'Fulani Shampoo',
    'Hydration Tea',
    'Pomade',
    'Conditioner'
  ];

  // Mock transaction data
  const transactions = [
    {
      id: 'TXN-001',
      date: '2024-01-15',
      time: '14:30',
      from: 'Factory',
      to: 'Central Warehouse',
      product: 'Fulani Shampoo',
      quantity: 500,
      type: 'Receipt from Factory',
      initiated_by: 'Sarah Johnson',
      status: 'Completed'
    },
    {
      id: 'TXN-002',
      date: '2024-01-15',
      time: '15:45',
      from: 'Central Warehouse',
      to: 'Femi Adebayo',
      product: 'Fulani Shampoo',
      quantity: 50,
      type: 'Assignment to DA',
      initiated_by: 'Michael Chen',
      status: 'Completed'
    },
    {
      id: 'TXN-003',
      date: '2024-01-16',
      time: '09:15',
      from: 'Tobi Johnson',
      to: 'Central Warehouse',
      product: 'Pomade',
      quantity: 15,
      type: 'Return from DA',
      initiated_by: 'Tobi Johnson',
      status: 'Completed'
    },
    {
      id: 'TXN-004',
      date: '2024-01-16',
      time: '11:20',
      from: 'Femi Adebayo',
      to: 'Amaka Okafor',
      product: 'Hydration Tea',
      quantity: 25,
      type: 'Transfer Between DAs',
      initiated_by: 'Sarah Johnson',
      status: 'In Transit'
    },
    {
      id: 'TXN-005',
      date: '2024-01-17',
      time: '13:10',
      from: 'Central Warehouse',
      to: 'Factory',
      product: 'Conditioner',
      quantity: 30,
      type: 'Return to Factory',
      initiated_by: 'Michael Chen',
      status: 'Completed'
    }
  ];

  const handleSort = (key: string) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleExport = () => {
    // Mock export functionality
    toast({
      title: "Export initiated",
      description: "Transaction log will be downloaded shortly as CSV file",
      variant: "default"
    });
    
    console.log('Export API call: GET /api/inventory/transaction-log with export=csv');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return <Badge className="bg-green-500/20 text-green-400">Completed</Badge>;
      case 'In Transit':
        return <Badge className="bg-blue-500/20 text-blue-400">In Transit</Badge>;
      case 'Pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400">Pending</Badge>;
      case 'Failed':
        return <Badge className="bg-red-500/20 text-red-400">Failed</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">{status}</Badge>;
    }
  };

  const getMovementTypeBadge = (type: string) => {
    switch (type) {
      case 'Receipt from Factory':
        return <Badge className="bg-green-500/20 text-green-400">{type}</Badge>;
      case 'Assignment to DA':
        return <Badge className="bg-blue-500/20 text-blue-400">{type}</Badge>;
      case 'Return from DA':
        return <Badge className="bg-orange-500/20 text-orange-400">{type}</Badge>;
      case 'Transfer Between DAs':
        return <Badge className="bg-red-500/20 text-red-400">{type}</Badge>;
      case 'Return to Factory':
        return <Badge className="bg-yellow-500/20 text-yellow-400">{type}</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400">{type}</Badge>;
    }
  };

  return (
    <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-indigo-400 font-semibold text-lg flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Transaction Log
        </h3>
        <Button onClick={handleExport} className="bg-indigo-600 hover:bg-indigo-700 text-white">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Search and Filter Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
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
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="" className="text-white">All DAs</SelectItem>
              {deliveryAgents.map(da => (
                <SelectItem key={da} value={da} className="text-white">
                  {da}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="product_filter" className="text-slate-300">Product Filter</Label>
          <Select
            value={filters.product_filter}
            onValueChange={(value) => setFilters({ ...filters, product_filter: value })}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="All Products" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="" className="text-white">All Products</SelectItem>
              {products.map(product => (
                <SelectItem key={product} value={product} className="text-white">
                  {product}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="movement_type" className="text-slate-300">Movement Type</Label>
          <Select
            value={filters.movement_type}
            onValueChange={(value) => setFilters({ ...filters, movement_type: value })}
          >
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-slate-700 border-slate-600">
              <SelectItem value="" className="text-white">All Types</SelectItem>
              {movementTypes.map(type => (
                <SelectItem key={type} value={type} className="text-white">
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date_from" className="text-slate-300">Date From</Label>
          <Input
            id="date_from"
            type="date"
            value={filters.date_from}
            onChange={(e) => setFilters({ ...filters, date_from: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date_to" className="text-slate-300">Date To</Label>
          <Input
            id="date_to"
            type="date"
            value={filters.date_to}
            onChange={(e) => setFilters({ ...filters, date_to: e.target.value })}
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>
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
              <TableHead className="text-slate-300">From</TableHead>
              <TableHead className="text-slate-300">To</TableHead>
              <TableHead className="text-slate-300">Product</TableHead>
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
              <TableHead className="text-slate-300">Initiated By</TableHead>
              <TableHead className="text-slate-300">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
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
                <TableCell className="text-white">{transaction.initiated_by}</TableCell>
                <TableCell>{getStatusBadge(transaction.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-4 text-sm text-slate-400">
        Showing {transactions.length} transactions. API: GET /api/inventory/transaction-log
      </div>
    </div>
  );
};

export default TransactionLogTab;
