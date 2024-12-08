'use server'
import { cookies } from "next/headers"
import { BACKEND_URL } from "@/queries/constants"
import { revalidatePath } from "next/cache"

export async function uploadImage(formData: FormData, productId: number) {
  console.log(formData)
  const image = formData.get('image') ?? ''
  const productSkuId = formData.get('productSkuId') ?? ''
  console.log(image)

  const imgData = new FormData()
  imgData.append('productId', productId.toString())
  imgData.append('productSkuId', productSkuId)
  imgData.append('file', image)
  const token = cookies().get('access-token')?.value
  const imageResponse = await fetch(`${BACKEND_URL}/images`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    },
    body: imgData,
  })
  revalidatePath(`/dashboard/products/edit/${productId}`)
  return imageResponse.text()
}

export async function deleteImage(imageId: number, productId: number) {
  const token = cookies().get('access-token')?.value
  const imageResponse = await fetch(`${BACKEND_URL}/images/${imageId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      Cookie: `access-token=${token}`
    },
  })
  revalidatePath(`/dashboard/products/edit/${productId}`)
  return imageResponse.json() //si devuelve json
}
