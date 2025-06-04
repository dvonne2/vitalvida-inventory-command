
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, TrendingUp } from 'lucide-react';

const salesData = [
  {
    da: "Femi",
    product: "Shampoo",
    sku: "5497539000000484113",
    assigned: 10,
    delivered: 10,
    paymentVerified: true,
    otpSubmitted: true,
    countedAsSold: 10,
    bonusEligible: 10
  },
  {
    da: "Femi",
    product: "Pomade",
    sku: "5497539000000483026",
    assigned: 6,
    delivered: 6,
    paymentVerified: true,
    otpSubmitted: true,
    countedAsSold: 6,
    bonusEligible: 6
  },
  {
    da: "Femi",
    product: "Conditioner",
    sku: "5497539000000483001",
    assigned: 4,
    delivered: 4,
    paymentVerified: false,
    otpSubmitted: false,
    countedAsSold: 0,
    bonusEligible: 0
  },
  {
    da: "Tobi",
    product: "Shampoo",
    sku: "5497539000000484113",
    assigned: 8,
    delivered: 6,
    paymentVerified: true,
    otpSubmitted: true,
    countedAsSold: 6,
    bonusEligible: 6
  },
  {
    da: "Tobi",
    product: "Pomade",
    sku: "5497539000000483026",
    assigned: 5,
    delivered: 5,
    paymentVerified: false,
    otpSubmitted: true,
    countedAsSold: 0,
    bonusEligible: 0
  },
  {
    da: "Amaka",
    product: "Hydration Tea",
    sku: "5497539000000484200",
    assigned: 3,
    delivered: 3,
    paymentVerified: true,
    otpSubmitted: true,
    countedAsSold: 3,
    bonusEligible: 3
  }
];

const DASalesTracker = () => {
  const getVerificationIcon = (verified: boolean) => {
    return verified ? (
      <CheckCircle className="h-4 w-4 text-green-400" />
    ) : (
      <XCircle className="h-4 w-4 text-red-400" />
    );
  };

  const getBonusStatus = (eligible: number, delivered: number) => {
    if (eligible === delivered && delivered > 0) {
      return <Badge className="bg-green-500 text-white border-0">✅ Full Bonus</Badge>;
    } else if (eligible > 0) {
      return <Badge className="bg-yellow-500 text-white border-0">⚠️ Partial</Badge>;
    } else {
      return <Badge className="bg-red-500 text-white border-0">❌ No Bonus</Badge>;
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-400" />
          DA Stock Sold Tracker (This Week) - SKU Level
        </CardTitle>
        <p className="text-slate-400 text-sm">
          Only units with delivery + payment + OTP count as sold and eligible for bonus
        </p>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="border-slate-600">
                <TableHead className="text-slate-300">DA</TableHead>
                <TableHead className="text-slate-300">Product</TableHead>
                <TableHead className="text-slate-300">SKU</TableHead>
                <TableHead className="text-slate-300">Assigned</TableHead>
                <TableHead className="text-slate-300">Delivered</TableHead>
                <TableHead className="text-slate-300">Payment ✓</TableHead>
                <TableHead className="text-slate-300">OTP ✓</TableHead>
                <TableHead className="text-slate-300">Counted as Sold</TableHead>
                <TableHead className="text-slate-300">Bonus Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesData.map((sale, index) => (
                <TableRow key={index} className="border-slate-600 hover:bg-slate-700/50">
                  <TableCell className="text-white font-medium">{sale.da}</TableCell>
                  <TableCell className="text-slate-300">{sale.product}</TableCell>
                  <TableCell className="text-slate-400 font-mono text-xs">
                    {sale.sku.slice(-6)}...
                  </TableCell>
                  <TableCell className="text-blue-400 font-medium">{sale.assigned}</TableCell>
                  <TableCell className="text-yellow-400 font-medium">{sale.delivered}</TableCell>
                  <TableCell className="text-center">
                    {getVerificationIcon(sale.paymentVerified)}
                  </TableCell>
                  <TableCell className="text-center">
                    {getVerificationIcon(sale.otpSubmitted)}
                  </TableCell>
                  <TableCell className="text-center">
                    <span className={`font-bold ${sale.countedAsSold > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {sale.countedAsSold}
                    </span>
                  </TableCell>
                  <TableCell>
                    {getBonusStatus(sale.bonusEligible, sale.delivered)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div className="mt-4 p-3 bg-slate-700/50 rounded-lg">
          <h4 className="text-white font-medium mb-2">⚡ Fraud Prevention Rules:</h4>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• No "set" or "bundle" tracking - only individual SKUs</li>
            <li>• Payment verification required (POS/Moniepoint proof)</li>
            <li>• OTP submission mandatory for final confirmation</li>
            <li>• Any mismatch = automatic fraud flag + no bonus</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DASalesTracker;
