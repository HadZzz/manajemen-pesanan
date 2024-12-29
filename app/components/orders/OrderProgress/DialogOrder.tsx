import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Order {
  id: number;
  customerName: string;
  productName: string;
  orderDate: string;
  deadline: string;
}

interface DialogUpdateProductProps {
  order: Order | null;
  onUpdateOrder: (orderId: number, updateOrder) => void
}

export function DialogUpdateProduct({ order, onUpdateOrder }: DialogUpdateProductProps) {
  const [formData, setFormData] = useState({
    customerName: "",
    productName: "",
    orderDate: "",
    deadline: "",
  });

    // Helper untuk format tanggal
  const formatDate = (dateString: string) => {
    if (!dateString) return ""; // Cek jika string kosong
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      console.warn("Invalid date format:", dateString);
      return ""; // Jika tidak valid, kembalikan string kosong
    }
    return date.toISOString().split("T")[0]; // Format ke YYYY-MM-DD
  };
  
  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName || "",
        productName: order.productName || "",
        orderDate: formatDate(order.orderDate),
        deadline: formatDate(order.deadline),
      });
    }
  }, [order]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    await onUpdateOrder(order.id, formData)
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
         <Button variant="outline" className="border bg-orange-500 rounded-md px-4 py-2 text-sm font-medium shadow-sm hover:bg-orange-400 hover:text-white text-white">Edit</Button>
      </DialogTrigger>
      <DialogContent className="w-full max-w-lg mx-auto rounded-md">
        <DialogHeader>
          <DialogTitle>Edit Order</DialogTitle>
        </DialogHeader>
        {order && (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="customerName">Customer Name</Label>
                <Input
                  id="customerName"
                  name="customerName"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input
                  id="productName"
                  name="productName"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderDate">Order Date</Label>
                <Input
                  id="orderDate"
                  name="orderDate"
                  type="date"
                  value={formData.orderDate}
                  onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="deadline">Deadline</Label>
                <Input
                  id="deadline"
                  name="deadline"
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </div>
            </div>
             <DialogFooter>
              <Button type="submit">Simpan</Button>
            </DialogFooter>  
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
