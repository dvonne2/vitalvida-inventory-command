
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RotateCcw } from 'lucide-react';
import DAReturnsForm from './DAReturnsForm';
import FactoryReturnsForm from './FactoryReturnsForm';
import DATransferForm from './DATransferForm';
import ReturnsHistory from './ReturnsHistory';

const ReturnsDashboard = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-slate-800/50 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-red-400" />
            Returns Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="da-returns" className="space-y-4">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700/50">
              <TabsTrigger value="da-returns" className="data-[state=active]:bg-blue-500">
                DA Returns
              </TabsTrigger>
              <TabsTrigger value="factory-returns" className="data-[state=active]:bg-green-500">
                Factory Returns
              </TabsTrigger>
              <TabsTrigger value="da-transfer" className="data-[state=active]:bg-purple-500">
                DA Transfer
              </TabsTrigger>
              <TabsTrigger value="history" className="data-[state=active]:bg-orange-500">
                History
              </TabsTrigger>
            </TabsList>

            <TabsContent value="da-returns">
              <DAReturnsForm />
            </TabsContent>

            <TabsContent value="factory-returns">
              <FactoryReturnsForm />
            </TabsContent>

            <TabsContent value="da-transfer">
              <DATransferForm />
            </TabsContent>

            <TabsContent value="history">
              <ReturnsHistory />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReturnsDashboard;
