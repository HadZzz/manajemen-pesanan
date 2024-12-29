import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Order } from '@/app/types/order';

export const useOrders = () => {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/orders');

      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
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

  const createOrder = async (order: Order) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(order),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      toast.success('Pesanan berhasil dibuat');
      await fetchOrders();
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Gagal membuat pesanan');
    }
  };

  const updateOrder = async (orderId: number, updatedOrder: Partial<Order>) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, ...updatedOrder }),
      });

      if (!response.ok) {
        throw new Error('Failed to update order');
      }

      toast.success('Pesanan berhasil diperbarui');
      await fetchOrders();
    } catch (error) {
      console.error('Error updating order:', error);
      toast.error('Gagal memperbarui pesanan');
    }
  };

  const deleteOrder = async (orderId: number) => {
    try {
      const response = await fetch('/api/orders', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete order');
      }

      toast.success('Pesanan berhasil dihapus');
      setActiveOrders((orders) => orders.filter((order) => order.id !== orderId));
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Gagal menghapus pesanan');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return {
    activeOrders,
    completedOrders,
    isLoading,
    error,
    fetchOrders,
    createOrder,
    updateOrder,
    deleteOrder,
  };
};

// Versi bagus

import { useState } from 'react';
import { toast } from 'sonner';
import { Order } from '@/app/types/order';

export function useOrders() {
  const [activeOrders, setActiveOrders] = useState<Order[]>([]);
  const [completedOrders, setCompletedOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch('/api/orders');
      if (!response.ok) throw new Error('Failed to fetch orders');

      const data = await response.json();
      setActiveOrders(data.filter((order: Order) => order.status === 'active'));
      setCompletedOrders(data.filter((order: Order) => order.status === 'completed'));
    } catch (error) {
      console.error('Error fetching orders:', error);
      setError('Gagal memuat data pesanan');
      toast.error('Gagal memuat data pesanan');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderOperation = async (url: string, method: string, body: object, successMessage: string, onSuccess?: () => void) => {
    try {
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error(successMessage);

      toast.success(successMessage);
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error(`Error: ${successMessage.toLowerCase()}`, error);
      toast.error(`Gagal ${successMessage.toLowerCase()}`);
    }
  };

  const handleNewOrder = async (order: Order) => {
    await handleOrderOperation('/api/orders', 'POST', order, 'Pesanan berhasil dibuat', fetchOrders);
  };

  const handleUpdateOrder = async (orderId: number, updatedOrder: object) => {
    await handleOrderOperation('/api/orders', 'PUT', { orderId, ...updatedOrder }, 'Pesanan berhasil diperbarui', fetchOrders);
  };

  const handleDeleteOrder = async (orderId: number) => {
    await handleOrderOperation('/api/orders', 'DELETE', { orderId }, 'Pesanan berhasil dihapus', fetchOrders);
  };

  const handleUpdateStatus = async (orderId: number, componentId: number, status: string) => {
    await handleOrderOperation('/api/components', 'PUT', { orderId, componentId, status }, 'Status berhasil diupdate', fetchOrders);
  };

  const handleComplete = async (orderId: number) => {
    await handleOrderOperation('/api/orders', 'PUT', { orderId, status: 'completed' }, 'Pesanan berhasil diselesaikan', fetchOrders);
  };

  return {
    activeOrders,
    completedOrders,
    isLoading,
    error,
    fetchOrders,
    handleNewOrder,
    handleUpdateOrder,
    handleDeleteOrder,
    handleUpdateStatus,
    handleComplete,
  };
}
