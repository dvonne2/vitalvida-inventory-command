
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Camera, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

const auditData = [
  {
    da: "Femi",
    lastAudit: "📸 Jun 3 12:44PM",
    auditPassed: true,
    mismatches: 0,
    status: "OK",
    statusColor: "text-green-400"
  },
  {
    da: "Amaka",
    lastAudit: "❌ Not Received",
    auditPassed: false,
    mismatches: 2,
    mismatchDetails: "Shampoo, Pomade",
    status: "Alert",
    statusColor: "text-red-400"
  },
  {
    da: "Chidi",
    lastAudit: "📸 Jun 2 3:22PM",
    auditPassed: true,
    mismatches: 0,
    status: "OK",
    statusColor: "text-green-400"
  },
  {
    da: "Kemi",
    lastAudit: "📸 Jun 5 9:15AM",
    auditPassed: true,
    mismatches: 0,
    status: "OK",
    statusColor: "text-green-400"
  },
  {
    da: "Ibrahim",
    lastAudit: "❌ Not Received",
    auditPassed: false,
    mismatches: 1,
    mismatchDetails: "Conditioner",
    status: "Alert",
    statusColor: "text-red-400"
  }
];

const AuditStatus = () => {
  const totalDAs = auditData.length;
  const passedAudits = auditData.filter(item => item.auditPassed).length;
  const auditCoverage = (passedAudits / totalDAs) * 100;

  const handleContactGuarantor = (da: string) => {
    console.log(`Contacting guarantor for DA ${da}`);
  };

  return (
    <div className="space-y-6">
      {/* Audit Coverage KPI */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Weekly Audit Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-blue-400">{auditCoverage.toFixed(0)}%</p>
              <p className="text-slate-300">Coverage This Week</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400">{passedAudits}</p>
              <p className="text-slate-300">Audits Received</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-red-400">{totalDAs - passedAudits}</p>
              <p className="text-slate-300">Missing Audits</p>
            </div>
          </div>
          {auditCoverage < 100 && (
            <div className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-400">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">⚠️ Skipped audits will trigger alerts to Guarantors</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detailed Audit Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Camera className="h-5 w-5 text-blue-400" />
            Photo Audit & Inventory Reconciliation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700 hover:bg-slate-700/50">
                  <TableHead className="text-slate-300">DA</TableHead>
                  <TableHead className="text-slate-300">Last Audit Photo</TableHead>
                  <TableHead className="text-slate-300">Audit Passed?</TableHead>
                  <TableHead className="text-slate-300">Mismatches</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {auditData.map((item, index) => (
                  <TableRow key={index} className="border-slate-700 hover:bg-slate-700/30 transition-colors">
                    <TableCell className="text-white font-medium">{item.da}</TableCell>
                    <TableCell className="text-slate-300">{item.lastAudit}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {item.auditPassed ? (
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
                      {item.mismatches > 0 ? (
                        <div>
                          <span className="text-red-400 font-bold">{item.mismatches}</span>
                          {item.mismatchDetails && (
                            <div className="text-sm text-slate-400">({item.mismatchDetails})</div>
                          )}
                        </div>
                      ) : (
                        <span className="text-green-400">0</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge className={`${item.status === "OK" ? "bg-green-500/20 text-green-400 border-green-500" : "bg-red-500/20 text-red-400 border-red-500"} border`}>
                        {item.status === "OK" ? "✅" : "🚨"} {item.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {!item.auditPassed && (
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="border-red-600 text-red-400 hover:bg-red-500/20"
                          onClick={() => handleContactGuarantor(item.da)}
                        >
                          Alert Guarantor
                        </Button>
                      )}
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

export default AuditStatus;
