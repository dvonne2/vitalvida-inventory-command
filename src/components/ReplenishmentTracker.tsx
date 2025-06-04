
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const replenishmentData = [
  {
    da: "Femi",
    requestDate: "Jun 3",
    replenishedOn: "Jun 5",
    timeLag: "48h",
    slaStatus: "Met",
    slaColor: "text-green-400"
  },
  {
    da: "Amaka",
    requestDate: "Jun 2",
    replenishedOn: "Jun 6",
    timeLag: "96h",
    slaStatus: "Missed",
    slaColor: "text-red-400"
  },
  {
    da: "Chidi",
    requestDate: "Jun 4",
    replenishedOn: "Pending",
    timeLag: "72h (ongoing)",
    slaStatus: "At Risk",
    slaColor: "text-yellow-400"
  },
  {
    da: "Kemi",
    requestDate: "Jun 5",
    replenishedOn: "Jun 6",
    timeLag: "24h",
    slaStatus: "Met",
    slaColor: "text-green-400"
  },
  {
    da: "Ibrahim",
    requestDate: "Jun 1",
    replenishedOn: "Jun 3",
    timeLag: "48h",
    slaStatus: "Met",
    slaColor: "text-green-400"
  }
];

const ReplenishmentTracker = () => {
  const totalRequests = replenishmentData.length;
  const metSLA = replenishmentData.filter(item => item.slaStatus === "Met").length;
  const slaPercentage = (metSLA / totalRequests) * 100;

  return (
    <div className="space-y-6">
      {/* KPI Summary */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Replenishment Timeliness KPI</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <span className="text-slate-300">SLA Compliance (≤ 48h)</span>
            <span className="text-2xl font-bold text-blue-400">{slaPercentage.toFixed(1)}%</span>
          </div>
          <Progress value={slaPercentage} className="h-3" />
          <div className="flex justify-between text-sm text-slate-400 mt-2">
            <span>{metSLA} of {totalRequests} requests on time</span>
            <span>Target: ≥ 90%</span>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Tracker */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5 text-blue-400" />
            Pending vs Delivered Restock Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300">DA</TableHead>
                  <TableHead className="text-slate-300">Request Date</TableHead>
                  <TableHead className="text-slate-300">Replenished On</TableHead>
                  <TableHead className="text-slate-300">Time Lag</TableHead>
                  <TableHead className="text-slate-300">SLA Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {replenishmentData.map((item, index) => (
                  <TableRow key={index} className="border-slate-700 hover:bg-slate-700/30 transition-colors">
                    <TableCell className="text-white font-medium">{item.da}</TableCell>
                    <TableCell className="text-slate-300">{item.requestDate}</TableCell>
                    <TableCell className={`${item.replenishedOn === "Pending" ? "text-yellow-400" : "text-slate-300"}`}>
                      {item.replenishedOn}
                    </TableCell>
                    <TableCell className="text-slate-300">{item.timeLag}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.slaStatus === "Met" ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : item.slaStatus === "Missed" ? (
                          <XCircle className="h-4 w-4 text-red-400" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-400" />
                        )}
                        <span className={item.slaColor}>{item.slaStatus}</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReplenishmentTracker;
