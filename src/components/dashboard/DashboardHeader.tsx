
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Package, UserCheck } from 'lucide-react';
import { UserRole } from '@/types';

interface DashboardHeaderProps {
  lastRefresh: Date;
  userRole: UserRole;
  onRoleChange: (role: string) => void;
  onRefresh: () => void;
}

const getRoleColor = (role: UserRole) => {
  switch (role) {
    case 'inventory_manager': return 'bg-blue-500/20 text-blue-400 border-blue-500';
    case 'accountant': return 'bg-green-500/20 text-green-400 border-green-500';
    case 'telesales': return 'bg-purple-500/20 text-purple-400 border-purple-500';
    case 'admin': return 'bg-red-500/20 text-red-400 border-red-500';
    default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
  }
};

const DashboardHeader = ({ lastRefresh, userRole, onRoleChange, onRefresh }: DashboardHeaderProps) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Package className="h-8 w-8 text-blue-400" />
            Vitalvida Inventory + DA Command Center
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Inventory Manager & DA Supervisor Portal | Last updated: {lastRefresh.toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <UserCheck className="h-4 w-4 text-slate-400" />
            <select
              value={userRole}
              onChange={(e) => onRoleChange(e.target.value)}
              className="bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-1 text-sm"
            >
              <option value="inventory_manager">Inventory Manager</option>
              <option value="accountant">Accountant</option>
              <option value="telesales">Telesales</option>
              <option value="admin">Admin</option>
            </select>
            <Badge className={getRoleColor(userRole)}>
              {userRole.replace('_', ' ').toUpperCase()}
            </Badge>
          </div>
          <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500">
            ● Live SKU Tracking
          </Badge>
          <Button variant="outline" size="sm" className="text-slate-300 border-slate-600 hover:bg-slate-700" onClick={onRefresh}>
            Refresh Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
