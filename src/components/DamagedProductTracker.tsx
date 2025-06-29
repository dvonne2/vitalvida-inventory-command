
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { AlertTriangle, Camera, Eye, Calendar, MapPin, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface DamagedStockItem {
  id: string;
  product_name: string;
  quantity: number;
  reported_by_agent: string;
  location: string;
  date_reported: string;
  photo_url: string;
  status: 'reported' | 'investigating' | 'resolved';
}

const DamagedProductTracker = () => {
  const [damagedStock, setDamagedStock] = useState<DamagedStockItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  useEffect(() => {
    // Mock API call - replace with actual endpoint: GET /api/inventory/damaged-stock
    const fetchDamagedStock = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data matching your example format
        const mockData: DamagedStockItem[] = [
          {
            id: '1',
            product_name: 'Shampoo',
            quantity: 2,
            reported_by_agent: 'Israel',
            location: 'Benin',
            date_reported: 'June 28',
            photo_url: '/api/photos/damaged-shampoo-001.jpg',
            status: 'reported'
          },
          {
            id: '2',
            product_name: 'Conditioner',
            quantity: 1,
            reported_by_agent: 'Amina',
            location: 'Lagos',
            date_reported: 'June 25',
            photo_url: '/api/photos/damaged-conditioner-001.jpg',
            status: 'investigating'
          },
          {
            id: '3',
            product_name: 'Pomade',
            quantity: 3,
            reported_by_agent: 'Femi',
            location: 'Abeokuta',
            date_reported: 'June 20',
            photo_url: '/api/photos/damaged-pomade-001.jpg',
            status: 'resolved'
          },
          {
            id: '4',
            product_name: 'Hydration Tea',
            quantity: 5,
            reported_by_agent: 'Kemi',
            location: 'Ibadan',
            date_reported: 'June 15',
            photo_url: '/api/photos/damaged-tea-001.jpg',
            status: 'reported'
          }
        ];
        
        setDamagedStock(mockData);
      } catch (error) {
        console.error('Failed to fetch damaged stock data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDamagedStock();
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'reported':
        return (
          <Badge className="bg-red-500/20 text-red-400 border-red-500">
            Reported
          </Badge>
        );
      case 'investigating':
        return (
          <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500">
            Investigating
          </Badge>
        );
      case 'resolved':
        return (
          <Badge className="bg-green-500/20 text-green-400 border-green-500">
            Resolved
          </Badge>
        );
      default:
        return null;
    }
  };

  const totalDamagedUnits = damagedStock.reduce((sum, item) => sum + item.quantity, 0);
  const activeReports = damagedStock.filter(item => item.status === 'reported').length;

  if (loading) {
    return (
      <Card className="bg-slate-800/50 border-slate-700">
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-400 mx-auto"></div>
          <p className="text-slate-400 mt-2">Loading damaged stock data...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Statistics */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              Damaged Stock Dashboard
            </CardTitle>
            <div className="flex items-center gap-4">
              <div className="text-sm text-slate-400">
                Active Reports: <span className="text-red-400 font-medium">{activeReports}</span>
              </div>
              <div className="text-sm text-slate-400">
                Total Damaged Units: <span className="text-red-400 font-medium">{totalDamagedUnits}</span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-slate-300">
            Track all damaged or unusable stock with full traceability. Monitor product damage reports, 
            agent accountability, and photo evidence for insurance and quality control purposes.
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Pending Reports</p>
                <p className="text-2xl font-bold text-red-400">
                  {damagedStock.filter(item => item.status === 'reported').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Under Investigation</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {damagedStock.filter(item => item.status === 'investigating').length}
                </p>
              </div>
              <Eye className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800/50 border-slate-700">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm">Resolved Cases</p>
                <p className="text-2xl font-bold text-green-400">
                  {damagedStock.filter(item => item.status === 'resolved').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <span className="text-green-400 text-lg">✓</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Damaged Stock Table */}
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Damaged Stock Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300 font-semibold">Product</TableHead>
                  <TableHead className="text-slate-300 font-semibold text-center">Quantity</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Damaged By (Agent Name)</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Location (City/Depot)</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Date Reported</TableHead>
                  <TableHead className="text-slate-300 font-semibold text-center">Photo Proof</TableHead>
                  <TableHead className="text-slate-300 font-semibold">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {damagedStock.map((item) => (
                  <TableRow key={item.id} className="border-slate-700 hover:bg-slate-700/30">
                    <TableCell className="font-medium text-white">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-400" />
                        {item.product_name}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="bg-red-500/20 text-red-400 border border-red-500/30 rounded px-2 py-1 font-medium">
                        {item.quantity}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-blue-400" />
                        {item.reported_by_agent}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-orange-400" />
                        {item.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-300">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-purple-400" />
                        {item.date_reported}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            onClick={() => setSelectedPhoto(item.photo_url)}
                          >
                            <Camera className="h-4 w-4 mr-1" />
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                          <DialogHeader>
                            <DialogTitle className="text-white">
                              Damage Photo - {item.product_name}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="bg-slate-700/30 rounded-lg p-4 flex items-center justify-center min-h-[300px]">
                              <div className="text-center">
                                <Camera className="h-16 w-16 text-slate-400 mx-auto mb-4" />
                                <p className="text-slate-400">Photo Evidence</p>
                                <p className="text-slate-500 text-sm mt-1">{item.photo_url}</p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <p className="text-slate-400">Reported by:</p>
                                <p className="text-white font-medium">{item.reported_by_agent}</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Location:</p>
                                <p className="text-white font-medium">{item.location}</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Date:</p>
                                <p className="text-white font-medium">{item.date_reported}</p>
                              </div>
                              <div>
                                <p className="text-slate-400">Quantity:</p>
                                <p className="text-red-400 font-medium">{item.quantity} units</p>
                              </div>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {damagedStock.length === 0 && (
            <div className="text-center py-8">
              <AlertTriangle className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-400">No damaged stock reports found</p>
              <p className="text-slate-500 text-sm">All products are in good condition</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DamagedProductTracker;
