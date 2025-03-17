'use server'
import { Category } from "@/interfaces/products/categories";
import { ErrorResponse } from "@/interfaces/responses";
import { BACKEND_URL } from "@/queries/constants";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

interface AllCategoriesResponse {
  categories?: Category[]
  error?: ErrorResponse
}

interface OneCategoryResponse {
  category?: Category
  error?: ErrorResponse
}

export async function getAllCategories(): Promise<AllCategoriesResponse> {
  const res = await fetch(`${BACKEND_URL}/categories`, {
    method: 'GET',
    next: {
      tags: ['categories']
    }
  })
  if (res.ok) {
    const categories = await res.json()
    return { categories }
  }
  const error = await res.json()
  return { error }

}

interface CreateCategoryDto {
  name: string,
  description: string
}

export async function createCategory(data: CreateCategoryDto): Promise<OneCategoryResponse> {
  const token = cookies().get('access-token')?.value
  const res = await fetch(`${BACKEND_URL}/categories`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify(data)
  })
  revalidateTag('categories')
  if (res.ok) {
    const category = await res.json()
    return { category }
  }
  const error = await res.json()
  return { error }
}

