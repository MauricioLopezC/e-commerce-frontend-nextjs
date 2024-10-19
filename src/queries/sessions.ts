import { cookies } from "next/headers";
export async function getSession() {
  const session = cookies().get('access-token')

}
