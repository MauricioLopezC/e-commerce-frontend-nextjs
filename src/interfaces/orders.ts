import { Product, ProductSku } from '@/interfaces/products/product'
import { User } from './users';
import { Discount } from './discounts';

export interface Order {
  id: number;
  userId: number;
  status: string;
  total: number;
  discountAmount: number;
  finalTotal: number;
  createdAt: Date;
  updatedAt: Date;

  orderItems?: OrderItem[];
  payment?: Payment;
  shipping?: Shipping;
  user?: User;
  discounts?: DiscountsData[];
}

interface DiscountsData {
  discountId: number
  orderId: number
  appliedTimes: number
  discountAmount: number
  assignedAt: Date
  discount: Discount
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  productSkuId: number;
  quantity: number;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  product?: Product;
  productSku?: ProductSku;
}

export interface Payment {
  id: number;
  orderId: number;
  provider: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Shipping {
  id: number;
  orderId: number;
  country: string;
  city: string;
  postalCode: string;
  address: string;
  createdAt: Date;
  updatedAt: Date;
}
