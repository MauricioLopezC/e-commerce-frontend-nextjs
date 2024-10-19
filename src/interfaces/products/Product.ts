import { Image } from "./image";

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  category: string;
  sex: string;
  images: Image[];
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
