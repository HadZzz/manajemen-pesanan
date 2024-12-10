'use client';
import { OrderForm } from '../components/orders/OrderForm';
import { OrderProgress } from '../components/orders/OrderProgress';
import { OrderHistory } from '../components/orders/OrderHistory';
import { useState, useEffect } from 'react';
import { Order } from '@/app/types/order';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import { toast } from 'sonner';

// Komponen Skeleton untuk loading state
const OrderSkeleton = () => (
  <div className="space-y-6">
    {[1, 2, 3].map((index) => (
      <Card key={index} className="w-full">
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
            <div className="h-8 bg-gray-200 rounded w-full"></div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

export default function DashboardPage() {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('progress');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/orders');
      
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      
      const data = await response.json();
      
      // Separate active and completed orders
      const active = data.filter((order: Order) => order.status === 'active');
      const completed = data.filter((order: Order) => order.status === 'completed');
      
      setActiveOrders(active);
      setCompletedOrders(completed);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Gagal memuat data pesanan');
      toast.error('Gagal memuat data pesanan');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleNewOrder = async (order: Order) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(order)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const newOrder = await response.json();
      toast.success('Pesanan berhasil dibuat');
      
      // Refresh orders after creating new one
      await fetchOrders();
      setActiveTab('progress');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Gagal membuat pesanan');
    }
  };

  const handleUpdateProgress = async (orderId: number, componentId: number, progress: number) => {
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
      
      // Update local state
      setActiveOrders(activeOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            components: order.components.map(comp => 
              comp.id === componentId ? { ...comp, progress } : comp
            )
          };
        }
        return order;
      }));

      toast.success('Progress berhasil diupdate');
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Gagal mengupdate progress');
    }
  };

  const handleComplete = async (orderId: number) => {
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
      
      toast.success('Pesanan berhasil diselesaikan');
      await fetchOrders();
    } catch (error) {
      console.error('Error completing order:', error);
      toast.error('Gagal menyelesaikan pesanan');
    }
  };

  // Error state
  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-12">
          <p className="text-red-500 mb-4">{error}</p>
          <Button onClick={fetchOrders}>Coba Lagi</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="flex space-x-4">
        <Button 
          variant={activeTab === 'new' ? 'default' : 'outline'}
          onClick={() => setActiveTab('new')}
        >
          Pesanan Baru
        </Button>
        <Button 
          variant={activeTab === 'progress' ? 'default' : 'outline'}
          onClick={() => setActiveTab('progress')}
        >
          Progress Pesanan
        </Button>
        <Button 
          variant={activeTab === 'history' ? 'default' : 'outline'}
          onClick={() => setActiveTab('history')}
        >
          Riwayat
        </Button>
      </div>

      {isLoading ? (
        <OrderSkeleton />
      ) : (
        <>
          {activeTab === 'new' && (
            <OrderForm onSubmit={handleNewOrder} />
          )}

          {activeTab === 'progress' && (
            <OrderProgress
              orders={activeOrders}
              onUpdateProgress={handleUpdateProgress}
              onComplete={handleComplete}
            />
          )}

          {activeTab === 'history' && (
            <OrderHistory orders={completedOrders} />
          )}
        </>
      )}
    </div>
  );
}