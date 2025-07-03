import { Product, ProductSku } from "@/interfaces/products/product";
import { BACKEND_URL } from "./constants"
//TODO: move this operations to cart.actions.ts

/**
 *
 */

export interface CartItemInterface {
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

