import { Order } from "../orders";
import { Image } from "./image";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  sex: string;
  unitsOnOrder: number;
  totalCollected: number;
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
  productSkus?: ProductSku[]
}

export interface ProductSku {
  id: number;
  productId: number;
  size: string;
  color: string;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  images?: Image[];
}

export interface CreateProductSKuDto {
  size: string;
  color: string;
  quantity: number;
}
