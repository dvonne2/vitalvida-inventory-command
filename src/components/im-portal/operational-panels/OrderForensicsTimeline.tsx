import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { FileText, Download, User, Clock, Package, ChevronDown, Search } from 'lucide-react';

const OrderForensicsTimeline = () => {
  const [orderId, setOrderId] = useState('');
  const [auditTrail, setAuditTrail] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedEvents, setExpandedEvents] = useState<Set<number>>(new Set());

  const fetchAuditTrail = async () => {
    if (!orderId) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/inventory/audit/${orderId}`);
      const data = await response.json();
      setAuditTrail(data);
    } catch (error) {
      console.error('Failed to fetch audit trail:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleEventExpansion = (index: number) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedEvents(newExpanded);
  };

  const getActionIcon = (action: string) => {
    switch (action.toLowerCase()) {
      case 'deducted': return '📦';
      case 'added': return '➕';
      case 'moved': return '🔄';
      case 'verified': return '✅';
      default: return '📝';
    }
  };

  const getActionColor = (action: string) => {
    switch (action.toLowerCase()) {
      case 'deducted': return 'bg-red-500/20 text-red-400 border-red-500';
      case 'added': return 'bg-green-500/20 text-green-400 border-green-500';
      case 'moved': return 'bg-blue-500/20 text-blue-400 border-blue-500';
      case 'verified': return 'bg-purple-500/20 text-purple-400 border-purple-500';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500';
    }
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <FileText className="h-6 w-6 text-purple-400" />
          Order Forensics Timeline
          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500">
            Audit Trail
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Controls */}
        <div className="flex gap-2">
          <div className="flex-1">
            <Label className="text-slate-300">Order ID</Label>
            <Input
              placeholder="Enter order ID for forensic analysis..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white"
              onKeyDown={(e) => e.key === 'Enter' && fetchAuditTrail()}
            />
          </div>
          <div className="flex gap-2 items-end">
            <Button
              onClick={fetchAuditTrail}
              disabled={!orderId || isLoading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Search className="h-4 w-4 mr-2" />
              {isLoading ? 'Analyzing...' : 'Get Audit Trail'}
            </Button>
            {auditTrail.length > 0 && (
              <Button variant="outline" className="border-slate-600">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            )}
          </div>
        </div>

        {/* Timeline */}
        {auditTrail.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-medium">Audit Trail Events</h3>
              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
                {auditTrail.length} Events
              </Badge>
            </div>

            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-slate-600"></div>
              
              {auditTrail.map((event, index) => (
                <div key={index} className="relative flex gap-4 pb-6">
                  {/* Timeline Node */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-slate-700 border-2 border-slate-600 rounded-full flex items-center justify-center">
                      <span className="text-lg">{getActionIcon(event.action)}</span>
                    </div>
                  </div>

                  {/* Event Card */}
                  <div className="flex-1">
                    <Collapsible 
                      open={expandedEvents.has(index)}
                      onOpenChange={() => toggleEventExpansion(index)}
                    >
                      <CollapsibleTrigger className="w-full">
                        <div className="p-4 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge className={getActionColor(event.action)}>
                                {event.action.toUpperCase()}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-6 w-6">
                                  <AvatarFallback className="text-xs">
                                    {event.user?.charAt(0).toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="text-white text-sm">{event.user}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 text-slate-400 text-sm">
                                <Clock className="h-3 w-3" />
                                {new Date(event.timestamp).toLocaleString()}
                              </div>
                              <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${expandedEvents.has(index) ? 'rotate-180' : ''}`} />
                            </div>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      
                      <CollapsibleContent>
                        <div className="mt-2 p-4 bg-slate-700/50 rounded-lg">
                          <h4 className="text-white font-medium mb-2 flex items-center gap-2">
                            <Package className="h-4 w-4" />
                            Items Affected
                          </h4>
                          <div className="space-y-2">
                            {event.items?.map((item: any, itemIndex: number) => (
                              <div key={itemIndex} className="flex items-center justify-between p-2 bg-slate-800/50 rounded">
                                <div>
                                  <span className="text-white text-sm">{item.name}</span>
                                  <p className="text-slate-400 text-xs">SKU: {item.sku}</p>
                                </div>
                                <Badge variant="outline" className="border-slate-500 text-slate-300">
                                  Qty: {item.quantity}
                                </Badge>
                              </div>
                            ))}
                          </div>
                          {event.notes && (
                            <div className="mt-3 p-2 bg-slate-800/30 rounded">
                              <p className="text-slate-300 text-sm">{event.notes}</p>
                            </div>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {auditTrail.length === 0 && !isLoading && orderId && (
          <div className="p-4 bg-yellow-500/20 border border-yellow-500 rounded-lg">
            <p className="text-yellow-400">No audit trail found for this order ID.</p>
            <p className="text-yellow-300 text-sm mt-1">Try a different order ID or contact support.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderForensicsTimeline;