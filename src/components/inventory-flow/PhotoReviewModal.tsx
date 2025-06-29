
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CheckCircle, XCircle } from 'lucide-react';
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

interface PhotoReviewModalProps {
  selectedPhoto: PhotoSubmission | null;
  onClose: () => void;
  onApprove: (submissionId: string) => void;
  onReject: (submissionId: string, comment: string) => void;
  isProcessing: boolean;
}

const PhotoReviewModal = ({ 
  selectedPhoto, 
  onClose, 
  onApprove, 
  onReject, 
  isProcessing 
}: PhotoReviewModalProps) => {
  const [rejectionComment, setRejectionComment] = useState('');
  const { toast } = useToast();

  const handleReject = () => {
    if (!rejectionComment.trim()) {
      toast({
        title: "Comment required",
        description: "Please provide a reason for rejection",
        variant: "destructive"
      });
      return;
    }
    onReject(selectedPhoto!.id, rejectionComment);
    setRejectionComment('');
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

  if (!selectedPhoto) {
    return null;
  }

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center justify-between">
          Photo Verification - {selectedPhoto.agent_name}
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
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
                  <label className="text-slate-300 text-sm">Rejection Reason (if flagging photo)</label>
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
                    onClick={() => onApprove(selectedPhoto.id)}
                    disabled={isProcessing}
                    className="bg-green-600 hover:bg-green-700 text-white flex-1"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    ✅ Approve Photo
                  </Button>
                  <Button
                    onClick={handleReject}
                    disabled={isProcessing || !rejectionComment.trim()}
                    className="bg-red-600 hover:bg-red-700 text-white flex-1"
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    ❌ Needs Better Photo
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PhotoReviewModal;
