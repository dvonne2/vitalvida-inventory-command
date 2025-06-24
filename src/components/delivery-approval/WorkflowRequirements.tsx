
import React from 'react';

const WorkflowRequirements = () => {
  return (
    <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
      <h4 className="text-white font-medium mb-2">🔐 Approval Workflow Requirements:</h4>
      <ul className="text-slate-300 text-sm space-y-1">
        <li>• OTP verification required from DA</li>
        <li>• Telesales confirmation required</li>
        <li>• Payment confirmation via Moniepoint webhook + accountant approval</li>
        <li>• 18-hour SLA for Inventory Manager approval (₦2,000 penalty if overdue)</li>
        <li>• Role separation enforced - only Inventory Manager can approve deliveries</li>
        <li>• All actions logged with timestamps for audit trail</li>
      </ul>
    </div>
  );
};

export default WorkflowRequirements;
