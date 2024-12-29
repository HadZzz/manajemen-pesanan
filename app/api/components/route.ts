import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(request: Request) {
  try {
    // Ambil orderId dari request body
    const { componentId } = await request.json();

    // Hapus komponen-komponen terkait terlebih dahulu
   const deletedComponent = await prisma.component.deleteMany({
      where: {
        id: componentId,
      },
    });

    if (!deletedComponent) {
      return NextResponse.json(
        { error: 'Order not found' },
        { status: 404 }
      );
    }

    // Kembalikan respons sukses jika penghapusan berhasil
    return NextResponse.json({
      message: 'Order and associated components deleted successfully',
    });
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error deleting order' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();

    console.log(body)

      if (body.status === 'completed') {
      const order = await prisma.order.update({
        where: { id: body.orderId },
        data: {
          status: 'completed',  // update status order
          completedAt: new Date(), // set completedAt
          components: {
            updateMany: {
              where: { orderId: body.orderId },
              data: { status: 'completed' }  // set semua komponen jadi 'completed'
            }
          }
        },
        include: {
          components: true
        }
      });
      return NextResponse.json(order);
    }

     if (body.status) {
      const order = await prisma.order.update({
        where: { id: body.orderId },
        data: {
          status: body.status,  // update status order
          completedAt: new Date(), // set completedAt
          components: {
            updateMany: {
              where: { orderId: body.orderId },
              data: { status: body.status }  // set semua komponen jadi 'completed'
            }
          }
        },
        include: {
          components: true
        }
      });
      return NextResponse.json(order);
    }

      // Jika ada perubahan status komponen
    if (body.componentId && body.status) {
      // Validasi status komponen
      const validStatuses = ['raw', 'semi-finished', 'completed'];
      if (!validStatuses.includes(body.status)) {
        return NextResponse.json(
          { error: 'Invalid status' },
          { status: 400 }
        );
      }

      // Update status komponen
      const component = await prisma.component.update({
        where: { id: body.componentId },
        data: { status: body.status }
      });

      if (!component) {
        return NextResponse.json(
          { error: 'Component not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(component);
    }

    // Jika ada perubahan status komponen
    if (body.componentId && body.description) {
      console.log("oin")
      // Update status komponen
      const component = await prisma.component.update({
        where: { id: body.componentId },
        data: { 
          description: body.description
        }
      });

      return NextResponse.json(component);
    }

    return NextResponse.json(
      { error: 'Invalid update request' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error updating order' },
      { status: 500 }
    );
  }
}
