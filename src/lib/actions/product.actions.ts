'use server'
import { Product } from "@/interfaces/products/product"
import { BACKEND_URL } from "@/queries/constants"
import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"

export interface BadRequestResponse {
  message: string;
  error: string;
  statusCode: number
}

interface GetProductsOptions {
  limit?: number;
  page?: number;
  category?: string;
  name?: string;
  sex?: string;
  //orderBy: string;
}

interface ProductsData {
  products: Product[];
  aggregate: { _count: number };
}

interface ProductsResponse {
  productsData?: ProductsData;
  error?: any;
}

export async function getAllProducts(options: GetProductsOptions): Promise<ProductsResponse> {
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

export async function getProduct(productId: number): Promise<ProductResponse> {
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


interface CreateOrUpdateProductDto {
  category: string;
  name: string;
  sex: string;
  price: number;
  description: string;
}


export async function createProduct(createProductDto: CreateOrUpdateProductDto) {
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
    const data = await res.json()
    return {
      createdProduct: data
    }
  }

  const error = await res.json()
  return {
    error
  }
}


export async function uploadImage(formData: FormData) {
  //TODO: validate that formData has productId productSkuId and file properties
  const token = cookies().get('access-token')?.value
  const res = await fetch(`${BACKEND_URL}/images`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    },
    body: formData,
  })
  if (res.ok) {
    const createdImage = await res.text()
    return {
      createdImage
    }
  }
  const error = res.json()
  return {
    error
  }
}

interface ProductResponse {
  product?: Product;
  error?: any;
}


export async function updateProduct(
  productId: number,
  data: CreateOrUpdateProductDto
): Promise<ProductResponse> {
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

interface DeleteProductResponse {
  product?: Product;
  error?: any;
}

export async function deleteProduct(id: number): Promise<DeleteProductResponse> {
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
    const data = await res.json()
    return {
      product: data
    }
  }

  const error = await res.json()
  return {
    error
  }
}

