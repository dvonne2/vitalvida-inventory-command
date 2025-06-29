
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, CheckCircle, XCircle, Clock, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MissingSubmissionsAlert from './MissingSubmissionsAlert';
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
  const [currentMonth, setCurrentMonth] = useState('January 2025');
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
    },
    {
      id: '4',
      agent_id: 'DA004',
      agent_name: 'Kemi Williams',
      week_number: 1,
      month: 'January 2025',
      photo_url: '/placeholder.svg',
      timestamp: '2025-01-04T09:20:00Z',
      status: 'pending',
      uploaded_at: '2025-01-04T09:20:00Z'
    },
    {
      id: '5',
      agent_id: 'DA005',
      agent_name: 'Chidi Okonkwo',
      week_number: 1,
      month: 'January 2025',
      photo_url: '/placeholder.svg',
      timestamp: '2025-01-04T14:10:00Z',
      status: 'approved',
      uploaded_at: '2025-01-04T14:10:00Z'
    },
    {
      id: '6',
      agent_id: 'DA006',
      agent_name: 'Bola Ogundipe',
      week_number: 1,
      month: 'January 2025',
      photo_url: '/placeholder.svg',
      timestamp: '2025-01-04T16:30:00Z',
      status: 'pending',
      uploaded_at: '2025-01-04T16:30:00Z'
    }
  ]);

  const pendingAgents = [
    { id: 'DA007', name: 'Yemi Adesanya' },
    { id: 'DA008', name: 'Funmi Adeleke' }
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-400" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-3">
              <Calendar className="h-6 w-6 text-purple-400" />
              Weekly Photo Verification Dashboard
              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500">
                {photoSubmissions.filter(p => p.status === 'pending').length} Pending Reviews
              </Badge>
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-white font-medium px-4">{currentMonth}</span>
              <Button variant="outline" size="sm" className="text-slate-300 border-slate-600">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Missing Submissions Alert */}
      <MissingSubmissionsAlert pendingAgents={pendingAgents} />

      {/* Photo Grid */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white text-lg">Photo Submissions - Week 1</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {photoSubmissions.map((photo) => (
              <div
                key={photo.id}
                className="relative group bg-slate-700/30 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-all"
              >
                {/* Photo Container */}
                <div className="relative mb-3">
                  <img
                    src={photo.photo_url}
                    alt={`${photo.agent_name} submission`}
                    className="w-full h-32 object-cover rounded-lg bg-slate-700"
                  />
                  
                  {/* Status Overlay */}
                  <div className="absolute top-2 right-2">
                    <div className={`p-1 rounded-full ${photo.status === 'approved' ? 'bg-green-500/20' : photo.status === 'rejected' ? 'bg-red-500/20' : 'bg-yellow-500/20'}`}>
                      {getStatusIcon(photo.status)}
                    </div>
                  </div>

                  {/* View Button Overlay */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                    <Button
                      onClick={() => setSelectedPhoto(photo)}
                      size="sm"
                      className="bg-white/20 hover:bg-white/30 text-white border-white/30"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>

                {/* Agent Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium truncate">{photo.agent_name}</h3>
                    <Badge className={`text-xs ${getStatusColor(photo.status)}`}>
                      {photo.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="text-slate-400 text-sm">
                    <p>ID: {photo.agent_id}</p>
                    <p>Uploaded: {new Date(photo.uploaded_at).toLocaleDateString()}</p>
                  </div>

                  {photo.comment && (
                    <p className="text-slate-300 text-xs bg-slate-700/50 p-2 rounded truncate">
                      "{photo.comment}"
                    </p>
                  )}

                  {/* Quick Actions for Pending Photos */}
                  {photo.status === 'pending' && (
                    <div className="flex gap-2 pt-2">
                      <Button
                        onClick={() => handleApprove(photo.id)}
                        disabled={isProcessing}
                        size="sm"
                        className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Approve
                      </Button>
                      <Button
                        onClick={() => setSelectedPhoto(photo)}
                        disabled={isProcessing}
                        size="sm"
                        variant="outline"
                        className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

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
