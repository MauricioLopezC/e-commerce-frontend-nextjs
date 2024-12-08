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

interface FormSchema {
  category: string;
  name: string;
  sex: string;
  price: number;
  description: string;
  variations: {
    size: string;
    color: string;
    stock: number;
    image: File;
  }[];
}

interface CreateProductDto {
  category: string;
  name: string;
  sex: string;
  price: number;
  description: string;
}

interface CreateProductSkuDto {
  size: string;
  color: string;
  quantity: number;
}

export async function createProduct(createProductDto: CreateProductDto) {
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

export async function createProductSku(createProductSkuDto: CreateProductSkuDto, productId: number) {
  const token = cookies().get('access-token')?.value
  const res = await fetch(`${BACKEND_URL}/products/${productId}/product-skus`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify(createProductSkuDto)
  })
  if (res.ok) {
    const data = await res.json()
    return {
      createdProductSku: data
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

export async function createProductAndVariations(values: FormSchema) {
  const { variations, ...rest } = values
  const token = cookies().get('access-token')?.value

  const res = await fetch(`${BACKEND_URL}/products`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify(rest),
  })
  revalidateTag('products')

  if (!res.ok) return {
    statusCode: 500,
    message: "Server error"
  }

  const product = await res.json()

  for (const variation of variations) {
    const variationRes = await fetch(`${BACKEND_URL}/products/${product.id}/product-skus`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
        Cookie: `access-token=${token}`
      },
      body: JSON.stringify({
        size: variation.size,
        color: variation.color,
        quantity: variation.stock
      })
    })
    if (!variationRes.ok) return {
      statusCode: 500,
      message: "Server error"
    }
    const createdVariation = await res.json()

    const imageData = new FormData()
    imageData.append('file', variation.image)
    imageData.append('productId', product.id.toString())
    imageData.append('productSkuId', createdVariation.id.toString())

    const imageResponse = await fetch(`${BACKEND_URL}/images`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Cookie: `access-token=${token}`
      },
      body: imageData,
    })
    if (!imageResponse.ok) return {
      statusCode: 500,
      message: "Server error"
    }
  }
  return {
    statusCode: 201,
    message: "product created successfully",
    product
  }
}


interface ProductResponse {
  product?: Product;
  error?: any;
}

export async function updateProduct(id: number, formdata: FormData): Promise<ProductResponse> {
  const token = cookies().get('access-token')?.value ?? ''

  const name = formdata.get('name')
  const price = Number(formdata.get('price'))
  const description = formdata.get('description')
  const category = formdata.get('category')
  const sex = formdata.get('sex')

  const res = await fetch(`${BACKEND_URL}/products/${id}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify({
      name,
      price,
      description,
      category,
      sex
    })
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

