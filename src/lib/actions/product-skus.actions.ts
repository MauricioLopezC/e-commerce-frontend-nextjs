'use server'
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/queries/constants"
import { revalidatePath } from "next/cache"

export async function createProductSku(formData: FormData, productId: number) {
  //todo validate formDATA with ZOD
  console.log(formData)

  const token = cookies().get('access-token')?.value
  const res = await fetch(`${BACKEND_URL}/products/${productId}/product-skus`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify({
      size: formData.get('size'),
      color: formData.get('color'),
      quantity: Number(formData.get('stock'))
    })
  })
  if (!res.ok) return { error: true, message: "ERROR" }
  revalidatePath(`/dashboard/products/edit/${productId}`)
  return res.json()
}

export async function editProductSku(formdata: FormData, productId: number, productSkuId: number) {
  //TODO: validate formDATA with ZOD
  console.log("FDATA", formdata)

  const token = cookies().get('access-token')?.value
  const res = await fetch(`${BACKEND_URL}/products/${productId}/product-skus/${productSkuId}`, {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
      Cookie: `access-token=${token}`
    },
    body: JSON.stringify({
      size: formdata.get('size'),
      color: formdata.get('color'),
      quantity: Number(formdata.get('stock'))
    })
  })
  //TODO: handle error properly
  if (!res.ok) return { error: true, message: "ERROR" }
  revalidatePath(`/dashboard/products/edit/${productId}`)
  return res.json()
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

  //TODO: handle error properly
  if (!res.ok) return { error: true, message: "ERROR" }
  revalidatePath(`/dashboard/products/edit/${productId}`)
  return res.json()
}
