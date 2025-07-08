
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  Clock, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle, 
  Timer, 
  TrendingDown,
  Package,
  User,
  Calendar,
  Target
} from 'lucide-react';

interface UrgentTask {
  id: string;
  title: string;
  location: string;
  products: string;
  deadline: Date;
  penalty: number;
  status: 'pending' | 'overdue' | 'completed';
  createdAt: Date;
}

interface FinancialMetrics {
  payEarnedToday: number;
  penaltiesAppliedToday: number;
  monthlySalarySoFar: number;
  maxPossibleMonthly: number;
  dailyTarget: number;
  clockInTime: string | null;
  clockInPenalty: number;
}

const InventoryManagerEnforcementDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockedIn, setClockedIn] = useState(false);
  
  // Mock data - would be replaced with real API calls
  const [financialMetrics] = useState<FinancialMetrics>({
    payEarnedToday: 8500,
    penaltiesAppliedToday: 3000,
    monthlySalarySoFar: 127000,
    maxPossibleMonthly: 200000,
    dailyTarget: 12000,
    clockInTime: null,
    clockInPenalty: 1000
  });

  const [urgentTasks] = useState<UrgentTask[]>([
    {
      id: '1',
      title: 'Replenish Ogolua - Abeokuta',
      location: 'Abeokuta Distribution Center',
      products: '10 Shampoos, 2 Conditioners, 5 Pomades',
      deadline: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
      penalty: 2000,
      status: 'pending',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000)
    },
    {
      id: '2',
      title: 'Critical Stock Audit - Lagos Warehouse',
      location: 'Lagos Main Warehouse',
      products: 'Full SKU Count Verification',
      deadline: new Date(Date.now() + 45 * 60 * 1000), // 45 minutes from now
      penalty: 5000,
      status: 'overdue',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000)
    },
    {
      id: '3',
      title: 'DA Stock Assignment - Port Harcourt',
      location: 'Port Harcourt Region',
      products: '15 Hydration Tea, 8 Shampoos',
      deadline: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours from now
      penalty: 1500,
      status: 'pending',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ]);

  const [activityFeed] = useState([
    { time: '09:47 AM', action: 'Task completed: Replenish Kano Center', impact: '+₦2,000', type: 'positive' },
    { time: '09:23 AM', action: 'Late clock-in penalty applied', impact: '-₦1,000', type: 'negative' },
    { time: '08:16 AM', action: 'Clocked in (16 minutes late)', impact: '-₦1,000', type: 'negative' },
    { time: '08:00 AM', action: 'Task deadline missed: Abuja Stock Check', impact: '-₦2,000', type: 'negative' }
  ]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeRemaining = (deadline: Date) => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    
    if (diff <= 0) return { hours: 0, minutes: 0, seconds: 0, isOverdue: true };
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
    return { hours, minutes, seconds, isOverdue: false };
  };

  const getTaskCardStyle = (task: UrgentTask) => {
    const timeRemaining = getTimeRemaining(task.deadline);
    
    if (task.status === 'overdue' || timeRemaining.isOverdue) {
      return 'bg-gradient-to-r from-red-900 to-red-800 border-red-500 border-2 animate-pulse';
    } else if (timeRemaining.hours < 2) {
      return 'bg-gradient-to-r from-orange-900 to-orange-800 border-orange-500 border-2';
    } else {
      return 'bg-slate-800 border-slate-600';
    }
  };

  const getUrgencyIcon = (task: UrgentTask) => {
    const timeRemaining = getTimeRemaining(task.deadline);
    
    if (task.status === 'overdue' || timeRemaining.isOverdue) {
      return <AlertTriangle className="h-6 w-6 text-red-400 animate-bounce" />;
    } else if (timeRemaining.hours < 2) {
      return <Timer className="h-6 w-6 text-orange-400" />;
    } else {
      return <Clock className="h-6 w-6 text-yellow-400" />;
    }
  };

  const formatCountdown = (task: UrgentTask) => {
    const timeRemaining = getTimeRemaining(task.deadline);
    
    if (timeRemaining.isOverdue) {
      return <span className="text-red-400 font-bold text-xl animate-pulse">OVERDUE</span>;
    }
    
    return (
      <span className={`font-mono text-xl font-bold ${timeRemaining.hours < 2 ? 'text-orange-400' : 'text-white'}`}>
        {String(timeRemaining.hours).padStart(2, '0')}:
        {String(timeRemaining.minutes).padStart(2, '0')}:
        {String(timeRemaining.seconds).padStart(2, '0')}
      </span>
    );
  };

  const salaryPercentage = (financialMetrics.monthlySalarySoFar / financialMetrics.maxPossibleMonthly) * 100;
  const isUnderperforming = salaryPercentage < 50;

  const handleClockIn = () => {
    setClockedIn(true);
    // In real implementation, this would call an API
  };

  const handleCompleteTask = (taskId: string) => {
    // In real implementation, this would call an API to mark task as completed
    console.log(`Completing task ${taskId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-900">
      {/* Critical Performance Warning Strip */}
      {isUnderperforming && (
        <div className="bg-red-600 text-white p-4 border-b-4 border-red-800">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <AlertTriangle className="h-8 w-8 animate-bounce" />
            <div className="flex-1">
              <p className="text-xl font-bold">
                🔴 PERFORMANCE ALERT: You have only earned ₦{financialMetrics.monthlySalarySoFar.toLocaleString()} out of ₦{financialMetrics.maxPossibleMonthly.toLocaleString()} this month. 
                If this trend continues, you will be flagged for termination.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Top Banner: Financial Reality Check */}
      <div className="bg-slate-800 border-b-4 border-red-600 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                <User className="h-8 w-8 text-red-400" />
                INVENTORY MANAGER ENFORCEMENT PORTAL
              </h1>
              <p className="text-slate-300 text-lg mt-1">
                {new Date().toLocaleDateString('en-NG', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} | {currentTime.toLocaleTimeString()}
              </p>
            </div>
          </div>

          {/* Financial Tracker */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Pay Earned Today</p>
                    <p className={`text-2xl font-bold ${financialMetrics.payEarnedToday >= financialMetrics.dailyTarget ? 'text-green-400' : 'text-red-400'}`}>
                      ₦{financialMetrics.payEarnedToday.toLocaleString()}
                    </p>
                  </div>
                  <DollarSign className={`h-8 w-8 ${financialMetrics.payEarnedToday >= financialMetrics.dailyTarget ? 'text-green-400' : 'text-red-400'}`} />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-900 border-red-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-red-200 text-sm">Penalties Applied Today</p>
                    <p className="text-2xl font-bold text-red-400">
                      ₦{financialMetrics.penaltiesAppliedToday.toLocaleString()}
                    </p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-red-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Monthly Salary Progress</p>
                    <p className="text-2xl font-bold text-white">
                      ₦{financialMetrics.monthlySalarySoFar.toLocaleString()}
                    </p>
                    <p className="text-slate-400 text-xs">
                      / ₦{financialMetrics.maxPossibleMonthly.toLocaleString()}
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-300 text-sm">Salary Achievement</p>
                    <p className="text-white font-bold">{salaryPercentage.toFixed(1)}%</p>
                  </div>
                  <Progress 
                    value={salaryPercentage} 
                    className={`h-3 ${salaryPercentage < 50 ? 'bg-red-900' : salaryPercentage < 80 ? 'bg-yellow-900' : 'bg-green-900'}`}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Attendance Accountability */}
        <Card className="bg-slate-800 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Clock className="h-6 w-6 text-orange-400" />
              ATTENDANCE ACCOUNTABILITY
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!clockedIn ? (
              <div className="text-center p-6">
                <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4 animate-bounce" />
                <h3 className="text-2xl font-bold text-red-400 mb-2">YOU HAVE NOT CLOCKED IN</h3>
                <p className="text-white text-lg mb-4">
                  Every minute past 8:00 AM costs you ₦1,000. Current penalty: ₦{financialMetrics.clockInPenalty.toLocaleString()}
                </p>
                <Button 
                  onClick={handleClockIn}
                  className="bg-red-600 hover:bg-red-700 text-white text-xl px-8 py-4"
                >
                  CLOCK IN NOW - STOP THE BLEEDING
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white text-lg">Clock-in Status: <span className="text-red-400 font-bold">LATE</span></p>
                  <p className="text-slate-300">You clocked in at 8:16 AM. You've already lost ₦1,000.</p>
                  <p className="text-red-400 font-bold">Every 15 minutes of delay costs another ₦1,000.</p>
                </div>
                <CheckCircle className="h-12 w-12 text-green-400" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* URGENT TASKS Section */}
        <Card className="bg-slate-800 border-red-600 border-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              URGENT TASKS - IMMEDIATE ACTION REQUIRED
            </CardTitle>
            <p className="text-slate-300">Every delay costs you money. Every completion earns your salary.</p>
          </CardHeader>
          <CardContent className="space-y-4">
            {urgentTasks.map((task) => (
              <Card key={task.id} className={`${getTaskCardStyle(task)} border`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getUrgencyIcon(task)}
                        <h3 className="text-xl font-bold text-white">{task.title}</h3>
                        <Badge 
                          className={
                            task.status === 'overdue' ? 'bg-red-600 text-white animate-pulse' :
                            task.status === 'pending' ? 'bg-yellow-600 text-white' :
                            'bg-green-600 text-white'
                          }
                        >
                          {task.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-slate-300 mb-1">📍 {task.location}</p>
                      <p className="text-slate-300 mb-3">📦 {task.products}</p>
                    </div>
                    <div className="text-right">
                      <div className="mb-2">
                        {formatCountdown(task)}
                      </div>
                      <p className="text-slate-400 text-sm">Time Remaining</p>
                    </div>
                  </div>
                  
                  <Alert className="mb-4 bg-red-900/50 border-red-600">
                    <AlertTriangle className="h-4 w-4 text-red-400" />
                    <AlertDescription className="text-red-200 font-bold">
                      If not completed in time, you will lose ₦{task.penalty.toLocaleString()}.
                      Each day of delay increases your penalty. 3+ days = ₦5,000/day loss.
                    </AlertDescription>
                  </Alert>

                  <Button 
                    onClick={() => handleCompleteTask(task.id)}
                    className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3"
                    disabled={task.status === 'completed'}
                  >
                    {task.status === 'completed' ? 'COMPLETED ✓' : 'MARK AS COMPLETED - EARN YOUR PAY'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Yesterday's Performance Review */}
          <Card className="bg-slate-800 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Calendar className="h-6 w-6 text-blue-400" />
                YESTERDAY'S PERFORMANCE REVIEW
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Tasks Assigned:</span>
                  <span className="text-white font-bold">8</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Tasks Completed On Time:</span>
                  <span className="text-green-400 font-bold">5 ✅</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-300">Tasks Delayed:</span>
                  <span className="text-red-400 font-bold">3 ❌ (-₦6,000)</span>
                </div>
                <div className="border-t border-slate-600 pt-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-slate-300">Potential Earnings:</span>
                    <span className="text-slate-400">₦16,000</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300">Actual Earnings:</span>
                    <span className="text-green-400 font-bold text-xl">₦10,000</span>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-slate-400">Efficiency</span>
                      <span className="text-orange-400 font-bold">62.5%</span>
                    </div>
                    <Progress value={62.5} className="h-2 bg-slate-700" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Real-Time Activity Feed */}
          <Card className="bg-slate-800 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Package className="h-6 w-6 text-purple-400" />
                REAL-TIME ACTIVITY FEED
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {activityFeed.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                    <div className="flex-1">
                      <p className="text-white font-medium">{activity.action}</p>
                      <p className="text-slate-400 text-sm">{activity.time}</p>
                    </div>
                    <Badge 
                      className={
                        activity.type === 'positive' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-red-600 text-white'
                      }
                    >
                      {activity.impact}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InventoryManagerEnforcementDashboard;
