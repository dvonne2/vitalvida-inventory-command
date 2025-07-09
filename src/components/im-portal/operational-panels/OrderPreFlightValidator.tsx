import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Check, X, Clock, Scan, ChevronDown, AlertTriangle } from 'lucide-react';

const OrderPreFlightValidator = () => {
  const [orderId, setOrderId] = useState('');
  const [eligibilityData, setEligibilityData] = useState<any>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const checkEligibility = async () => {
    if (!orderId) return;
    
    setIsChecking(true);
    try {
      const response = await fetch(`/api/inventory/eligibility/${orderId}`);
      const data = await response.json();
      setEligibilityData(data);
      setDetailsOpen(data.blocked_items?.length > 0);
    } catch (error) {
      console.error('Eligibility check failed:', error);
    } finally {
      setIsChecking(false);
    }
  };

  const getStatusBadge = () => {
    if (isChecking) {
      return (
        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500">
          <Clock className="h-3 w-3 mr-1" />
          Checking
        </Badge>
      );
    }
    
    if (!eligibilityData) return null;
    
    if (eligibilityData.eligible) {
      return (
        <Badge className="bg-green-500/20 text-green-400 border-green-500">
          <Check className="h-3 w-3 mr-1" />
          Eligible
        </Badge>
      );
    }
    
    return (
      <Badge className="bg-red-500/20 text-red-400 border-red-500">
        <X className="h-3 w-3 mr-1" />
        Blocked
      </Badge>
    );
  };

  return (
    <Card className="bg-slate-800/50 border-slate-700">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <Check className="h-6 w-6 text-green-400" />
          Order Pre-Flight Validator
          {getStatusBadge()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Order ID Input */}
        <div className="space-y-2">
          <Label className="text-slate-300">Order ID</Label>
          <div className="flex gap-2">
            <Input
              placeholder="Enter order ID to validate..."
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="bg-slate-700/50 border-slate-600 text-white"
              onKeyDown={(e) => e.key === 'Enter' && checkEligibility()}
            />
            <Button variant="outline" size="icon" className="border-slate-600">
              <Scan className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <Button
          onClick={checkEligibility}
          disabled={!orderId || isChecking}
          className="w-full bg-green-600 hover:bg-green-700"
        >
          {isChecking ? 'Validating...' : 'Check Eligibility'}
        </Button>

        {/* Eligibility Results */}
        {eligibilityData && (
          <div className="space-y-4">
            {eligibilityData.eligible ? (
              <div className="p-4 bg-green-500/20 border border-green-500 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Check className="h-5 w-5 text-green-400" />
                  <span className="text-green-400 font-medium">Ready to Process</span>
                </div>
                <p className="text-green-300 text-sm">{eligibilityData.reason}</p>
              </div>
            ) : (
              <div className="p-4 bg-red-500/20 border border-red-500 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <X className="h-5 w-5 text-red-400" />
                  <span className="text-red-400 font-medium">Processing Blocked</span>
                </div>
                <p className="text-red-300 text-sm">{eligibilityData.reason}</p>
              </div>
            )}

            {/* Expandable Details */}
            {eligibilityData.blocked_items?.length > 0 && (
              <Collapsible open={detailsOpen} onOpenChange={setDetailsOpen}>
                <CollapsibleTrigger className="flex items-center justify-between w-full p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50">
                  <span className="text-white font-medium">Blocked Items Details</span>
                  <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${detailsOpen ? 'rotate-180' : ''}`} />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2">
                  <div className="space-y-2">
                    {eligibilityData.blocked_items.map((item: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                        <div>
                          <span className="text-white font-medium">{item.name}</span>
                          <p className="text-slate-400 text-sm">SKU: {item.sku}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-yellow-400" />
                          <span className="text-yellow-400 text-sm">{item.reason}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}

            {/* Risk Indicators */}
            {eligibilityData.low_stock_items && (
              <div className="p-3 bg-yellow-500/20 border border-yellow-500 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  <span className="text-yellow-400 font-medium">Low Stock Warning</span>
                </div>
                <p className="text-yellow-300 text-sm">
                  {eligibilityData.low_stock_items.length} items running low on inventory
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OrderPreFlightValidator;