import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        components: true,
      },
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Error fetching orders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const order = await prisma.order.create({
      data: {
        customerName: body.customerName,
        orderDate: new Date(body.orderDate),
        deadline: new Date(body.deadline),
        productName: body.productName,
        quantity: parseInt(body.quantity),
        totalPrice: body.totalPrice,
        components: {
          create: body.components.map(
            (component: { name: string; price: string; quantity: string }) => ({
              name: component.name,
              price: component.price,
              quantity: parseInt(component.quantity),
            })
          ),
        },
      },
      include: {
        components: true,
      },
    });

    return NextResponse.json(order);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    // Ambil orderId dari request body
    const { orderId } = await request.json();

    // Hapus komponen-komponen terkait terlebih dahulu
    await prisma.component.deleteMany({
      where: {
        orderId: orderId,
      },
    });

    // Sekarang hapus order
    const deletedOrder = await prisma.order.delete({
      where: {
        id: orderId,
      },
    });

    if (!deletedOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Kembalikan respons sukses jika penghapusan berhasil
    return NextResponse.json({
      message: "Order and associated components deleted successfully",
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Error deleting order" },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  const body = await request.json();

  if (body.status === "completed") {
    const order = await prisma.order.update({
      where: { id: body.orderId },
      data: {
        status: "completed", // update status order
        completedAt: new Date(), // set completedAt
        components: {
          updateMany: {
            where: { orderId: body.orderId },
            data: { status: "completed" }, // set semua komponen jadi 'completed'
          },
        },
      },
      include: {
        components: true,
      },
    });
    return NextResponse.json(order);
  }

  try {
    // Update order menggunakan Prisma
    const order = await prisma.order.update({
      where: { id: body.orderId },
      data: {
        customerName: body.customerName,
        orderDate: new Date(body.orderDate),
        deadline: new Date(body.deadline),
        productName: body.productName,
      },
    });

    // Cek jika order berhasil diupdate
    if (!order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 } // 404 jika order tidak ditemukan
      );
    }

    // Mengembalikan hasil sukses dengan status 200
    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);

    // Menangani kesalahan jika terjadi exception di Prisma atau di kode lain
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Menangani kesalahan yang sudah diketahui, misalnya jika id order tidak valid
      return NextResponse.json(
        { error: "Invalid order ID" },
        { status: 400 } // 400 untuk bad request jika ada kesalahan pada ID atau data
      );
    } else {
      // Menangani kesalahan yang tidak diketahui (misalnya masalah server)
      return NextResponse.json(
        { error: "Error updating order" },
        { status: 500 } // 500 untuk kesalahan server
      );
    }
  }
}
