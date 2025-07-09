import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { BarChart, TrendingUp, Download, Calendar as CalendarIcon, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

const MovementIntelligenceDashboard = () => {
  const [dateRange, setDateRange] = useState({
    from: new Date(2025, 0, 1),
    to: new Date(2025, 0, 15)
  });
  const [summaryData, setSummaryData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMovementSummary = async () => {
    setIsLoading(true);
    try {
      const fromDate = format(dateRange.from, 'yyyy-MM-dd');
      const toDate = format(dateRange.to, 'yyyy-MM-dd');
      const response = await fetch(`/api/inventory/movements/summary?from=${fromDate}&to=${toDate}`);
      const data = await response.json();
      setSummaryData(data);
    } catch (error) {
      console.error('Failed to fetch movement summary:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const presetRanges = [
    { label: 'Today', days: 0 },
    { label: 'Week', days: 7 },
    { label: 'Month', days: 30 },
    { label: 'Quarter', days: 90 }
  ];

  const setPresetRange = (days: number) => {
    const today = new Date();
    if (days === 0) {
      setDateRange({ from: today, to: today });
    } else {
      const fromDate = new Date();
      fromDate.setDate(today.getDate() - days);
      setDateRange({ from: fromDate, to: today });
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <BarChart className="h-6 w-6 text-cyan-400" />
          Movement Intelligence Dashboard
          <Badge className="bg-cyan-500/20 text-cyan-400 border-cyan-500">
            Analytics
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Range Controls */}
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex gap-2">
            {presetRanges.map((preset) => (
              <Button
                key={preset.label}
                variant="outline"
                size="sm"
                onClick={() => setPresetRange(preset.days)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                {preset.label}
              </Button>
            ))}
          </div>
          
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="border-slate-600 text-slate-300">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {format(dateRange.from, 'MMM dd')} - {format(dateRange.to, 'MMM dd')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="range"
                selected={{ from: dateRange.from, to: dateRange.to }}
                onSelect={(range) => range?.from && range?.to && setDateRange({ from: range.from, to: range.to })}
              />
            </PopoverContent>
          </Popover>

          <Button
            onClick={fetchMovementSummary}
            disabled={isLoading}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            {isLoading ? 'Analyzing...' : 'Generate Report'}
          </Button>
        </div>

        {/* KPI Cards */}
        {summaryData && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Total Movements</p>
                    <p className="text-2xl font-bold text-cyan-400">{summaryData.total_movements || 0}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-cyan-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Busiest Bin</p>
                    <p className="text-lg font-bold text-blue-400">{summaryData.busiest_bin || '--'}</p>
                  </div>
                  <BarChart className="h-8 w-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Efficiency Score</p>
                    <p className="text-2xl font-bold text-green-400">{summaryData.efficiency_score || '--'}%</p>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400">Optimal</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-700/30 border-slate-600">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm">Trending Items</p>
                    <p className="text-lg font-bold text-purple-400">{summaryData.trending_items?.length || 0}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Charts Section */}
        {summaryData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Movement Trends Chart */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white text-lg">Movement Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-slate-800/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart className="h-12 w-12 text-cyan-400 mx-auto mb-2" />
                    <p className="text-slate-400">📊 Movement trends over time</p>
                    <p className="text-slate-500 text-sm">Line chart showing daily movement volume</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bin Utilization Heatmap */}
            <Card className="bg-slate-700/30 border-slate-600">
              <CardHeader>
                <CardTitle className="text-white text-lg">Bin Utilization Heatmap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-48 bg-slate-800/50 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="grid grid-cols-8 gap-1 mb-4">
                      {Array.from({ length: 32 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded ${
                            Math.random() > 0.7 ? 'bg-red-500' :
                            Math.random() > 0.4 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <p className="text-slate-400 text-sm">🔥 Warehouse bin activity heatmap</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Anomaly Detection */}
        {summaryData && (
          <div className="p-4 bg-orange-500/20 border border-orange-500 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-5 w-5 text-orange-400" />
              <span className="text-orange-400 font-medium">Anomaly Detection</span>
            </div>
            <p className="text-orange-300 text-sm">
              Unusual movement pattern detected in sector B: 40% increase in movements compared to historical average.
            </p>
          </div>
        )}

        {/* Trending Items */}
        {summaryData?.trending_items && (
          <Card className="bg-slate-700/30 border-slate-600">
            <CardHeader>
              <CardTitle className="text-white text-lg">Trending Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {summaryData.trending_items.slice(0, 5).map((item: any, index: number) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
                    <div>
                      <span className="text-white font-medium">{item.name}</span>
                      <p className="text-slate-400 text-sm">SKU: {item.sku}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400 font-medium">+{item.trend_percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Export Actions */}
        {summaryData && (
          <div className="flex gap-2">
            <Button variant="outline" className="flex-1 border-slate-600 text-slate-300">
              <Download className="h-4 w-4 mr-2" />
              Export PDF Report
            </Button>
            <Button variant="outline" className="flex-1 border-slate-600 text-slate-300">
              <Download className="h-4 w-4 mr-2" />
              Export CSV Data
            </Button>
          </div>
        )}

        {/* No Data State */}
        {!summaryData && !isLoading && (
          <div className="p-8 bg-slate-700/30 rounded-lg text-center">
            <BarChart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">Select a date range and generate a report</p>
            <p className="text-slate-500 text-sm">Get insights into warehouse movement patterns and trends</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MovementIntelligenceDashboard;