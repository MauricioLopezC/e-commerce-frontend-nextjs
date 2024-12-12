'use server'
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/queries/constants"
import { revalidatePath } from "next/cache"
import { ProductSku } from "@/interfaces/products/product";
//TODO: add getProductSku and getAllProductSkus functions with tags for later revalidateTag
//because new productSkus are not updated in products/[productId] users page

interface ProductSkuDto {
  quantity: number;
  size: string;
  color: string;
}

interface ProductSkuResponse {
  productSku?: ProductSku;
  error?: any
}

export async function createProductSku(createProductSkuDto: ProductSkuDto, productId: number) {
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
  revalidatePath(`/dashboard/products/edit/${productId}`)
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

export async function editProductSku(
  productSkuDto: ProductSkuDto,
  productId: number,
  productSkuId: number
): Promise<ProductSkuResponse> {
  const token = cookies().get('access-token')?.value
  const res = await fetch(`${BACKEND_URL}/products/${productId}/product-skus/${productSkuId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify(productSkuDto)
  })

  revalidatePath(`/dashboard/products/edit/${productId}`)

  if (res.ok) {
    const data = await res.json()
    return { productSku: data }
  }
  const error = await res.json()
  return { error }
}


export async function deleteProductSku(productId: number, productSkuId: number) {
  console.log("IDS ==>", productId, productSkuId)
  const token = cookies().get('access-token')?.value ?? ''
  const res = await fetch(`${BACKEND_URL}/products/${productId}/product-skus/${productSkuId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    }
  })

  if (!res.ok) return { error: true, message: "ERROR" }
  revalidatePath(`/dashboard/products/edit/${productId}`)
  return res.json()
}
