"use server";
import { cookies } from "next/headers";
import { BACKEND_URL } from "@/queries/constants";
import { revalidatePath } from "next/cache";
import { User } from "@/interfaces/users";

export interface UsersData {
  users: User[];
  aggregate: { _count: number };
}

interface UsersResponse {
  usersData?: UsersData;
  error?: any;
}
interface GetUsersOptions {
  limit?: number;
  page?: number;
}

export async function getUsers(
  options: GetUsersOptions
): Promise<UsersResponse> {
  const token = cookies().get("access-token")?.value;
  const queryParams = new URLSearchParams();
  let key: keyof GetUsersOptions;
  for (key in options) {
    const value = options[key];
    if (value) {
      queryParams.set(key, value.toString());
    }
  }

  const res = await fetch(`${BACKEND_URL}/users?${queryParams.toString()}`, {
    method: "GET",
    credentials: "include",
    headers: {
      Cookie: `access-token=${token}`,
    },
  });
  if (res.ok) {
    const usersData = await res.json();
    return {
      usersData,
    };
  }
  const error = await res.json();
  return {
    error,
  };
}

export async function deleteUser(userId: number) {
  const token = cookies().get("access-token")?.value;
  console.log("USERID ===> ", userId);

  const res = await fetch(`${BACKEND_URL}/users/${userId}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      Cookie: `access-token=${token}`,
    },
  });

  revalidatePath("/dashboard/users");
  if (res.ok) {
    const data = await res.json();
    return {
      user: data,
    };
  }

  const error = await res.json();
  return {
    error,
  };
}

export async function banUser(userId: number) {
  const token = cookies().get('access-token')?.value
  const res = await fetch(`${BACKEND_URL}/users/${userId}/ban`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Cookie: `access-token=${token}`,
    },
  });
  revalidatePath("/dashboard/users");
  if (res.ok) {
    const data = await res.json();
    return {
      user: data,
    };
  }

  const error = await res.json();
  return {
    error,
  };

}

export async function unBanUser(userId: number) {
  const token = cookies().get('access-token')?.value
  const res = await fetch(`${BACKEND_URL}/users/${userId}/unban`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      Cookie: `access-token=${token}`,
    },
  });
  revalidatePath("/dashboard/users");
  if (res.ok) {
    const data = await res.json();
    return {
      user: data,
    };
  }

  const error = await res.json();
  return {
    error,
  };
}

