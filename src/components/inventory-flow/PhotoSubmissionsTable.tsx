
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, CheckCircle, XCircle } from 'lucide-react';

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

interface PhotoSubmissionsTableProps {
  photoSubmissions: PhotoSubmission[];
  onApprove: (submissionId: string) => void;
  onViewPhoto: (submission: PhotoSubmission) => void;
  isProcessing: boolean;
}

const PhotoSubmissionsTable = ({ 
  photoSubmissions, 
  onApprove, 
  onViewPhoto, 
  isProcessing 
}: PhotoSubmissionsTableProps) => {
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
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white">Photo Submissions for Review</CardTitle>
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
                    onClick={() => onViewPhoto(submission)}
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
                        onClick={() => onApprove(submission.id)}
                        disabled={isProcessing}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => onViewPhoto(submission)}
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
  );
};

export default PhotoSubmissionsTable;
