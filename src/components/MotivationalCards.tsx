
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Award, AlertTriangle } from 'lucide-react';

const motivationalMessages = [
  {
    type: "warning",
    icon: AlertTriangle,
    message: "📉 Low audit compliance this week. Let's fix that before Friday's QBR.",
    color: "bg-yellow-500/20 border-yellow-500 text-yellow-400"
  },
  {
    type: "success",
    icon: Award,
    message: "🔥 Well done! 0 stock-outs for top 5 DAs — bonus eligibility protected.",
    color: "bg-green-500/20 border-green-500 text-green-400"
  },
  {
    type: "info",
    icon: TrendingUp,
    message: "💡 Pro tip: DAs with 3+ day stock buffer show 25% higher sales performance.",
    color: "bg-blue-500/20 border-blue-500 text-blue-400"
  }
];

const MotivationalCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {motivationalMessages.map((message, index) => (
        <Card key={index} className={`${message.color} border transition-all duration-300 hover:scale-105`}>
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <message.icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <p className="text-sm font-medium leading-relaxed">
                {message.message}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MotivationalCards;
