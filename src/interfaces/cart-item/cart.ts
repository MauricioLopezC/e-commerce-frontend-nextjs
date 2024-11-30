import { Product, ProductSku } from "../products/product";

export interface Cart {
  id: number;
  userId: number;
  updatedAt: Date;
  cartItems: CartItem[]
}

export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  productSkuId: number;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;
  product: Product;
  productSku: ProductSku;
}
