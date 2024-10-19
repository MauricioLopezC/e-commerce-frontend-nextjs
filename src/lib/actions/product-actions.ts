'use server'
import { Product, ProductSku } from "@/interfaces/products/Product"
import { BACKEND_URL } from "@/queries/constants"
import { cookies } from "next/headers"
import { z } from 'zod'

export interface BadRequestResponse {
  message: string;
  error: string;
  statusCode: number
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
    body: JSON.stringify(ProductData)
  })

  const data = res.json()
  return data
}

export async function createProductSkus(formData: FormData, createdProduct: Product) {
  //TODO: file input validation with zod, file size < 10MB
  try {
    const token = cookies().get('access-token')?.value

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
      const imgPublicId = await imageResponse.text()
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

export async function testImageUpload(img: File) {
  const imgData = new FormData()
  imgData.append('productId', '10')
  imgData.append('productSkuId', '19')
  imgData.append('file', img)
  const token = cookies().get('access-token')?.value
  const imageResponse = await fetch(`${BACKEND_URL}/images`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      "Content-Type": "multipart/form-data",
      Cookie: `access-token=${token}`
    },
    body: imgData,
  })
  return imageResponse.json()
}


// export async function createProduct(formData: FormData): Promise<ProductCreatedResponse | any> {
//   try {
//     const ProductData = {
//       name: formData.get('name'),
//       price: formData.get('price'),
//       description: formData.get('description'),
//       category: formData.get('category'),
//       sex: formData.get('sex'),
//     }
//
//     const token = cookies().get('access-token')?.value
//
//     const createProductResponse = await fetch(`${BACKEND_URL}/products`, {
//       method: 'POST',
//       credentials: 'include',
//       headers: {
//         "Content-Type": "application/json",
//         Cookie: `access-token=${token}`
//       },
//       body: JSON.stringify(ProductData)
//     })
//
//
//
//
//     const responseOject = createProductResponse.json()
//     console.log(await responseOject)
//     if (!createProductResponse.ok) return responseOject
//     const createdProduct: Product = await createProductResponse.json()
//     console.log(createdProduct)
//
//     formData.delete('name')
//     formData.delete('price')
//     formData.delete('description')
//     formData.delete('category')
//     formData.delete('sex')
//
//     const productSkusData: Array<Map<string, string>> = []
//
//     const productSkuErrorResponses = []
//     const createdProductSkus: ProductSku[] = []
//
//     const imagesErrorsResponses = []
//     const createdImgs: string[] = []
//
//     formData.forEach((value, key) => {
//
//       if (key.startsWith('$')) return
//
//       const [name, index] = key.split('-')
//       if (productSkusData[Number(index)]) { //existe el objecto en el array
//         productSkusData[Number(index)].set(name, value.toString())
//       } else {
//         productSkusData[Number(index)] = new Map([[name, value.toString()]])
//       }
//     })
//
//     productSkusData.forEach(async (map) => {
//       const data = Object.fromEntries(map)
//       const productId = createdProduct.id
//       const productSkuResponse = await fetch(`${BACKEND_URL}/products/${productId}/product-skus`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           "Content-Type": "application/json",
//           Cookie: `access-token=${token}`
//         },
//         body: JSON.stringify({
//           size: data.size,
//           color: data.color,
//           quantity: data.stock
//         })
//       })
//       if (!productSkuResponse.ok) {
//         productSkuErrorResponses.push(productSkuResponse.json())
//         return
//       }
//
//       const productSku: ProductSku = await productSkuResponse.json()
//       createdProductSkus.push(productSku)
//
//       const imgData = new FormData()
//       imgData.append('file', data.images)
//       imgData.append('productId', productId.toString())
//       imgData.append('productSkuId', productSku.id.toString())
//
//       const imageResponse = await fetch(`${BACKEND_URL}/images`, {
//         method: 'POST',
//         credentials: 'include',
//         headers: {
//           "Content-Type": "application/json",
//           Cookie: `access-token=${token}`
//         },
//         body: imgData
//       })
//       if (!imageResponse.ok) {
//         imagesErrorsResponses.push(imageResponse.json())
//         return
//       }
//
//       createdImgs.push(await imageResponse.json())
//
//     })
//     if (imagesErrorsResponses.length !== 0 || productSkuErrorResponses.length !== 0) {
//       return {
//         error: "BAD REQUEST",
//         messages: "TODO MAL"
//       }
//     }
//     console.log(createdProduct)
//     console.log(createdProductSkus)
//     console.log(createdImgs)
//
//     return {
//       product: createdProduct,
//       productSkus: createdProductSkus,
//       images: createdImgs
//     }
//
//   } catch (error) {
//     console.log("ERROR XD")
//   }
//
// }
