'use server'
import { Product } from "@/interfaces/products/product"
import { BACKEND_URL } from "@/queries/constants"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

interface GetProductsOptions {
  limit?: number;
  page?: number;
  category?: string;
  name?: string;
  sex?: string;
  orderBy?: string;
}

interface ProductsData {
  products: Product[];
  metadata: { _count: number };
}

interface AllProductsResponse {
  productsData?: ProductsData;
  error?: any;
}

interface OneProductResponse {
  product?: Product;
  error?: any;
}

interface CreateProductDto {
  name: string;
  sex: string;
  price: number;
  description: string;
  categories: number[];
}

interface UpdateProductDto {
  name: string;
  sex: string;
  price: number;
  description: string;
}

export async function getAllProducts(options: GetProductsOptions): Promise<AllProductsResponse> {
  const queryParams = new URLSearchParams()
  let key: keyof GetProductsOptions
  for (key in options) {
    const value = options[key]
    if (value) {
      queryParams.set(key, value.toString())
    }
  }

  const res = await fetch(`${BACKEND_URL}/products?${queryParams.toString()}`, {
    method: 'GET',
    next: {
      tags: ['products']
    }
  })

  if (res.ok) {
    const productsData = await res.json()
    return {
      productsData
    }
  }

  const error = await res.json()
  return {
    error
  }
}

export async function getProduct(productId: number): Promise<OneProductResponse> {
  const res = await fetch(`${BACKEND_URL}/products/${productId}`, {
    method: 'GET',
    next: {
      tags: ['product']
    }
  })
  if (res.ok) {
    const product = await res.json()
    return {
      product
    }
  }

  const error = await res.json()
  return {
    error
  }
}

export async function createProduct(createProductDto: CreateProductDto): Promise<OneProductResponse> {
  const token = cookies().get('access-token')?.value

  const res = await fetch(`${BACKEND_URL}/products`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify(createProductDto),
  })
  revalidateTag('products')
  if (res.ok) {
    const product = await res.json()
    return {
      product
    }
  }

  const error = await res.json()
  return {
    error
  }
}

export async function updateProduct(
  productId: number,
  data: UpdateProductDto
): Promise<OneProductResponse> {
  const token = cookies().get('access-token')?.value ?? ''
  const res = await fetch(`${BACKEND_URL}/products/${productId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify(data)
  })

  revalidateTag('product')
  revalidateTag('products')
  if (res.ok) {
    const product = await res.json()
    return {
      product
    }
  }

  const error = await res.json()
  return {
    error
  }

}

export async function deleteProduct(id: number): Promise<OneProductResponse> {
  const token = cookies().get('access-token')?.value ?? ''

  const res = await fetch(`${BACKEND_URL}/products/${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    },
  })

  if (res.ok) {
    revalidateTag('products')
    const product = await res.json()
    return {
      product
    }
  }

  const error = await res.json()
  return {
    error
  }
}

export async function replaceProductCategories(productId: number, categoryIds: number[]): Promise<OneProductResponse> {
  const token = cookies().get('access-token')?.value ?? ''
  const res = await fetch(`${BACKEND_URL}/products/${productId}/categories`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify({ categoryIds })
  })
  revalidateTag('product')
  revalidateTag('products')
  if (res.ok) {
    const product = await res.json()
    return {
      product
    }
  }

  const error = await res.json()
  return {
    error
  }
}

