import { Category } from "@/interfaces/products/categories";
import { ErrorResponse } from "@/interfaces/responses";
import { BACKEND_URL } from "@/queries/constants";

interface AllCateogiresResponse {
  categories?: Category[]
  error?: ErrorResponse

}

export async function getAllCategories(): Promise<AllCateogiresResponse> {
  const res = await fetch(`${BACKEND_URL}/categories`, {
    method: 'GET',
  })
  if (res.ok) {
    const categories = await res.json()
    return { categories }
  }
  const error: ErrorResponse = await res.json()
  return { error }

}
