import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, DollarSign } from "lucide-react";
import { Order, Component } from "@/app/types/order";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogUpdateProduct } from "./OrderProgress/DialogOrder";
import { DialogDeleteOrder } from "./OrderProgress/DialogDeleteOrder";

interface OrderProgressProps {
  orders: Order[];
  onUpdateStatus: (orderId: number, componentId: number, status: string) => void;
  onUpdateDescription: (orderId: number, componentId: number, description: string) => void;
  onComplete: (orderId: number) => void;
  onDeleteOrder: (orderId: number) => void;
  onUpdateOrder: (orderId: number, updatedOrder) => void;
}

const calculateStatus = (components: Component[]): string => {
  if (!components || components.length === 0) return "Belum Dimulai";

  const allStatuses = components.map((comp) => comp.status);
  if (allStatuses.every((status) => status === "completed")) return "Siap Diselesaikan";
  if (allStatuses.some((status) => status === "semi-finished" || status === "raw")) return "Dalam Proses";
  return "Belum Dimulai";
};

const isOrderComplete = (components: Component[]): boolean => {
  return components.every((comp) => comp.status === "completed");
};

export const OrderProgress = ({
  orders,
  onUpdateStatus,
  onUpdateDescription,
  onComplete,
  onDeleteOrder,
  onUpdateOrder,
}: OrderProgressProps) => {
  const [descriptions, setDescriptions] = useState<Record<number, string>>({});
  const [loadingStates, setLoadingStates] = useState<Record<number, boolean>>({});
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  const handleDescriptionChange = (componentId: number, value: string) => {
    setDescriptions((prev) => ({
      ...prev,
      [componentId]: value,
    }));
  };

  const handleUpdateDescription = async (orderId: number, componentId: number) => {
    const description = descriptions[componentId] || "";
    setLoadingStates((prev) => ({ ...prev, [componentId]: true }));

    try {
      await onUpdateDescription(orderId, componentId, description);
      toast.success("Deskripsi berhasil diperbarui");
    } catch (error) {
      console.error("Error updating description:", error);
      toast.error("Gagal memperbarui deskripsi. Coba lagi.");
    } finally {
      setLoadingStates((prev) => ({ ...prev, [componentId]: false }));
    }
  };

  const handleDeleteOrder = (orderId: number) => {
    onDeleteOrder(orderId);
    setIsDeleteDialogOpen(false); // Close dialog after delete
  };

  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <Card key={order.id} className="w-full overflow-hidden">
          <CardHeader className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 p-6">
            <div className="flex flex-wrap justify-between items-start mb-4 gap-4">
              <div>
                <CardTitle className="text-2xl text-blue-900">{order.customerName}</CardTitle>
                <p className="text-blue-600 font-medium">{order.productName}</p>
              </div>
              <div className="flex flex-wrap items-end mb-4 gap-2">
                <DialogUpdateProduct order={order} onUpdateOrder={onUpdateOrder} />
                <Dialog className="flex flex-wrap items-center justify-center bg-red-500" open={isDeleteDialogOpen} onOpenChange={(open) => setIsDeleteDialogOpen(open)}>
                  <DialogTrigger asChild>
                    <Button
                      onClick={() => {
                        setSelectedOrderId(order.id);
                        setIsDeleteDialogOpen(true);
                      }}
                      className="mt-2 border bg-red-500 rounded-md px-4 py-2 text-sm font-medium shadow-sm hover:bg-red-400 hover:text-white"
                    >
                      Hapus
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-md">
                    <DialogHeader>
                      <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
                    </DialogHeader>
                    <p>Apakah Anda yakin ingin menghapus pesanan ini?</p>
                    <div className="flex justify-between mt-4">
                      <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                        Batal
                      </Button>
                      <Button
                        variant="default"
                        className="bg-red-500 text-white"
                        onClick={() => {
                          if (selectedOrderId !== null) {
                            handleDeleteOrder(selectedOrderId);
                          }
                        }}
                      >
                        Hapus
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    isOrderComplete(order.components)
                      ? "bg-green-100 text-green-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {calculateStatus(order.components)}
                </span>
                {isOrderComplete(order.components) && (
                  <Button
                    onClick={() => onComplete(order.id)}
                    className="mt-2"
                    variant="default"
                  >
                    Selesaikan Pesanan
                  </Button>
                )}
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">Total: Rp {parseInt(order.totalPrice).toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Total Order: {parseInt(order.quantity).toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <span className="font-medium">{new Date(order.deadline).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-6">
              {order.components.map((component) => (
                <div key={component.id} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex flex-wrap justify-between items-center mb-4 gap-4">
                    <div>
                      <h4 className="font-medium">{component.name}</h4>
                      <p className="text-sm text-gray-600">
                        {component.quantity} unit - Rp {parseInt(component.price).toLocaleString()}/unit
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={component.status || "raw"}
                        onChange={(e) => onUpdateStatus(order.id, component.id, e.target.value)}
                        className="bg-white border border-gray-300 rounded-lg px-2 py-2 text-gray-700 focus:outline-none focus:border-blue-500 cursor-pointer relative"
                      >
                        <option value="raw">Mentah</option>
                        <option value="semi-finished">Setengah Jadi</option>
                        <option value="completed">Jadi</option>
                      </select>
                    </div>
                  </div>
                  <textarea
                    className="w-full bg-white border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 ease-in-out"
                    placeholder="Deskripsi status"
                    value={descriptions[component.id] || component.description || ""}
                    onChange={(e) => handleDescriptionChange(component.id, e.target.value)}
                  ></textarea>
                  <Button
                    onClick={() => handleUpdateDescription(order.id, component.id)}
                    className="mt-2 border bg-orange-500 rounded-md px-4 py-2 text-sm font-medium shadow-sm hover:bg-orange-400 hover:text-white"
                    disabled={loadingStates[component.id]}
                  >
                    {loadingStates[component.id] ? "Loading..." : "Update Deskripsi"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {orders.length === 0 && (
        <Card className="p-8 text-center">
          <p className="text-gray-500">Belum ada progress yang selesai</p>
        </Card>
      )}
    </div>
  );
};
