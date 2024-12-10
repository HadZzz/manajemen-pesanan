'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { Order } from '@/app/types/order'; // Removed Component import since it's not used

interface OrderFormProps {
  onSubmit: (order: Order) => void;
}

export const OrderForm = ({ onSubmit }: OrderFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerName: '',
    orderDate: '',
    deadline: '',
    productName: '',
    quantity: '',
    totalPrice: '',
    components: [] as {
      name: string;
      price: string;
      quantity: string;
    }[]
  });

  const addComponent = () => {
    setFormData({
      ...formData,
      components: [
        ...formData.components,
        {
          name: '',
          price: '',
          quantity: ''
        }
      ]
    });
  };

  const removeComponent = (index: number) => {
    const newComponents = [...formData.components];
    newComponents.splice(index, 1);
    setFormData({
      ...formData,
      components: newComponents
    });
  };

  const updateComponent = (index: number, field: string, value: string) => {
    const newComponents = [...formData.components];
    newComponents[index] = {
      ...newComponents[index],
      [field]: value
    };
    setFormData({
      ...formData,
      components: newComponents
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const newOrder = await response.json();
      onSubmit(newOrder);

      // Reset form
      setFormData({
        customerName: '',
        orderDate: '',
        deadline: '',
        productName: '',
        quantity: '',
        totalPrice: '',
        components: []
      });
    } catch (error) {
      console.error('Error creating order:', error);
      alert('Failed to create order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Form Pesanan Baru</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Nama Pelanggan</Label>
              <Input 
                value={formData.customerName}
                onChange={(e) => setFormData({...formData, customerName: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Nama Produk</Label>
              <Input 
                value={formData.productName}
                onChange={(e) => setFormData({...formData, productName: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Jumlah Pesanan</Label>
              <Input 
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Total Harga</Label>
              <Input 
                type="number"
                value={formData.totalPrice}
                onChange={(e) => setFormData({...formData, totalPrice: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Tanggal Pesanan</Label>
              <Input 
                type="date"
                value={formData.orderDate}
                onChange={(e) => setFormData({...formData, orderDate: e.target.value})}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Deadline</Label>
              <Input 
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                required
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Komponen Produk</h3>
              <Button type="button" onClick={addComponent} variant="outline" size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Tambah Komponen
              </Button>
            </div>
            
            {formData.components.map((component, index) => (
              <Card key={index} className="p-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Nama Komponen</Label>
                    <Input 
                      value={component.name}
                      onChange={(e) => updateComponent(index, 'name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Harga</Label>
                    <Input 
                      type="number"
                      value={component.price}
                      onChange={(e) => updateComponent(index, 'price', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Jumlah</Label>
                    <div className="flex gap-2">
                      <Input 
                        type="number"
                        value={component.quantity}
                        onChange={(e) => updateComponent(index, 'quantity', e.target.value)}
                        required
                      />
                      <Button 
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeComponent(index)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : 'Tambah Pesanan'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};