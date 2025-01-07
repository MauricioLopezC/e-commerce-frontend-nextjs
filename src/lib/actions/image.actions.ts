"use server";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/queries/constants";
import { revalidatePath } from "next/cache";

export async function uploadImage(formData: FormData) {
  if (
    !formData.has("file") ||
    formData.has("product") ||
    formData.has("productSkuId")
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
    const createdImage = await res.text();
    return {
      createdImage,
    };
  }
  const error = res.json();
  return {
    error,
  };
}

export async function deleteImage(imageId: number, productId: number) {
  const token = cookies().get("access-token")?.value;
  const imageResponse = await fetch(`${BACKEND_URL}/images/${imageId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Cookie: `access-token=${token}`,
    },
  });
  revalidatePath(`/dashboard/products/edit/${productId}`);
  return imageResponse.json(); //si devuelve json
}
