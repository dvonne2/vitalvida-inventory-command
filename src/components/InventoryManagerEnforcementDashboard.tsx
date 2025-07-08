
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
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
  Target,
  Brain,
  Wrench,
  Lightbulb,
  Volume2,
  Trophy,
  XCircle,
  Shield,
  Bomb
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
  isRepeatedMistake?: boolean;
  strikeCount?: number;
}

interface FinancialMetrics {
  payEarnedToday: number;
  penaltiesAppliedToday: number;
  monthlySalarySoFar: number;
  maxPossibleMonthly: number;
  dailyTarget: number;
  clockInTime: string | null;
  clockInPenalty: number;
  tasksAssignedToday: number;
  tasksCompletedToday: number;
  completionRate: number;
  projectedMaxEarnings: number;
}

interface PenaltyAlert {
  id: string;
  type: 'missed_deadline' | 'late_clockin' | 'repeated_offense';
  amount: number;
  reason: string;
  prevention: string;
  warning: string;
  timestamp: Date;
  strikeCount?: number;
}

const InventoryManagerEnforcementDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [clockedIn, setClockedIn] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [activePenalty, setActivePenalty] = useState<PenaltyAlert | null>(null);
  
  // Mock data - would be replaced with real API calls
  const [financialMetrics] = useState<FinancialMetrics>({
    payEarnedToday: 8500,
    penaltiesAppliedToday: 3000,
    monthlySalarySoFar: 127000,
    maxPossibleMonthly: 200000,
    dailyTarget: 12000,
    clockInTime: null,
    clockInPenalty: 1000,
    tasksAssignedToday: 6,
    tasksCompletedToday: 4,
    completionRate: 66.7,
    projectedMaxEarnings: 6500
  });

  const [urgentTasks] = useState<UrgentTask[]>([
    {
      id: '1',
      title: 'Replenish Ogolua - Abeokuta',
      location: 'Abeokuta Distribution Center',
      products: '10 Shampoos, 2 Conditioners, 5 Pomades',
      deadline: new Date(Date.now() + 2 * 60 * 1000), // 2 minutes from now
      penalty: 2000,
      status: 'pending',
      createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
      isRepeatedMistake: true,
      strikeCount: 1
    },
    {
      id: '2',
      title: 'Critical Stock Audit - Lagos Warehouse',
      location: 'Lagos Main Warehouse',
      products: 'Full SKU Count Verification',
      deadline: new Date(Date.now() + 45 * 1000), // 45 seconds from now
      penalty: 5000,
      status: 'overdue',
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      strikeCount: 2
    },
    {
      id: '3',
      title: 'DA Stock Assignment - Port Harcourt',
      location: 'Port Harcourt Region',
      products: '15 Hydration Tea, 8 Shampoos',
      deadline: new Date(Date.now() + 4 * 60 * 1000), // 4 minutes from now
      penalty: 1500,
      status: 'pending',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000)
    }
  ]);

  const [coachingMessages] = useState([
    { time: '2 hours ago', message: 'If you had completed the Kano replenishment 2 hours earlier, you would have earned an extra ₦3,000 bonus', type: 'missed_opportunity' },
    { time: '1 week ago', message: 'Last week, you delayed this same task type and lost ₦4,000. You\'re on the same path again.', type: 'pattern_warning' },
    { time: 'Just now', message: 'You took the last warning seriously and completed on time. Bonus earned: ₦2,000. Well done!', type: 'positive_reinforcement' }
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

  const playCountdownSound = (beepCount: number) => {
    if (!audioEnabled) return;
    
    for (let i = 0; i < beepCount; i++) {
      setTimeout(() => {
        const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LIhHhYKqhIGrF5T0V1uHheq0lLdrFHa7bq4fGNfnU6lnBqJVp7Wp3LzJc/KjCZQKRJGYmBkF2DfHYoKzSSQzKDH4wd');
        audio.play().catch(() => {}); // Ignore errors if audio can't play
      }, i * 200);
    }
  };

  const triggerMissedDeadlinePenalty = (task: UrgentTask) => {
    const penaltyAlert: PenaltyAlert = {
      id: `penalty_${Date.now()}`,
      type: task.strikeCount && task.strikeCount > 1 ? 'repeated_offense' : 'missed_deadline',
      amount: task.strikeCount && task.strikeCount > 1 ? task.penalty * task.strikeCount : task.penalty,
      reason: task.strikeCount && task.strikeCount > 1 
        ? `This is your ${task.strikeCount}${task.strikeCount === 2 ? 'nd' : 'rd'} time missing this type of task. This indicates negligence.` 
        : 'You ignored 3 countdown warnings and failed to complete the task on time.',
      prevention: task.strikeCount && task.strikeCount > 1 
        ? 'Prioritize RED-TAGGED tasks the moment they appear. Set countdown reminders.'
        : 'Start tasks as soon as they are assigned. Red tasks = non-negotiable. Every delay increases penalty.',
      warning: task.strikeCount && task.strikeCount > 1 
        ? '1 more offense = ₦20,000 penalty + FC investigation.'
        : 'Repeat this mistake and next penalty = ₦5,000. After 3 strikes, performance flagged for disciplinary action.',
      timestamp: new Date(),
      strikeCount: task.strikeCount || 1
    };
    
    setActivePenalty(penaltyAlert);
    
    toast({
      title: "❌ PENALTY APPLIED",
      description: `₦${penaltyAlert.amount.toLocaleString()} deducted for: ${task.title}`,
      variant: "destructive",
    });
  };

  const getTaskCountdownAlert = (task: UrgentTask) => {
    const timeRemaining = getTimeRemaining(task.deadline);
    const totalSeconds = timeRemaining.minutes * 60 + timeRemaining.seconds;
    
    if (totalSeconds <= 180 && totalSeconds > 120) { // 3 minutes
      playCountdownSound(1);
      return { level: 1, message: '3 MINUTES LEFT' };
    } else if (totalSeconds <= 120 && totalSeconds > 60) { // 2 minutes
      playCountdownSound(2);
      return { level: 2, message: '2 MINUTES LEFT' };
    } else if (totalSeconds <= 60 && totalSeconds > 0) { // 1 minute
      playCountdownSound(3);
      return { level: 3, message: '1 MINUTE LEFT' };
    } else if (timeRemaining.isOverdue) {
      triggerMissedDeadlinePenalty(task);
      return { level: 4, message: 'DEADLINE MISSED' };
    }
    
    return null;
  };

  const getTaskCardStyle = (task: UrgentTask) => {
    const timeRemaining = getTimeRemaining(task.deadline);
    const alert = getTaskCountdownAlert(task);
    
    if (task.status === 'overdue' || timeRemaining.isOverdue) {
      return 'bg-gradient-to-r from-red-900 to-red-800 border-red-500 border-2 animate-pulse';
    } else if (alert?.level === 3) {
      return 'bg-gradient-to-r from-red-900 to-red-800 border-red-500 border-2 animate-bounce';
    } else if (alert?.level === 2) {
      return 'bg-gradient-to-r from-orange-900 to-orange-800 border-orange-500 border-2 animate-pulse';
    } else if (alert?.level === 1) {
      return 'bg-gradient-to-r from-yellow-900 to-yellow-800 border-yellow-500 border-2';
    } else {
      return 'bg-slate-800 border-slate-600';
    }
  };

  const getUrgencyIcon = (task: UrgentTask) => {
    const timeRemaining = getTimeRemaining(task.deadline);
    const alert = getTaskCountdownAlert(task);
    
    if (task.status === 'overdue' || timeRemaining.isOverdue) {
      return <XCircle className="h-6 w-6 text-red-400 animate-bounce" />;
    } else if (alert?.level === 3) {
      return <Bomb className="h-6 w-6 text-red-400 animate-bounce" />;
    } else if (alert?.level === 2) {
      return <AlertTriangle className="h-6 w-6 text-orange-400 animate-pulse" />;
    } else if (alert?.level === 1) {
      return <Timer className="h-6 w-6 text-yellow-400" />;
    } else {
      return <Clock className="h-6 w-6 text-slate-400" />;
    }
  };

  const formatCountdown = (task: UrgentTask) => {
    const timeRemaining = getTimeRemaining(task.deadline);
    const alert = getTaskCountdownAlert(task);
    
    if (timeRemaining.isOverdue) {
      return <span className="text-red-400 font-bold text-xl animate-pulse">OVERDUE - PENALTY APPLIED</span>;
    }
    
    if (alert) {
      return (
        <div className="text-center">
          <span className={`font-mono text-xl font-bold animate-pulse ${
            alert.level === 3 ? 'text-red-400' : 
            alert.level === 2 ? 'text-orange-400' : 
            'text-yellow-400'
          }`}>
            {alert.message}
          </span>
          <div className="text-sm mt-1">
            {String(timeRemaining.hours).padStart(2, '0')}:
            {String(timeRemaining.minutes).padStart(2, '0')}:
            {String(timeRemaining.seconds).padStart(2, '0')}
          </div>
        </div>
      );
    }
    
    return (
      <span className="font-mono text-xl font-bold text-white">
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
    const penaltyAlert: PenaltyAlert = {
      id: `clockin_${Date.now()}`,
      type: 'late_clockin',
      amount: 1000,
      reason: 'Company resumption time is 08:00 AM. You were 19 minutes late.',
      prevention: 'Be clocked in and active by 07:55 AM latest. Delay = auto deduction every 15 minutes.',
      warning: 'Chronic lateness triggers monthly salary downgrade.',
      timestamp: new Date()
    };
    setActivePenalty(penaltyAlert);
  };

  const handleCompleteTask = (taskId: string) => {
    console.log(`Completing task ${taskId}`);
    toast({
      title: "✅ TASK COMPLETED",
      description: "Well done! Bonus earned for on-time completion.",
      variant: "default",
    });
  };

  const dismissPenalty = () => {
    setActivePenalty(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-red-950 to-slate-900">
      {/* Penalty Post-Mortem Modal */}
      {activePenalty && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-red-950 border-red-500 border-2 max-w-lg w-full animate-scale-in">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2 text-xl">
                <XCircle className="h-8 w-8" />
                {activePenalty.type === 'repeated_offense' ? `${activePenalty.strikeCount}${activePenalty.strikeCount === 2 ? 'ND' : 'RD'} STRIKE` : 'PENALTY APPLIED'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400 mb-2">
                  ₦{activePenalty.amount.toLocaleString()} LOST
                </div>
                <div className="text-red-300 text-sm">
                  {new Date().toLocaleTimeString()}
                </div>
              </div>

              <div className="space-y-3">
                <div className="p-3 bg-red-900/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Brain className="h-4 w-4 text-blue-400" />
                    <span className="text-blue-400 font-medium">Why?</span>
                  </div>
                  <p className="text-white text-sm">{activePenalty.reason}</p>
                </div>

                <div className="p-3 bg-orange-900/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Wrench className="h-4 w-4 text-orange-400" />
                    <span className="text-orange-400 font-medium">How to prevent this next time:</span>
                  </div>
                  <p className="text-white text-sm">{activePenalty.prevention}</p>
                </div>

                <div className="p-3 bg-yellow-900/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Warning:</span>
                  </div>
                  <p className="text-white text-sm">{activePenalty.warning}</p>
                </div>
              </div>

              <Button 
                onClick={dismissPenalty}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                I UNDERSTAND - DISMISS
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

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
            <div className="flex items-center gap-2">
              <Button
                onClick={() => setAudioEnabled(!audioEnabled)}
                className={`${audioEnabled ? 'bg-green-600' : 'bg-red-600'} hover:opacity-80`}
              >
                <Volume2 className="h-4 w-4 mr-2" />
                Audio {audioEnabled ? 'ON' : 'OFF'}
              </Button>
            </div>
          </div>

          {/* Enhanced Financial Tracker */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
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
                    <p className="text-red-200 text-sm">Penalties Today</p>
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
                    <p className="text-slate-300 text-sm">Tasks Completed</p>
                    <p className="text-2xl font-bold text-white">
                      {financialMetrics.tasksCompletedToday}/{financialMetrics.tasksAssignedToday}
                    </p>
                    <p className="text-slate-400 text-xs">
                      {financialMetrics.completionRate}% completion rate
                    </p>
                  </div>
                  <Target className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-300 text-sm">Max Possible Today</p>
                    <p className="text-2xl font-bold text-green-400">
                      ₦{financialMetrics.projectedMaxEarnings.toLocaleString()}
                    </p>
                    <p className="text-slate-400 text-xs">if you act now</p>
                  </div>
                  <Trophy className="h-8 w-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700 border-slate-600">
              <CardContent className="p-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-slate-300 text-sm">Monthly Progress</p>
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
        {/* Performance Coaching Panel */}
        <Card className="bg-purple-900/50 border-purple-600">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Brain className="h-6 w-6 text-purple-400" />
              AI PERFORMANCE COACH & TRAINER
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {coachingMessages.map((message, index) => (
              <div key={index} className={`p-3 rounded-lg border-l-4 ${
                message.type === 'missed_opportunity' ? 'bg-red-900/30 border-red-400' :
                message.type === 'pattern_warning' ? 'bg-orange-900/30 border-orange-400' :
                'bg-green-900/30 border-green-400'
              }`}>
                <div className="flex items-center justify-between">
                  <p className="text-white font-medium">{message.message}</p>
                  <span className="text-slate-400 text-sm">{message.time}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

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

        {/* URGENT TASKS Section with Military Conditioning */}
        <Card className="bg-slate-800 border-red-600 border-2">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              URGENT TASKS - MILITARY CONDITIONING ACTIVE
            </CardTitle>
            <p className="text-slate-300">Every delay costs you money. Every completion earns your salary. System is watching.</p>
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
                        {task.isRepeatedMistake && (
                          <Badge className="bg-purple-600 text-white animate-pulse">
                            REPEAT OFFENSE
                          </Badge>
                        )}
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
                      {task.strikeCount && task.strikeCount > 1 
                        ? `STRIKE ${task.strikeCount}: If not completed, you will lose ₦${(task.penalty * task.strikeCount).toLocaleString()}. Next offense = ₦20,000 + FC investigation.`
                        : `If not completed in time, you will lose ₦${task.penalty.toLocaleString()}. Each day of delay increases your penalty. 3+ days = ₦5,000/day loss.`
                      }
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
