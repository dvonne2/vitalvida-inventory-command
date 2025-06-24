
export interface DeliveryOrder {
  orderNo: string;
  da: string;
  product: string;
  sku: string;
  assigned: number;
  delivered: number;
  paymentVerified: boolean;
  otpSubmitted: boolean;
  telesalesConfirmed: boolean;
  countedAsSold: number;
  bonusEligible: number;
  timerStarted: Date | null;
  timeRemaining: number; // hours
  approved: boolean;
  approvedBy: string | null;
  approvedAt: Date | null;
  penaltyApplied: boolean;
  fraudAlert: boolean;
}

export interface DADeliveryApprovalTrackerProps {
  userRole: 'inventory_manager' | 'accountant' | 'telesales' | 'admin';
  userId: string;
}
