
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MessageSquare, CheckCircle, MapPin } from 'lucide-react';

const alerts = [
  {
    id: 1,
    type: "critical",
    message: "DA Femi is about to run out of Shampoo in 2 days. Replenish 6 units to maintain performance.",
    location: "Lagos",
    suggestedQuantity: 6,
    product: "Shampoo",
    timeAgo: "5 mins ago"
  },
  {
    id: 2,
    type: "urgent",
    message: "DA Chidi is fully out of stock! No orders can be assigned.",
    location: "Abuja",
    suggestedQuantity: 10,
    product: "All Products",
    timeAgo: "12 mins ago"
  },
  {
    id: 3,
    type: "warning",
    message: "3 DAs have only 1-day stock left for Pomade.",
    location: "Multiple",
    suggestedQuantity: 15,
    product: "Pomade",
    timeAgo: "23 mins ago"
  },
  {
    id: 4,
    type: "info",
    message: "DA Kemi requests additional Hair Oil inventory for weekend rush.",
    location: "Port Harcourt",
    suggestedQuantity: 5,
    product: "Hair Oil",
    timeAgo: "1 hour ago"
  }
];

const AlertsFeed = () => {
  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical": return "border-l-red-500 bg-red-500/10";
      case "urgent": return "border-l-orange-500 bg-orange-500/10";
      case "warning": return "border-l-yellow-500 bg-yellow-500/10";
      default: return "border-l-blue-500 bg-blue-500/10";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical": return "🔴";
      case "urgent": return "🔥";
      case "warning": return "🟡";
      default: return "ℹ️";
    }
  };

  const handleWhatsAppContact = (location: string) => {
    // This would normally open WhatsApp with the DA's contact
    console.log(`Opening WhatsApp for DA in ${location}`);
  };

  const handleMarkRestocked = (alertId: number) => {
    console.log(`Marking alert ${alertId} as restocked`);
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-red-400" />
          Stock-Out Alerts
          <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500 ml-auto">
            {alerts.filter(a => a.type === "critical" || a.type === "urgent").length} Critical
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div key={alert.id} className={`border-l-4 ${getAlertColor(alert.type)} p-4 rounded-r-lg`}>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg">{getAlertIcon(alert.type)}</span>
                  <Badge variant="outline" className="text-xs">
                    {alert.type.toUpperCase()}
                  </Badge>
                  <span className="text-slate-400 text-sm">{alert.timeAgo}</span>
                </div>
                <p className="text-white mb-3">{alert.message}</p>
                <div className="flex items-center gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {alert.location}
                  </div>
                  <div>Suggested: {alert.suggestedQuantity} units of {alert.product}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700 text-white"
                  onClick={() => handleWhatsAppContact(alert.location)}
                >
                  <MessageSquare className="h-4 w-4 mr-1" />
                  WhatsApp
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                  onClick={() => handleMarkRestocked(alert.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Restocked
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default AlertsFeed;
