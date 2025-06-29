
import React from 'react';
import DamagedProductTracker from '@/components/DamagedProductTracker';

const DamagedStockDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header */}
      <div className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <div className="h-10 w-10 bg-red-500/20 rounded-lg flex items-center justify-center">
                  <span className="text-red-400 text-xl">⚠️</span>
                </div>
                Damaged Stock Dashboard
              </h1>
              <p className="text-slate-300 text-lg mt-2">
                Track damaged or unusable stock with full traceability
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <DamagedProductTracker />
      </div>
    </div>
  );
};

export default DamagedStockDashboard;
