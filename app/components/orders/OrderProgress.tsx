'use client';
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign } from "lucide-react";
import { Order, Component } from '@/app/types/order';

interface OrderProgressProps {
  orders: Order[];
  onUpdateProgress: (orderId: number, componentId: number, progress: number) => void;
  onComplete: (orderId: number) => void;
}

const calculateStatus = (components: Component[]): string => {
  if (!components || components.length === 0) return 'Belum Dimulai';
  
  const totalProgress = components.reduce((sum, comp) => {
    const progress = typeof comp.progress === 'number' ? comp.progress : 0;
    return sum + progress;
  }, 0);
  const averageProgress = totalProgress / components.length;
  
  if (averageProgress === 0) return 'Belum Dimulai';
  if (averageProgress === 100) return 'Siap Diselesaikan';
  return `Dalam Proses (${Math.round(averageProgress)}%)`;
};

const isOrderComplete = (components: Component[]): boolean => {
  return components.every(comp => {
    const progress = typeof comp.progress === 'number' ? comp.progress : 0;
    return progress === 100;
  });
};

export const OrderProgress = ({ orders, onUpdateProgress, onComplete }: OrderProgressProps) => {
  const handleProgressChange = async (orderId: number, componentId: number, progress: number) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          componentId,
          progress
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      onUpdateProgress(orderId, componentId, progress);
    } catch (error) {
      console.error('Error updating progress:', error);
      alert('Failed to update progress. Please try again.');
    }
  };

  const handleCompleteOrder = async (orderId: number) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId,
          status: 'completed'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to complete order');
      }

      onComplete(orderId);
    } catch (error) {
      console.error('Error completing order:', error);
      alert('Failed to complete order. Please try again.');
    }
  };

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <Card key={order.id} className="w-full overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-2xl text-blue-900">{order.customerName}</CardTitle>
                <p className="text-blue-600 font-medium">{order.productName}</p>
              </div>
              <div className="text-right">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isOrderComplete(order.components) 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {calculateStatus(order.components)}
                </span>
                {isOrderComplete(order.components) && (
                  <Button 
                    onClick={() => handleCompleteOrder(order.id)}
                    className="mt-2"
                    variant="default"
                  >
                    Selesaikan Pesanan
                  </Button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Total: Rp {parseInt(order.totalPrice).toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">
                    {new Date(order.deadline).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="space-y-6">
              {order.components.map((component) => (
                <div key={component.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h4 className="font-medium">{component.name}</h4>
                      <p className="text-sm text-gray-600">
                        {component.quantity} unit - Rp {parseInt(component.price).toLocaleString()}/unit
                      </p>
                    </div>
                    <span className="font-medium text-blue-600">
                      {typeof component.progress === 'number' ? component.progress : 0}%
                    </span>
                  </div>
                  <div className="space-y-2">
                    <Input 
                      type="range"
                      min="0"
                      max="100"
                      value={typeof component.progress === 'number' ? component.progress : 0}
                      onChange={(e) => handleProgressChange(
                        order.id,
                        component.id,
                        parseInt(e.target.value)
                      )}
                    />
                    <Progress value={typeof component.progress === 'number' ? component.progress : 0} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};