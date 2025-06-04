
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Flag, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const mismatchData = [
  {
    da: "Chidi",
    mismatch: "Shampoo 3 vs Delivered 2",
    explanationLogged: false,
    flagCount: 2,
    action: "Review",
    actionColor: "text-red-400",
    timeline: "Assigned 9:00AM → Paid 2:30PM → No OTP"
  },
  {
    da: "Femi",
    mismatch: "Conditioner 4 vs Delivered 4",
    explanationLogged: true,
    flagCount: 0,
    action: "Clear",
    actionColor: "text-green-400",
    timeline: "Assigned 8:15AM → Paid 1:45PM → OTP 3:22PM"
  },
  {
    da: "Amaka",
    mismatch: "Pomade 5 vs Delivered 3",
    explanationLogged: false,
    flagCount: 1,
    action: "Investigate",
    actionColor: "text-yellow-400",
    timeline: "Assigned 10:30AM → Paid 4:15PM → OTP Pending"
  },
  {
    da: "Ibrahim",
    mismatch: "Hair Oil 3 vs Delivered 3",
    explanationLogged: true,
    flagCount: 0,
    action: "Clear",
    actionColor: "text-green-400",
    timeline: "Assigned 7:45AM → Paid 12:30PM → OTP 2:15PM"
  }
];

const MismatchMonitor = () => {
  const totalMismatches = mismatchData.length;
  const unresolvedFlags = mismatchData.filter(item => item.flagCount > 0).length;
  const explanationsPending = mismatchData.filter(item => !item.explanationLogged && item.flagCount > 0).length;

  const handleReviewMismatch = (da: string) => {
    console.log(`Reviewing mismatch for DA ${da}`);
  };

  const handleAddToWatchlist = (da: string) => {
    console.log(`Adding DA ${da} to watchlist`);
  };

  return (
    <div className="space-y-6">
      {/* Fraud Monitor Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Total Mismatches</p>
                <p className="text-2xl font-bold text-blue-400">{totalMismatches}</p>
              </div>
              <Flag className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Unresolved Flags</p>
                <p className="text-2xl font-bold text-red-400">{unresolvedFlags}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Explanations Pending</p>
                <p className="text-2xl font-bold text-yellow-400">{explanationsPending}</p>
              </div>
              <XCircle className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Mismatch Detail Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-400" />
            Mismatch & Fraud Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500 rounded-lg">
            <p className="text-blue-400 text-sm">
              <strong>Rules:</strong> Mismatches without explanation = ⚠️ Flag | Repeat mismatches = Add to Watchlist | 
              Full delivery timeline: Assigned → Paid → OTP
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300">DA</TableHead>
                  <TableHead className="text-slate-300">Assigned vs Delivered</TableHead>
                  <TableHead className="text-slate-300">Explanation Logged?</TableHead>
                  <TableHead className="text-slate-300">Flag Count</TableHead>
                  <TableHead className="text-slate-300">Action</TableHead>
                  <TableHead className="text-slate-300">Delivery Timeline</TableHead>
                  <TableHead className="text-slate-300">Controls</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mismatchData.map((item, index) => (
                  <TableRow key={index} className="border-slate-700 hover:bg-slate-700/30 transition-colors">
                    <TableCell className="text-white font-medium">{item.da}</TableCell>
                    <TableCell className="text-slate-300">{item.mismatch}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.explanationLogged ? (
                          <>
                            <CheckCircle className="h-4 w-4 text-green-400" />
                            <span className="text-green-400">Yes</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-4 w-4 text-red-400" />
                            <span className="text-red-400">No</span>
                          </>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={`${item.flagCount > 0 ? "bg-red-500/20 text-red-400 border-red-500" : "bg-green-500/20 text-green-400 border-green-500"} border`}>
                        {item.flagCount}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={`border ${item.action === "Clear" ? "bg-green-500/20 text-green-400 border-green-500" : item.action === "Review" ? "bg-red-500/20 text-red-400 border-red-500" : "bg-yellow-500/20 text-yellow-400 border-yellow-500"}`}>
                        {item.action === "Clear" ? "✅" : item.action === "Review" ? "🚨" : "⚠️"} {item.action}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-slate-300 max-w-xs">
                      {item.timeline}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {item.flagCount > 0 && (
                          <>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-red-600 text-red-400 hover:bg-red-500/20"
                              onClick={() => handleReviewMismatch(item.da)}
                            >
                              Review
                            </Button>
                            {item.flagCount > 1 && (
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="border-yellow-600 text-yellow-400 hover:bg-yellow-500/20"
                                onClick={() => handleAddToWatchlist(item.da)}
                              >
                                Watchlist
                              </Button>
                            )}
                          </>
                        )}
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

export default MismatchMonitor;
