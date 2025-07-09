import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Activity, RefreshCw, User, Package, ArrowRight } from 'lucide-react';

const LiveWarehouseActivityFeed = () => {
  const [activities, setActivities] = useState<any[]>([]);
  const [filter, setFilter] = useState('all');
  const [activityDensity, setActivityDensity] = useState('Normal');

  useEffect(() => {
    // Mock real-time data
    const mockActivities = [
      { timestamp: new Date(), action: 'moved', item: 'Product X', user: 'alice', from: 'A1-01', to: 'STAGING' },
      { timestamp: new Date(Date.now() - 60000), action: 'added', item: 'Product Y', user: 'bob', quantity: 50 },
      { timestamp: new Date(Date.now() - 120000), action: 'deducted', item: 'Product Z', user: 'charlie', quantity: 25 }
    ];
    setActivities(mockActivities);

    const interval = setInterval(() => {
      // Simulate new activity
      const newActivity = {
        timestamp: new Date(),
        action: ['moved', 'added', 'deducted'][Math.floor(Math.random() * 3)],
        item: `Product ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}`,
        user: ['alice', 'bob', 'charlie', 'david'][Math.floor(Math.random() * 4)],
        quantity: Math.floor(Math.random() * 100) + 1
      };
      setActivities(prev => [newActivity, ...prev].slice(0, 50));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'moved': return '🔄';
      case 'added': return '➕';
      case 'deducted': return '➖';
      default: return '📝';
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'moved': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'added': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'deducted': return 'bg-red-500/20 text-red-400 border-red-500';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500';
    }
  };

  const filteredActivities = activities.filter(activity =>
    filter === 'all' || activity.action === filter
  );

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <Activity className="h-6 w-6 text-green-400" />
          Live Warehouse Activity Feed
          <Badge className={`${activityDensity === 'Busy' ? 'bg-red-500/20 text-red-400' : 
                            activityDensity === 'Quiet' ? 'bg-blue-500/20 text-blue-400' : 
                            'bg-green-500/20 text-green-400'}`}>
            {activityDensity}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex items-center gap-4">
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Activities</SelectItem>
              <SelectItem value="moved">Moves Only</SelectItem>
              <SelectItem value="added">Additions Only</SelectItem>
              <SelectItem value="deducted">Deductions Only</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant="outline" className="border-slate-500 text-slate-300">
            {filteredActivities.length} activities
          </Badge>
        </div>

        {/* Activity Stream */}
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {filteredActivities.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
              <div className="text-xl">{getActionIcon(activity.action)}</div>
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs">
                  {activity.user?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">{activity.user}</span>
                  <Badge className={getActionColor(activity.action)}>
                    {activity.action}
                  </Badge>
                  <span className="text-slate-300">{activity.item}</span>
                </div>
                {activity.quantity && (
                  <p className="text-slate-400 text-sm">Quantity: {activity.quantity}</p>
                )}
              </div>
              <div className="text-slate-400 text-sm">
                {activity.timestamp.toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LiveWarehouseActivityFeed;