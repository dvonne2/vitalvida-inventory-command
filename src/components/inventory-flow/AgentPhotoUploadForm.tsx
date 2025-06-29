
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, Clock, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const AgentPhotoUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [comment, setComment] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'pending' | 'uploaded' | 'approved'>('pending');
  const { toast } = useToast();

  const getCurrentWeek = () => {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const weekNumber = Math.ceil((now.getDate() + startOfMonth.getDay()) / 7);
    return weekNumber;
  };

  const getDeadlineStatus = () => {
    const now = new Date();
    const dayOfWeek = now.getDay(); // 0 = Sunday, 5 = Friday
    const hour = now.getHours();
    
    if (dayOfWeek === 5 && hour >= 12) {
      return 'overdue';
    } else if (dayOfWeek === 5 && hour < 12) {
      return 'due-today';
    } else if (dayOfWeek > 5 || (dayOfWeek === 6)) {
      return 'overdue';
    }
    return 'on-time';
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
      } else {
        toast({
          title: "Invalid file type",
          description: "Please select a JPEG or PNG image",
          variant: "destructive"
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) return;

    setIsUploading(true);
    
    try {
      // Mock API call - replace with actual endpoint: POST /api/agent-photos/upload
      const formData = new FormData();
      formData.append('photo', selectedFile);
      formData.append('agent_id', 'DA001'); // Replace with actual agent ID
      formData.append('week_number', getCurrentWeek().toString());
      formData.append('comment', comment);
      formData.append('timestamp', new Date().toISOString());
      
      console.log('Uploading photo for week:', getCurrentWeek());
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setUploadStatus('uploaded');
      toast({
        title: "Photo uploaded successfully",
        description: `Week ${getCurrentWeek()} inventory photo submitted for review`,
        variant: "default"
      });
      
      // Reset form
      setSelectedFile(null);
      setComment('');
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Please try again",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };

  const deadlineStatus = getDeadlineStatus();

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <Camera className="h-6 w-6 text-blue-400" />
          Weekly Inventory Photo Upload
          <Badge 
            className={`ml-auto ${
              deadlineStatus === 'overdue' ? 'bg-red-500/20 text-red-400 border-red-500' :
              deadlineStatus === 'due-today' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500' :
              'bg-green-500/20 text-green-400 border-green-500'
            }`}
          >
            Week {getCurrentWeek()} - {
              deadlineStatus === 'overdue' ? 'OVERDUE' :
              deadlineStatus === 'due-today' ? 'DUE TODAY' :
              'ON TIME'
            }
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Deadline Info */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-400">
            <Clock className="h-5 w-5" />
            <span className="font-medium">Deadline: Every Friday before 12:00 PM</span>
          </div>
          <p className="text-slate-300 text-sm mt-1">
            Upload a timestamped photo of your current inventory for verification
          </p>
        </div>

        {/* Current Status */}
        {uploadStatus !== 'pending' && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">
                {uploadStatus === 'uploaded' ? 'Photo Uploaded - Awaiting Approval' : 'Photo Approved'}
              </span>
            </div>
          </div>
        )}

        {/* Upload Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="photo-upload" className="text-slate-300">
              Select Inventory Photo
            </Label>
            <Input
              id="photo-upload"
              type="file"
              accept="image/jpeg,image/png"
              onChange={handleFileSelect}
              className="bg-slate-700 border-slate-600 text-white"
              required
            />
            {selectedFile && (
              <p className="text-sm text-green-400">
                Selected: {selectedFile.name}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="comment" className="text-slate-300">
              Optional Comment
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="e.g. Depot was locked, items moved to secure location"
              className="bg-slate-700 border-slate-600 text-white"
              rows={3}
            />
          </div>

          <Button
            type="submit"
            disabled={!selectedFile || isUploading || uploadStatus !== 'pending'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isUploading ? (
              <>
                <Upload className="mr-2 h-4 w-4 animate-pulse" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" />
                Submit Weekly Photo
              </>
            )}
          </Button>
        </form>

        {/* Instructions */}
        <div className="bg-slate-700/30 rounded-lg p-4">
          <h4 className="text-white font-medium mb-2">Photo Requirements:</h4>
          <ul className="text-slate-300 text-sm space-y-1">
            <li>• Clear view of all inventory items</li>
            <li>• Good lighting and focus</li>
            <li>• Include timestamp visible in photo</li>
            <li>• File format: JPEG or PNG only</li>
            <li>• Maximum file size: 10MB</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default AgentPhotoUploadForm;
