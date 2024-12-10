import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        components: true
      }
    });
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error fetching orders' },
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
          create: body.components.map((component: {
            name: string;
            price: string;
            quantity: string;
          }) => ({
            name: component.name,
            price: component.price,
            quantity: parseInt(component.quantity),
            progress: 0
          }))
        }
      },
      include: {
        components: true
      }
    });
    
    return NextResponse.json(order);
  } catch (error) {
    console.error('Database Error:', error);
    return NextResponse.json(
      { error: 'Error creating order' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    
    if (body.status === 'completed') {
      const order = await prisma.order.update({
        where: { id: body.orderId },
        data: {
          status: 'completed',
          completedAt: new Date()
        },
        include: {
          components: true
        }
      });
      return NextResponse.json(order);
    }

    if (body.componentId && typeof body.progress === 'number') {
      const component = await prisma.component.update({
        where: { id: body.componentId },
        data: { progress: body.progress }
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