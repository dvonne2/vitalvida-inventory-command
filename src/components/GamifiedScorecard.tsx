
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Trophy, Target, TrendingUp, Zap, Star } from 'lucide-react';

const scorecardData = [
  {
    da: "Femi",
    shampooSold: 4,
    pomadeSold: 3,
    conditionerSold: 2,
    hydrationTeaSold: 1,
    dailyTotalUnits: 10,
    dailyBonus: 2000,
    weeklyDeliveryRate: 82,
    bonusTier: "On Track ✅",
    strikeCount: 0,
    rank: 1
  },
  {
    da: "Amaka",
    shampooSold: 3,
    pomadeSold: 2,
    conditionerSold: 1,
    hydrationTeaSold: 2,
    dailyTotalUnits: 8,
    dailyBonus: 1600,
    weeklyDeliveryRate: 78,
    bonusTier: "At Risk ⚠️",
    strikeCount: 1,
    rank: 2
  },
  {
    da: "Tobi",
    shampooSold: 2,
    pomadeSold: 1,
    conditionerSold: 0,
    hydrationTeaSold: 1,
    dailyTotalUnits: 4,
    dailyBonus: 0,
    weeklyDeliveryRate: 65,
    bonusTier: "Below Threshold ❌",
    strikeCount: 2,
    rank: 3
  },
  {
    da: "Chidi",
    shampooSold: 1,
    pomadeSold: 0,
    conditionerSold: 1,
    hydrationTeaSold: 0,
    dailyTotalUnits: 2,
    dailyBonus: 0,
    weeklyDeliveryRate: 55,
    bonusTier: "Critical ⛔",
    strikeCount: 3,
    rank: 4
  }
];

const GamifiedScorecard = () => {
  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Trophy className="h-5 w-5 text-yellow-400" />;
      case 2: return <Star className="h-5 w-5 text-gray-400" />;
      case 3: return <Target className="h-5 w-5 text-orange-400" />;
      default: return <Zap className="h-5 w-5 text-red-400" />;
    }
  };

  const getBonusTierBadge = (tier: string, rate: number) => {
    if (tier.includes("On Track")) {
      return <Badge className="bg-green-500 text-white border-0">{tier}</Badge>;
    } else if (tier.includes("At Risk")) {
      return <Badge className="bg-yellow-500 text-white border-0">{tier}</Badge>;
    } else if (tier.includes("Below")) {
      return <Badge className="bg-orange-500 text-white border-0">{tier}</Badge>;
    } else {
      return <Badge className="bg-red-500 text-white border-0">{tier}</Badge>;
    }
  };

  const getMotivationalMessage = (da: any) => {
    if (da.rank === 1) return "🔥 You're on fire! Keep dominating!";
    if (da.dailyTotalUnits >= 8) return "💪 Strong performance today!";
    if (da.strikeCount >= 2) return "⚠️ Turn it around - your bonus depends on it!";
    if (da.weeklyDeliveryRate < 70) return "📈 Focus on delivery rate to unlock bonuses!";
    return "🎯 One more delivery unlocks your next tier!";
  };

  const formatCurrency = (amount: number) => {
    return `₦${amount.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Gamified Daily Scorecard - SKU Performance
          </CardTitle>
          <p className="text-slate-400 text-sm">
            Live bonus tracking tied to verified SKU deliveries only
          </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-600">
                  <TableHead className="text-slate-300">Rank</TableHead>
                  <TableHead className="text-slate-300">DA</TableHead>
                  <TableHead className="text-slate-300">Shampoo Sold</TableHead>
                  <TableHead className="text-slate-300">Pomade Sold</TableHead>
                  <TableHead className="text-slate-300">Conditioner Sold</TableHead>
                  <TableHead className="text-slate-300">Hydration Tea</TableHead>
                  <TableHead className="text-slate-300">Daily Total</TableHead>
                  <TableHead className="text-slate-300">Daily Bonus</TableHead>
                  <TableHead className="text-slate-300">Weekly Rate</TableHead>
                  <TableHead className="text-slate-300">Bonus Tier</TableHead>
                  <TableHead className="text-slate-300">Strikes</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scorecardData.map((da, index) => (
                  <TableRow key={index} className="border-slate-600 hover:bg-slate-700/50">
                    <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-2">
                        {getRankIcon(da.rank)}
                        <span className="text-white font-bold">#{da.rank}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-white font-medium">{da.da}</TableCell>
                    <TableCell className="text-center text-blue-400 font-bold">{da.shampooSold}</TableCell>
                    <TableCell className="text-center text-green-400 font-bold">{da.pomadeSold}</TableCell>
                    <TableCell className="text-center text-purple-400 font-bold">{da.conditionerSold}</TableCell>
                    <TableCell className="text-center text-yellow-400 font-bold">{da.hydrationTeaSold}</TableCell>
                    <TableCell className="text-center">
                      <span className="text-white text-lg font-bold">{da.dailyTotalUnits}</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-bold ${da.dailyBonus > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatCurrency(da.dailyBonus)}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-medium ${da.weeklyDeliveryRate >= 80 ? 'text-green-400' : da.weeklyDeliveryRate >= 70 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {da.weeklyDeliveryRate}%
                      </span>
                    </TableCell>
                    <TableCell>
                      {getBonusTierBadge(da.bonusTier, da.weeklyDeliveryRate)}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`font-bold ${da.strikeCount >= 2 ? 'text-red-400' : da.strikeCount === 1 ? 'text-yellow-400' : 'text-green-400'}`}>
                        {da.strikeCount}/3
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Motivational Messages */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {scorecardData.slice(0, 2).map((da, index) => (
              <div key={index} className="p-4 bg-slate-700/50 rounded-lg border-l-4 border-blue-400">
                <div className="flex items-center gap-2 mb-2">
                  {getRankIcon(da.rank)}
                  <span className="text-white font-medium">{da.da}</span>
                </div>
                <p className="text-slate-300 text-sm">{getMotivationalMessage(da)}</p>
              </div>
            ))}
          </div>

          {/* Bonus Rules */}
          <div className="mt-6 p-4 bg-slate-700/30 rounded-lg">
            <h4 className="text-white font-medium mb-3">💰 Bonus Rules (Auto-Calculated)</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="text-slate-300">
                <strong className="text-green-400">₦200 per SKU:</strong><br />
                Delivery + Payment + OTP verified
              </div>
              <div className="text-slate-300">
                <strong className="text-blue-400">₦300 Weekly Bonus:</strong><br />
                Maintain ≥80% delivery rate
              </div>
              <div className="text-slate-300">
                <strong className="text-red-400">Strike System:</strong><br />
                3 strikes = bonus suspension
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GamifiedScorecard;
