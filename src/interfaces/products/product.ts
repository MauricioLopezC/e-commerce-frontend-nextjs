import { Category } from "./categories";
import { Image } from "./image";


export enum Sex {
  MALE = "MALE",
  FEMALE = "FEMALE",
  UNISEX = 'UNISEX'
}

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  sex: string;
  unitsOnOrder: number;
  totalCollected: number;
  images: Image[];
  createdAt: Date;
  updatedAt: Date;
  productSkus?: ProductSku[];
  categories: Category[];
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
