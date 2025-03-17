'use server'

import { Product } from "@/interfaces/products/product"
import { BACKEND_URL } from "@/queries/constants"

interface SearchResponse {
  products?: Product[];
  error?: any;
}
export async function searchByName(productName: string): Promise<SearchResponse> {
  const res = await fetch(`${BACKEND_URL}/search/products?productName=${productName}`, {
    method: 'GET'
  })

  if (res.ok) {
    const data = await res.json()
    return {
      products: data
    }
  }
  const error = await res.json()
  return {
    error
  }
}

