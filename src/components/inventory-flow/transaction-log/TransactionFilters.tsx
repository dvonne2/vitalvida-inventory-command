
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';
import { TransactionFilters } from './types';

interface TransactionFiltersProps {
  filters: TransactionFilters;
  onFiltersChange: (filters: TransactionFilters) => void;
  onClearFilters: () => void;
  deliveryAgents: string[];
  products: string[];
  movementTypes: string[];
  statusOptions: string[];
}

const TransactionFiltersComponent: React.FC<TransactionFiltersProps> = ({
  filters,
  onFiltersChange,
  onClearFilters,
  deliveryAgents,
  products,
  movementTypes,
  statusOptions
}) => {
  const updateFilter = (key: keyof TransactionFilters, value: string) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
        <div className="space-y-2">
          <Label htmlFor="search_term" className="text-slate-300">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              id="search_term"
              value={filters.search_term}
              onChange={(e) => updateFilter('search_term', e.target.value)}
              placeholder="Search transactions..."
              className="bg-slate-700 border-slate-600 text-white pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="da_filter" className="text-slate-300">DA Filter</Label>
          <Select
            value={filters.da_filter}
            onValueChange={(value) => updateFilter('da_filter', value)}
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
            onValueChange={(value) => updateFilter('product_filter', value)}
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
            onValueChange={(value) => updateFilter('movement_type', value)}
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
            onValueChange={(value) => updateFilter('status_filter', value)}
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
            onChange={(e) => updateFilter('date_from', e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="date_to" className="text-slate-300">To</Label>
          <Input
            id="date_to"
            type="date"
            value={filters.date_to}
            onChange={(e) => updateFilter('date_to', e.target.value)}
            className="bg-slate-700 border-slate-600 text-white"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-slate-400">
          Showing transactions
        </div>
        <Button 
          onClick={onClearFilters} 
          variant="outline" 
          size="sm"
          className="text-slate-300 border-slate-600 hover:bg-slate-700"
        >
          Clear Filters
        </Button>
      </div>
    </>
  );
};

export default TransactionFiltersComponent;
