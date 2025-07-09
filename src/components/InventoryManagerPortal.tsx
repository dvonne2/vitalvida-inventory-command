import React, { useState } from 'react';
import InventoryManagerHeader from './im-portal/InventoryManagerHeader';
import InventoryManagerStats from './im-portal/InventoryManagerStats';
import InventoryManagerTabs from './im-portal/InventoryManagerTabs';

const InventoryManagerPortal = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      <InventoryManagerHeader />
      <InventoryManagerStats />
      <InventoryManagerTabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
};

export default InventoryManagerPortal;