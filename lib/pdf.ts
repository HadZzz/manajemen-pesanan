import jsPDF from 'jspdf';
import { Order } from '@/app/types/order';

export const generatePDF = (order: Order) => {
  const pdf = new jsPDF();
  const margin = 20;
  let y = margin;
  
  // Add title
  pdf.setFontSize(16);
  pdf.text('Detail Pesanan', margin, y);
  y += 10;

  // Add order details
  pdf.setFontSize(12);
  pdf.text(`Nama Pelanggan: ${order.customerName}`, margin, y += 10);
  pdf.text(`Nama Produk: ${order.productName}`, margin, y += 10);
  pdf.text(`Jumlah: ${order.quantity}`, margin, y += 10);
  pdf.text(`Total Harga: Rp ${parseInt(order.totalPrice).toLocaleString()}`, margin, y += 10);
  pdf.text(`Tanggal Pesanan: ${new Date(order.orderDate).toLocaleDateString()}`, margin, y += 10);
  pdf.text(`Deadline: ${new Date(order.deadline).toLocaleDateString()}`, margin, y += 10);
  
  if (order.completedAt) {
    pdf.text(`Tanggal Selesai: ${new Date(order.completedAt).toLocaleDateString()}`, margin, y += 10);
  }

  // Add components table
  y += 10;
  pdf.text('Komponen Produk:', margin, y);
  y += 10;

  // Table headers
  pdf.text('Nama Komponen', margin, y);
  pdf.text('Jumlah', 100, y);
  pdf.text('Harga', 140, y);
  y += 5;
  
  pdf.line(margin, y, 190, y);
  y += 5;

  // Table content
  order.components.forEach(component => {
    pdf.text(component.name, margin, y);
    pdf.text(component.quantity, 100, y);
    pdf.text(`Rp ${parseInt(component.price).toLocaleString()}`, 140, y);
    y += 10;
  });

  // Save the PDF
  pdf.save(`Pesanan-${order.customerName}-${order.id}.pdf`);
}; 