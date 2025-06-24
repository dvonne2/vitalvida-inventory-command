
import { DeliveryOrder } from './types';

export const canApproveDelivery = (order: DeliveryOrder, userRole: string) => {
  return (
    userRole === 'inventory_manager' &&
    order.paymentVerified &&
    order.otpSubmitted &&
    order.telesalesConfirmed &&
    !order.approved &&
    !order.fraudAlert &&
    order.timeRemaining > 0
  );
};

export const formatTimeRemaining = (hours: number) => {
  if (hours <= 0) {
    return <span className="text-red-500 font-bold">⛔ Overdue</span>;
  }
  const h = Math.floor(hours);
  const m = Math.floor((hours - h) * 60);
  if (hours < 2) {
    return <span className="text-red-400 font-bold">{h}h {m}m left</span>;
  } else if (hours < 6) {
    return <span className="text-yellow-400 font-bold">{h}h {m}m left</span>;
  } else {
    return <span className="text-green-400 font-bold">{h}h {m}m left</span>;
  }
};

export const getMockOrders = (): DeliveryOrder[] => [
  {
    orderNo: '111178',
    da: 'Femi',
    product: 'Shampoo',
    sku: '5497539000000484113',
    assigned: 10,
    delivered: 10,
    paymentVerified: true,
    otpSubmitted: true,
    telesalesConfirmed: true,
    countedAsSold: 10,
    bonusEligible: 10,
    timerStarted: new Date(Date.now() - 14 * 60 * 60 * 1000),
    timeRemaining: 4.35,
    approved: false,
    approvedBy: null,
    approvedAt: null,
    penaltyApplied: false,
    fraudAlert: false
  },
  {
    orderNo: '111179',
    da: 'Femi',
    product: 'Pomade',
    sku: '5497539000000483026',
    assigned: 6,
    delivered: 6,
    paymentVerified: false,
    otpSubmitted: true,
    telesalesConfirmed: false,
    countedAsSold: 0,
    bonusEligible: 0,
    timerStarted: new Date(Date.now() - 5.5 * 60 * 60 * 1000),
    timeRemaining: 12.5,
    approved: false,
    approvedBy: null,
    approvedAt: null,
    penaltyApplied: false,
    fraudAlert: false
  },
  {
    orderNo: '111180',
    da: 'Tobi',
    product: 'Conditioner',
    sku: '5497539000000483001',
    assigned: 4,
    delivered: 4,
    paymentVerified: true,
    otpSubmitted: true,
    telesalesConfirmed: true,
    countedAsSold: 4,
    bonusEligible: 4,
    timerStarted: new Date(Date.now() - 19 * 60 * 60 * 1000),
    timeRemaining: -1,
    approved: false,
    approvedBy: null,
    approvedAt: null,
    penaltyApplied: true,
    fraudAlert: false
  }
];
