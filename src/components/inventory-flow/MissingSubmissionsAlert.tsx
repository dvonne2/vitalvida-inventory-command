
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PendingAgent {
  id: string;
  name: string;
}

interface MissingSubmissionsAlertProps {
  pendingAgents: PendingAgent[];
}

const MissingSubmissionsAlert = ({ pendingAgents }: MissingSubmissionsAlertProps) => {
  const { toast } = useToast();

  const handleSendReminder = async (agentId: string, agentName: string) => {
    try {
      // Mock API call - replace with actual endpoint: POST /api/agent-photos/send-reminder
      console.log('Sending reminder to agent:', agentId);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast({
        title: "Reminder sent",
        description: `Reminder sent to ${agentName} to upload weekly photo`,
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Reminder failed",
        description: "Please try again",
        variant: "destructive"
      });
    }
  };

  if (pendingAgents.length === 0) {
    return null;
  }

  return (
    <Card className="bg-red-500/10 border-red-500/20">
      <CardHeader>
        <CardTitle className="text-red-400 text-lg">
          Missing Submissions - Week {Math.ceil(new Date().getDate() / 7)}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingAgents.map(agent => (
            <div key={agent.id} className="flex items-center justify-between p-3 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">{agent.name}</p>
                <p className="text-slate-400 text-sm">{agent.id}</p>
              </div>
              <Button
                onClick={() => handleSendReminder(agent.id, agent.name)}
                size="sm"
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <Bell className="h-4 w-4 mr-1" />
                Send Reminder
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MissingSubmissionsAlert;
