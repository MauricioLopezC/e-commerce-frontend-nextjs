import { Product, ProductSku } from '@/interfaces/products/product'
import { User } from './users';

export interface Order {
  id: number;
  userId: number;
  status: string;
  total: number;
  finalTotal: number;
  createdAt: Date;
  updatedAt: Date;

  orderItems?: OrderItem[];
  payment?: Payment;
  Shipping?: Shipping;
  user?: User;
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
  adress: string;
  createdAt: Date;
  updatedAt: Date;
}
