
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
  { name: 'Lagos', value: 35, color: '#17BEBB' },
  { name: 'Abuja', value: 25, color: '#2ECC71' },
  { name: 'Ogun', value: 20, color: '#E67E22' },
  { name: 'Others', value: 20, color: '#F1C40F' }
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
    if (efficiency >= 100) return 'text-success';
    if (efficiency >= 90) return 'text-warning';
    return 'text-destructive';
  };

  const getEfficiencyBadge = (efficiency: number) => {
    if (efficiency >= 100) return 'bg-success';
    if (efficiency >= 90) return 'bg-warning';
    return 'bg-destructive';
  };

  return (
    <div className="space-y-6">
      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-teal/10 to-teal/5 border-teal/20 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-teal/70 text-sm font-medium">Total Sales</p>
                <p className="text-3xl font-bold text-foreground">₦2.4M</p>
                <p className="text-teal text-xs mt-1">+12% from last week</p>
              </div>
              <div className="p-3 bg-teal/10 rounded-full">
                <DollarSign className="h-6 w-6 text-teal" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-success/70 text-sm font-medium">Units Delivered</p>
                <p className="text-3xl font-bold text-foreground">1,847</p>
                <p className="text-success text-xs mt-1">+8% this week</p>
              </div>
              <div className="p-3 bg-success/10 rounded-full">
                <Package className="h-6 w-6 text-success" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-600/70 text-sm font-medium">Active DAs</p>
                <p className="text-3xl font-bold text-foreground">24</p>
                <p className="text-purple-600 text-xs mt-1">3 new this month</p>
              </div>
              <div className="p-3 bg-purple-500/10 rounded-full">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20 shadow-sm hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-warning/70 text-sm font-medium">Target Achievement</p>
                <p className="text-3xl font-bold text-foreground">89%</p>
                <p className="text-warning text-xs mt-1">Above 85% threshold</p>
              </div>
              <div className="p-3 bg-warning/10 rounded-full">
                <Target className="h-6 w-6 text-warning" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Performance Chart */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-teal" />
              Weekly Sales Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesPerformanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
                <Bar dataKey="target" fill="#D1D5DB" name="Target" />
                <Bar dataKey="sales" fill="#17BEBB" name="Actual Sales" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Regional Distribution */}
        <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="text-foreground flex items-center gap-2">
              <MapPin className="h-5 w-5 text-success" />
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
                    backgroundColor: '#FFFFFF', 
                    border: '1px solid #E5E7EB',
                    borderRadius: '8px',
                    color: '#2C3E50',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers Table */}
      <Card className="bg-white border-gray-200 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Users className="h-5 w-5 text-gold" />
            Top Performing DAs This Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topPerformers.map((performer, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50/50 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 bg-teal/10 rounded-full">
                    <span className="text-teal font-bold">#{index + 1}</span>
                  </div>
                  <div>
                    <p className="text-foreground font-medium">{performer.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      {performer.location}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-foreground font-medium">{performer.sales} units</p>
                    <p className="text-muted-foreground text-sm">Target: {performer.target}</p>
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
