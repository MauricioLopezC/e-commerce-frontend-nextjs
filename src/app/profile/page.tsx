import { getProfile } from "@/queries/auth.api"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import LogOutButton from "./LogOutButton"
import { revalidatePath } from "next/cache"

async function UserProfile() {
  const getCookie = (name: string) => {
    return cookies().get(name)?.value ?? ''
  }
  revalidatePath('/profile')

  const cookie = getCookie("access-token")
  const res = await getProfile(cookie)
  if (!res.ok) {
    redirect("/auth/login")
  }
  const user = await res.json()



  return (
    <section id="userPage" className="min-h-[70vh] max-w-lg container mx-auto mt-16">
      <div id="userCard" className="shadow rounded-md border">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">PERFIL DEL USUARIO</h3>
        </div>

        <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl className="divide-y">
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Email
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.email}
              </dd>
            </div>
            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">
                Role
              </dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {user.role}
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <LogOutButton />
    </section>
  )
}

export default UserProfile
