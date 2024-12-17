'use client';
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, DollarSign } from "lucide-react";
import { Order } from '@/app/types/order';
import { generatePDF } from '@/lib/pdf';

interface OrderHistoryProps {
  orders: Order[];
}

export const OrderHistory = ({ orders }: OrderHistoryProps) => {
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-1 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-blue-900">{order.customerName}</h3>
                  <p className="text-blue-600">{order.productName}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
                  <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-md">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    <div className="text-sm">
                      <p className="text-gray-600">Total Harga</p>
                      <p className="font-medium text-lg">Rp {parseInt(order.totalPrice).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div className="text-sm">
                      <p className="text-gray-600">Selesai</p>
                      <p className="font-medium">
                        {order.completedAt ? new Date(order.completedAt).toLocaleDateString('id-ID', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        }) : '-'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Detail Komponen:</h4>
                  <div className="space-y-2">
                    {order.components.map((component, index) => (
                      <div key={index} className="text-sm flex justify-between items-center">
                        <span>{component.name}</span>
                        <span className="text-gray-600">
                          {component.quantity} unit × Rp {parseInt(component.price).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="text-sm">
                    <p className="text-gray-600">Status</p>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium mt-1">
                      Selesai
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => generatePDF(order)}
                    className="flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export PDF
                  </Button>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Informasi Pesanan:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tanggal Pesan:</span>
                      <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Deadline:</span>
                      <span>{new Date(order.deadline).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Jumlah:</span>
                      <span>{order.quantity} unit</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {orders.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">Belum ada pesanan yang selesai</p>
        </Card>
      )}
    </div>
  );
};