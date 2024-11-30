import { Product } from "./products/product";

export interface Favorite {
  id: number;
  productId: number;
  userId: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
}
