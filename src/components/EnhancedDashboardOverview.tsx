
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Users, Package, AlertTriangle, Target, Calendar, MapPin, DollarSign } from 'lucide-react';

const salesPerformanceData = [
  { name: 'Mon', sales: 45, target: 50 },
  { name: 'Tue', sales: 52, target: 50 },
  { name: 'Wed', sales: 38, target: 50 },
  { name: 'Thu', sales: 61, target: 50 },
  { name: 'Fri', sales: 48, target: 50 },
  { name: 'Sat', sales: 67, target: 50 },
  { name: 'Sun', sales: 43, target: 50 }
];

const regionData = [
  { name: 'Lagos', value: 35, color: '#3B82F6' },
  { name: 'Abuja', value: 25, color: '#10B981' },
  { name: 'Ogun', value: 20, color: '#F59E0B' },
  { name: 'Others', value: 20, color: '#8B5CF6' }
];

const topPerformers = [
  { name: 'Femi', location: 'Lagos', sales: 156, target: 150, efficiency: 104 },
  { name: 'Amaka', location: 'Abuja', sales: 142, target: 140, efficiency: 101 },
  { name: 'Kemi', location: 'Lagos', sales: 128, target: 135, efficiency: 95 },
  { name: 'Tobi', location: 'Ogun', sales: 89, target: 120, efficiency: 74 }
];

const EnhancedDashboardOverview = () => {
  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  const getEfficiencyColor = (efficiency: number) => {
    if (efficiency >= 100) return 'text-green-400';
    if (efficiency >= 90) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getEfficiencyBadge = (efficiency: number) => {
    if (efficiency >= 100) return 'bg-green-500';
    if (efficiency >= 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border-blue-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-200 text-sm font-medium">Total Sales</p>
                <p className="text-3xl font-bold text-white">₦2.4M</p>
                <p className="text-blue-300 text-xs mt-1">+12% from last week</p>
              </div>
              <div className="p-3 bg-blue-500/20 rounded-full">
                <DollarSign className="h-6 w-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/50 to-green-800/30 border-green-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-200 text-sm font-medium">Units Delivered</p>
                <p className="text-3xl font-bold text-white">1,847</p>
                <p className="text-green-300 text-xs mt-1">+8% this week</p>
              </div>
              <div className="p-3 bg-green-500/20 rounded-full">
                <Package className="h-6 w-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border-purple-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-200 text-sm font-medium">Active DAs</p>
                <p className="text-3xl font-bold text-white">24</p>
                <p className="text-purple-300 text-xs mt-1">3 new this month</p>
              </div>
              <div className="p-3 bg-purple-500/20 rounded-full">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/50 to-orange-800/30 border-orange-700">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-200 text-sm font-medium">Target Achievement</p>
                <p className="text-3xl font-bold text-white">89%</p>
                <p className="text-orange-300 text-xs mt-1">Above 85% threshold</p>
              </div>
              <div className="p-3 bg-orange-500/20 rounded-full">
                <Target className="h-6 w-6 text-orange-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance Chart */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-400" />
              Weekly Sales Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="name" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '6px',
                    color: '#fff'
                  }} 
                />
                <Bar dataKey="target" fill="#6B7280" name="Target" />
                <Bar dataKey="sales" fill="#3B82F6" name="Actual Sales" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="h-5 w-5 text-green-400" />
              Sales by Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '6px',
                    color: '#fff'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-yellow-400" />
            Top Performing DAs This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-blue-500/20 rounded-full">
                    <span className="text-blue-400 font-bold">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{performer.name}</p>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <MapPin className="h-3 w-3" />
                      {performer.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-white font-medium">{performer.sales} units</p>
                    <p className="text-slate-400 text-sm">Target: {performer.target}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={performer.efficiency} 
                      className="w-20 h-2"
                    />
                    <Badge className={`${getEfficiencyBadge(performer.efficiency)} text-white border-0`}>
                      {performer.efficiency}%
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedDashboardOverview;
