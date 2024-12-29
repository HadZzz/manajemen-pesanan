'use client';
// Order Components Library
import { OrderForm } from '../components/orders/OrderForm';
import { OrderProgress } from '../components/orders/OrderProgress';
import { OrderHistory } from '../components/orders/OrderHistory';
import { OrderSkeleton } from "@/app/components/orders/OrderSkeleton"

// React Library
import { useState, useEffect } from 'react';

// Radix Components Library
import { Order } from '@/app/types/order';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";

// Third Party Components Library
import { toast } from 'sonner';

export default function DashboardPage() {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('progress');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null); // Cek apakah pengguna adalah admin

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

      toast.success('Pesanan berhasil dibuat');
      
      // Refresh orders after creating new one
      await fetchOrders();
      setActiveTab('progress');
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Gagal membuat pesanan');
    }
  };

  const handleUpdateOrder = async (orderId: number, updatedOrder) => {
    try {
      const response = await fetch(`/api/orders`, {
        method: 'PUT', // Gunakan PATCH jika hanya ingin memperbarui sebagian data
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId, ...updatedOrder }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      toast.success('Pesanan berhasil diperbarui');

      // Refresh orders after updating
      await fetchOrders();
      setActiveTab('progress');
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Gagal memperbarui pesanan');
    }
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      // Mengirim permintaan DELETE ke API untuk menghapus order beserta komponennya
      const response = await fetch('/api/orders', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orderId })
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      toast.success('Pesanan berhasil dihapus');

      // Update local state setelah penghapusan order
      setActiveOrders(activeOrders.filter(order => order.id !== orderId));

      // Optional: Mengambil data pesanan terbaru setelah penghapusan
      await fetchOrders();
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Gagal menghapus pesanan');
    }
  };

  const handleUpdateStatus = async (orderId, componentId, status) => {
    try {
      console.log(orderId, componentId. status)
      const response = await fetch("/api/components", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({      
          orderId,
          componentId,
          status,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      
      // Update local state
      setActiveOrders(activeOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            components: order.components.map(comp => 
              comp.id === componentId ? { ...comp, status } : comp
            )
          };
        }
        return order;
      }));

      toast.success('Status berhasil diupdate');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Gagal mengupdate status');
    }
  };

  const handleUpdateDescription = async (orderId, componentId, description) => {
    try {
      const response = await fetch("/api/components", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          componentId,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update description");
      }
      
      // Update local state
      setActiveOrders(activeOrders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            components: order.components.map(comp => 
              comp.id === componentId ? { ...comp, description } : comp
            )
          };
        }
        return order;
      }));

      toast.success('Deskripsi berhasil diupdate');
    } catch (error) {
      console.error('Error updating deskripsi:', error);
      toast.error('Gagal mengupdate deskripsi');
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
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto">
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
              onUpdateStatus={handleUpdateStatus}
              onUpdateDescription={handleUpdateDescription}
              onComplete={handleComplete}
              onDeleteOrder={handleDeleteOrder}
              onUpdateOrder={handleUpdateOrder}
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