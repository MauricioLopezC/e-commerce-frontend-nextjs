import { Product, ProductSku } from "@/interfaces/products/product"
import { BACKEND_URL } from "./constants"

export async function getProducts(
  limit: number = 10,
  page: number = 1,
  sex?: string
): Promise<Product[]> {

  const queryParams = new URLSearchParams({ limit: limit.toString(), page: page.toString() })
  if (sex) {
    queryParams.set('sex', sex)
  }

  const res = await fetch(`${BACKEND_URL}/products?${queryParams.toString()}`, {
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
