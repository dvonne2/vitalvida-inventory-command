
import React, { useState, useEffect } from 'react';
import MotivationalCards from '@/components/MotivationalCards';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import QuickStats from '@/components/dashboard/QuickStats';
import DashboardTabs from '@/components/dashboard/DashboardTabs';
import { UserRole } from '@/types';

const Index = () => {
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [userRole, setUserRole] = useState<UserRole>('inventory_manager');

  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 3600000); // Refresh every hour

    return () => clearInterval(interval);
  }, []);

  const handleRoleChange = (role: string) => {
    setUserRole(role as UserRole);
  };
  
  const handleRefresh = () => {
    setLastRefresh(new Date());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <DashboardHeader
        lastRefresh={lastRefresh}
        userRole={userRole}
        onRoleChange={handleRoleChange}
        onRefresh={handleRefresh}
      />

      <div className="max-w-7xl mx-auto p-4 space-y-6">
        <MotivationalCards />
        <QuickStats />
        <DashboardTabs userRole={userRole} />
      </div>
    </div>
  );
};

export default Index;
