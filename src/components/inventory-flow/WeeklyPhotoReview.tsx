
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MissingSubmissionsAlert from './MissingSubmissionsAlert';
import PhotoSubmissionsTable from './PhotoSubmissionsTable';
import PhotoReviewModal from './PhotoReviewModal';

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

  const handleReject = async (submissionId: string, comment: string) => {
    setIsProcessing(true);
    try {
      // Mock API call - replace with actual endpoint: PUT /api/agent-photos/reject
      console.log('Rejecting photo:', submissionId, 'Reason:', comment);
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-3">
            <Calendar className="h-6 w-6 text-purple-400" />
            Weekly Photo Verification Dashboard
            <Badge className="ml-auto bg-purple-500/20 text-purple-400 border-purple-500">
              {photoSubmissions.filter(p => p.status === 'pending').length} Pending Reviews
            </Badge>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Missing Submissions Alert */}
      <MissingSubmissionsAlert pendingAgents={pendingAgents} />

      {/* Photo Submissions Table */}
      <PhotoSubmissionsTable
        photoSubmissions={photoSubmissions}
        onApprove={handleApprove}
        onViewPhoto={setSelectedPhoto}
        isProcessing={isProcessing}
      />

      {/* Photo Review Modal */}
      <PhotoReviewModal
        selectedPhoto={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
        onApprove={handleApprove}
        onReject={handleReject}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default WeeklyPhotoReview;
