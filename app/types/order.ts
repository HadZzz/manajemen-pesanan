export interface Component {
  progress: string | number | readonly string[] | undefined;
  id: number;
  name: string;
  price: string;
  quantity: string;
}

export interface Order {
  id: number;
  customerName: string;
  orderDate: string;
  deadline: string;
  productName: string;
  quantity: string;
  totalPrice: string;
  components: Component[];
  status: 'active' | 'completed';
  progress: Record<number, number>;
  completedAt?: string;
} 