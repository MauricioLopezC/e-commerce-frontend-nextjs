import { Product, ProductSku } from "@/interfaces/products/Product"
import { BACKEND_URL } from "./constants"

export async function getProducts(
  limit: number = 10,
  page: number = 1
): Promise<Product[]> {
  const res = await fetch(`${BACKEND_URL}/products?limit=${limit}&page=${page}`, {
    method: 'GET'
  })
  return res.json()
}

export async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`${BACKEND_URL}/products/${id}`, {
    method: 'GET',
  })
  return res.json()
}

export async function getProductSkus(id: number): Promise<ProductSku[]> {
  const res = await fetch(`${BACKEND_URL}/products/${id}/product-skus`, {
    method: 'GET',
  })
  return res.json()
}
