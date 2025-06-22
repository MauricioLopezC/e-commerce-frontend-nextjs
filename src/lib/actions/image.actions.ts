"use server";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/queries/constants";
import { revalidateTag } from "next/cache";
import { ErrorResponse } from "@/interfaces/responses";

interface UploadImageResponse {
  imgSrc?: string
  error?: ErrorResponse
}

export async function uploadImage(formData: FormData): Promise<UploadImageResponse> {
  console.log(formData)
  if (
    !formData.has("file") ||
    !formData.has("productId") ||
    !formData.has("productSkuId")
  ) {
    return {
      error: {
        statusCode: 400,
        message: "Error: some formData properties are missing",
      },
    };
  }

  const token = cookies().get("access-token")?.value;
  const res = await fetch(`${BACKEND_URL}/images`, {
    method: "POST",
    credentials: "include",
    headers: {
      Cookie: `access-token=${token}`,
    },
    body: formData,
  });
  if (res.ok) {
    revalidateTag('product')
    const imgSrc = await res.text();
    return { imgSrc };
  }
  const error = await res.json();
  return { error };
}

export async function deleteImage(imageId: number) {
  const token = cookies().get("access-token")?.value;
  const res = await fetch(`${BACKEND_URL}/images/${imageId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Cookie: `access-token=${token}`,
    },
  });

  if (res.ok) {
    const data = await res.json()
    return { data }
  }

  const error = res.json()
  return { error }
}
