
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, CheckCircle, XCircle, Bell, MessageSquare, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PhotoSubmission {
  id: string;
  agent_id: string;
  agent_name: string;
  week_number: number;
  month: string;
  photo_url: string;
  timestamp: string;
  comment?: string;
  status: 'pending' | 'approved' | 'rejected';
  uploaded_at: string;
}

const WeeklyPhotoReview = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoSubmission | null>(null);
  const [rejectionComment, setRejectionComment] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  // Mock data - replace with actual API call
  const [photoSubmissions, setPhotoSubmissions] = useState<PhotoSubmission[]>([
    {
      id: '1',
      agent_id: 'DA001',
      agent_name: 'Femi Adebayo',
      week_number: 1,
      month: 'January 2025',
      photo_url: '/placeholder.svg',
      timestamp: '2025-01-03T11:45:00Z',
      comment: 'All items secured in depot',
      status: 'pending',
      uploaded_at: '2025-01-03T11:45:00Z'
    },
    {
      id: '2',
      agent_id: 'DA002',
      agent_name: 'Tobi Johnson',
      week_number: 1,
      month: 'January 2025',
      photo_url: '/placeholder.svg',
      timestamp: '2025-01-03T10:30:00Z',
      status: 'approved',
      uploaded_at: '2025-01-03T10:30:00Z'
    },
    {
      id: '3',
      agent_id: 'DA003',
      agent_name: 'Amaka Okafor',
      week_number: 1,
      month: 'January 2025',
      photo_url: '/placeholder.svg',
      timestamp: '2025-01-03T12:15:00Z',
      status: 'rejected',
      uploaded_at: '2025-01-03T12:15:00Z'
    }
  ]);

  const pendingAgents = [
    { id: 'DA004', name: 'Kemi Williams' },
    { id: 'DA005', name: 'Chidi Okonkwo' }
  ];

  const handleApprove = async (submissionId: string) => {
    setIsProcessing(true);
    try {
      // Mock API call - replace with actual endpoint: PUT /api/agent-photos/approve
      console.log('Approving photo:', submissionId);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPhotoSubmissions(prev => 
        prev.map(photo => 
          photo.id === submissionId 
            ? { ...photo, status: 'approved' as const }
            : photo
        )
      );
      
      toast({
        title: "Photo approved",
        description: "Agent's weekly photo has been approved",
        variant: "default"
      });
    } catch (error) {
      toast({
        title: "Approval failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async (submissionId: string) => {
    if (!rejectionComment.trim()) {
      toast({
        title: "Comment required",
        description: "Please provide a reason for rejection",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    try {
      // Mock API call - replace with actual endpoint: PUT /api/agent-photos/reject
      console.log('Rejecting photo:', submissionId, 'Reason:', rejectionComment);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setPhotoSubmissions(prev => 
        prev.map(photo => 
          photo.id === submissionId 
            ? { ...photo, status: 'rejected' as const }
            : photo
        )
      );
      
      toast({
        title: "Photo rejected",
        description: "Agent has been notified to submit a better photo",
        variant: "default"
      });
      
      setRejectionComment('');
      setSelectedPhoto(null);
    } catch (error) {
      toast({
        title: "Rejection failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500">✅ Approved</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500">❌ Rejected</Badge>;
      default:
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500">⏳ Pending</Badge>;
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Calendar className="h-6 w-6 text-purple-400" />
            Weekly Photo Review Dashboard
            <Badge className="ml-auto bg-purple-500/20 text-purple-400 border-purple-500">
              {photoSubmissions.filter(p => p.status === 'pending').length} Pending Reviews
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Missing Submissions Alert */}
      {pendingAgents.length > 0 && (
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
      )}

      {/* Photo Submissions Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Submitted Photos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-slate-700">
                <TableHead className="text-slate-300">Agent</TableHead>
                <TableHead className="text-slate-300">Week</TableHead>
                <TableHead className="text-slate-300">Uploaded</TableHead>
                <TableHead className="text-slate-300">Status</TableHead>
                <TableHead className="text-slate-300">Photo</TableHead>
                <TableHead className="text-slate-300">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {photoSubmissions.map((submission) => (
                <TableRow key={submission.id} className="border-slate-700">
                  <TableCell className="text-white">
                    <div>
                      <p className="font-medium">{submission.agent_name}</p>
                      <p className="text-slate-400 text-sm">{submission.agent_id}</p>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-300">
                    Week {submission.week_number}
                  </TableCell>
                  <TableCell className="text-slate-300">
                    {formatTimestamp(submission.uploaded_at)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(submission.status)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedPhoto(submission)}
                      className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    {submission.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(submission.id)}
                          disabled={isProcessing}
                          className="bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => setSelectedPhoto(submission)}
                          disabled={isProcessing}
                          className="bg-red-600 hover:bg-red-700 text-white"
                        >
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Photo Review Modal */}
      {selectedPhoto && (
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-between">
              Photo Review - {selectedPhoto.agent_name}
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedPhoto(null)}
                className="border-slate-600 text-slate-300"
              >
                Close
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <img
                  src={selectedPhoto.photo_url}
                  alt={`${selectedPhoto.agent_name} - Week ${selectedPhoto.week_number}`}
                  className="w-full h-64 object-cover rounded-lg border border-slate-600"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium">Submission Details</h4>
                  <div className="space-y-2 mt-2">
                    <p className="text-slate-300"><span className="text-slate-400">Agent:</span> {selectedPhoto.agent_name}</p>
                    <p className="text-slate-300"><span className="text-slate-400">Week:</span> {selectedPhoto.week_number}</p>
                    <p className="text-slate-300"><span className="text-slate-400">Uploaded:</span> {formatTimestamp(selectedPhoto.uploaded_at)}</p>
                    {selectedPhoto.comment && (
                      <p className="text-slate-300"><span className="text-slate-400">Comment:</span> {selectedPhoto.comment}</p>
                    )}
                  </div>
                </div>

                {selectedPhoto.status === 'pending' && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-slate-300 text-sm">Rejection Reason (if applicable)</label>
                      <Textarea
                        value={rejectionComment}
                        onChange={(e) => setRejectionComment(e.target.value)}
                        placeholder="e.g. Photo is blurry, items not clearly visible, need better lighting"
                        className="bg-slate-700 border-slate-600 text-white"
                        rows={3}
                      />
                    </div>
                    
                    <div className="flex gap-3">
                      <Button
                        onClick={() => handleApprove(selectedPhoto.id)}
                        disabled={isProcessing}
                        className="bg-green-600 hover:bg-green-700 text-white flex-1"
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve Photo
                      </Button>
                      <Button
                        onClick={() => handleReject(selectedPhoto.id)}
                        disabled={isProcessing || !rejectionComment.trim()}
                        className="bg-red-600 hover:bg-red-700 text-white flex-1"
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Need Better Photo
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeeklyPhotoReview;
