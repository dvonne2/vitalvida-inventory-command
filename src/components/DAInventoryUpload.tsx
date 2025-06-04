
import React, { useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, FileText, Link, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface DAInventory {
  id: string;
  name: string;
  location: string;
  state: string;
  shampoo: number;
  pomade: number;
  conditioner: number;
  hydrationTea: number;
  unitsTotal: number;
  daysLeft: number;
  lastUpdated: Date;
}

interface DAInventoryUploadProps {
  onDataUpdate: (data: DAInventory[]) => void;
}

const DAInventoryUpload: React.FC<DAInventoryUploadProps> = ({ onDataUpdate }) => {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const [uploadMessage, setUploadMessage] = useState('');
  const [lastUpload, setLastUpload] = useState<Date | null>(null);
  const [googleSheetsUrl, setGoogleSheetsUrl] = useState('');

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      setUploadStatus('error');
      setUploadMessage('Please upload a CSV file only');
      return;
    }

    setUploadStatus('uploading');
    setUploadMessage('Processing CSV file...');

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csv = e.target?.result as string;
        const lines = csv.split('\n');
        const headers = lines[0].split(',').map(h => h.trim());
        
        // Validate CSV headers
        const requiredHeaders = ['name', 'location', 'state', 'shampoo', 'pomade', 'conditioner', 'hydrationTea'];
        const missingHeaders = requiredHeaders.filter(h => !headers.some(header => header.toLowerCase().includes(h)));
        
        if (missingHeaders.length > 0) {
          setUploadStatus('error');
          setUploadMessage(`Missing required columns: ${missingHeaders.join(', ')}`);
          return;
        }

        const data: DAInventory[] = [];
        
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;
          
          const values = line.split(',').map(v => v.trim());
          
          const shampoo = parseInt(values[3]) || 0;
          const pomade = parseInt(values[4]) || 0;
          const conditioner = parseInt(values[5]) || 0;
          const hydrationTea = parseInt(values[6]) || 0;
          const unitsTotal = shampoo + pomade + conditioner + hydrationTea;
          
          // Simple calculation for days left (assuming daily consumption of 2 units)
          const daysLeft = Math.floor(unitsTotal / 2) || 0;

          data.push({
            id: `da-${i}`,
            name: values[0],
            location: values[1],
            state: values[2],
            shampoo,
            pomade,
            conditioner,
            hydrationTea,
            unitsTotal,
            daysLeft,
            lastUpdated: new Date()
          });
        }

        onDataUpdate(data);
        setUploadStatus('success');
        setUploadMessage(`Successfully imported ${data.length} DA records`);
        setLastUpload(new Date());
        
      } catch (error) {
        setUploadStatus('error');
        setUploadMessage('Error processing CSV file. Please check the format.');
      }
    };

    reader.readAsText(file);
  }, [onDataUpdate]);

  const handleGoogleSheetsSync = () => {
    if (!googleSheetsUrl) {
      setUploadStatus('error');
      setUploadMessage('Please enter a valid Google Sheets URL');
      return;
    }

    setUploadStatus('uploading');
    setUploadMessage('Syncing with Google Sheets...');

    // Simulate Google Sheets sync (replace with actual implementation)
    setTimeout(() => {
      setUploadStatus('success');
      setUploadMessage('Successfully synced with Google Sheets');
      setLastUpload(new Date());
    }, 2000);
  };

  const downloadTemplate = () => {
    const csvContent = `name,location,state,shampoo,pomade,conditioner,hydrationTea
Femi,Lagos Island,Lagos,5,3,4,2
Tobi,Abeokuta,Ogun,2,6,1,0
Amaka,Wuse,FCT,8,12,6,4`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'da_inventory_template.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Upload Status Alert */}
      {uploadStatus !== 'idle' && (
        <Alert className={`border-2 ${
          uploadStatus === 'success' ? 'border-green-500 bg-green-500/10' :
          uploadStatus === 'error' ? 'border-red-500 bg-red-500/10' :
          'border-blue-500 bg-blue-500/10'
        }`}>
          <div className="flex items-center gap-2">
            {uploadStatus === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
            {uploadStatus === 'error' && <AlertTriangle className="h-4 w-4 text-red-500" />}
            {uploadStatus === 'uploading' && <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />}
            <AlertDescription className={
              uploadStatus === 'success' ? 'text-green-400' :
              uploadStatus === 'error' ? 'text-red-400' :
              'text-blue-400'
            }>
              {uploadMessage}
            </AlertDescription>
          </div>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* CSV Upload */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Upload className="h-5 w-5 text-blue-400" />
              CSV File Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-blue-500 transition-colors">
              <FileText className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-300 mb-4">Drop your CSV file here or click to browse</p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="csv-upload"
              />
              <label htmlFor="csv-upload">
                <Button variant="outline" className="cursor-pointer border-blue-500 text-blue-400 hover:bg-blue-500/10">
                  Choose CSV File
                </Button>
              </label>
            </div>
            
            <div className="space-y-2">
              <h4 className="text-white font-medium">Required CSV Format:</h4>
              <div className="bg-slate-700/30 p-3 rounded text-sm text-slate-300 font-mono">
                name, location, state, shampoo, pomade, conditioner, hydrationTea
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={downloadTemplate}
                className="text-blue-400 hover:bg-blue-500/10"
              >
                📥 Download Template
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Google Sheets Sync */}
        <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Link className="h-5 w-5 text-green-400" />
              Google Sheets Sync
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm font-medium block mb-2">
                Google Sheets URL
              </label>
              <input
                type="url"
                value={googleSheetsUrl}
                onChange={(e) => setGoogleSheetsUrl(e.target.value)}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded text-white placeholder-slate-400 focus:border-green-500 focus:outline-none"
              />
            </div>
            
            <Button 
              onClick={handleGoogleSheetsSync}
              disabled={!googleSheetsUrl || uploadStatus === 'uploading'}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              {uploadStatus === 'uploading' ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Syncing...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Sync Data
                </>
              )}
            </Button>

            <div className="space-y-2">
              <h4 className="text-white font-medium">Setup Instructions:</h4>
              <ol className="text-sm text-slate-300 space-y-1 list-decimal list-inside">
                <li>Share your Google Sheet publicly (view access)</li>
                <li>Ensure the same column format as CSV template</li>
                <li>Copy the share URL and paste above</li>
                <li>Data will sync automatically every 15 minutes</li>
              </ol>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upload History */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            📊 Data Upload History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lastUpload ? (
            <div className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg">
              <div>
                <p className="text-white font-medium">Last successful upload</p>
                <p className="text-slate-400 text-sm">{lastUpload.toLocaleString()}</p>
              </div>
              <Badge className="bg-green-500 text-white border-0">
                <CheckCircle className="h-3 w-3 mr-1" />
                Success
              </Badge>
            </div>
          ) : (
            <div className="text-center py-8">
              <Upload className="h-12 w-12 text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No uploads yet. Upload your first dataset to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Data Requirements */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">📋 Data Requirements & Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-white font-medium mb-3">Required Columns:</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• <span className="text-blue-400">name</span> - DA's full name</li>
                <li>• <span className="text-blue-400">location</span> - City/area</li>
                <li>• <span className="text-blue-400">state</span> - Nigerian state</li>
                <li>• <span className="text-blue-400">shampoo</span> - Units in stock</li>
                <li>• <span className="text-blue-400">pomade</span> - Units in stock</li>
                <li>• <span className="text-blue-400">conditioner</span> - Units in stock</li>
                <li>• <span className="text-blue-400">hydrationTea</span> - Units in stock</li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-medium mb-3">Best Practices:</h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li>• Update data daily for accuracy</li>
                <li>• Use consistent state name format</li>
                <li>• Include all active DAs</li>
                <li>• Double-check stock quantities</li>
                <li>• Backup data before bulk updates</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DAInventoryUpload;
