'use server'
import { Product, ProductSku } from "@/interfaces/products/product"
import { BACKEND_URL } from "@/queries/constants"
import { revalidatePath, revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { type } from "os"
import { z } from 'zod'

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


export async function createProductV2(formData: FormData): Promise<Product | BadRequestResponse> {
  const ProductData = {
    name: formData.get('name'),
    price: Number(formData.get('price')),
    description: formData.get('description'),
    category: formData.get('category'),
    sex: formData.get('sex'),
  }

  const token = cookies().get('access-token')?.value

  const res = await fetch(`${BACKEND_URL}/products`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify(ProductData),
  })

  revalidateTag('products')
  const data = res.json()
  return data
}

export async function createProductSkus(formData: FormData, createdProduct: Product) {
  //TODO: file input validation with zod, file size < 10MB
  try {
    const token = cookies().get('access-token')?.value ?? ''

    formData.delete('name')
    formData.delete('price')
    formData.delete('description')
    formData.delete('category')
    formData.delete('sex')

    const productSkusData: Array<Map<string, any>> = []

    let createdProductSkus: ProductSku[] = []
    let createdImgs: string[] = []
    let test: string[] = []

    formData.forEach((value, key) => {

      if (key.startsWith('$')) return

      const [name, index] = key.split('-')
      if (productSkusData[Number(index)]) { //existe el objecto en el array
        productSkusData[Number(index)].set(name, value)
      } else {
        productSkusData[Number(index)] = new Map([[name, value]])
      }
    })

    await Promise.all(productSkusData.map(async (map) => {
      const data = Object.fromEntries(map)
      const productId = createdProduct.id

      const res = await fetch(`${BACKEND_URL}/products/${productId}/product-skus`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json",
          Cookie: `access-token=${token}`
        },
        body: JSON.stringify({
          size: data.size,
          color: data.color,
          quantity: data.stock
        })
      })
      if (!res.ok) {
        throw new Error("Error al crear el productSku", { cause: await res.json() })
      }

      const productSku: ProductSku = await res.json()
      createdProductSkus.push(productSku)
      test.push('XD')

      const imgData = new FormData()
      imgData.append('file', data.images)
      imgData.append('productId', productId.toString())
      imgData.append('productSkuId', productSku.id.toString())

      const imageResponse = await fetch(`${BACKEND_URL}/images`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Cookie: `access-token=${token}`
        },
        body: imgData,

      })
      if (!imageResponse.ok) {
        throw new Error(`Error al subir la imagen ${data.images}`, {
          cause: await imageResponse.json()
        })
      }
      const imgPublicId = await imageResponse.text() //text because create image return a string not a json
      createdImgs.push(imgPublicId)
    })
    )

    return {
      productSkus: createdProductSkus,
      images: createdImgs
    }
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.cause)
    }
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

