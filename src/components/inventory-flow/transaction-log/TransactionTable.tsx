
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowUpDown } from 'lucide-react';
import { Transaction, SortConfig } from './types';

interface TransactionTableProps {
  transactions: Transaction[];
  sortConfig: SortConfig;
  onSort: (key: keyof Transaction) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  sortConfig,
  onSort
}) => {
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

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 hover:bg-slate-700/50">
            <TableHead 
              className="text-slate-300 cursor-pointer hover:text-white"
              onClick={() => onSort('date')}
            >
              <div className="flex items-center gap-2">
                Date & Time
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="text-slate-300 cursor-pointer hover:text-white"
              onClick={() => onSort('from')}
            >
              <div className="flex items-center gap-2">
                From
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="text-slate-300 cursor-pointer hover:text-white"
              onClick={() => onSort('to')}
            >
              <div className="flex items-center gap-2">
                To
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="text-slate-300 cursor-pointer hover:text-white"
              onClick={() => onSort('product')}
            >
              <div className="flex items-center gap-2">
                Product
                <ArrowUpDown className="h-4 w-4" />
              </div>
            </TableHead>
            <TableHead 
              className="text-slate-300 cursor-pointer hover:text-white"
              onClick={() => onSort('quantity')}
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
              <TableCell>{getStatusBadge(transaction.status)}</TableCell>
              <TableCell className="text-white font-mono text-sm">{transaction.reference_number}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
