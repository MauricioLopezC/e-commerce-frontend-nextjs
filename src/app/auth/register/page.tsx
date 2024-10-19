'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import { register } from "@/queries/auth.api"
import Link from "next/link"

function RegisterPage() {
  const [emailMessage, setEmailMessage] = useState('')
  const router = useRouter()
  return (
    <section className="mb-16">
      <div id="" className="container mx-auto bg-gray-50 max-w-lg shadow rounded-lg mt-8 pb-8 px-8">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl mt-4">APRIL STORE</h1>
          <h2 className="font-bold text-lg">Ingrese a su cuenta</h2>
          <p className="text-red-500">{emailMessage}</p>
        </div>
        <form className="space-y-4 mt-4"
          action={async (data) => {

            const firstName = data.get('firstName')?.toString() ?? ''
            const lastName = data.get('lastName')?.toString() ?? ''
            const email = data.get('email')?.toString() ?? ''
            const password = data.get('password')?.toString() ?? ''
            const res = await register(firstName, lastName, email, password)

            console.log(res)

            if (res.ok) {
              alert("Usuario registrado con exito")
              router.push("/auth/login")
            } else {
              const resBody = await res.json()
              const message = resBody.message
              setEmailMessage(message)
            }
          }}
        >
          <div>
            <label className="font-medium">
              First Name
            </label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-900 shadow-sm rounded-lg"
              name="firstName"
            />
          </div>
          <div>
            <label className="font-medium">
              Last Name
            </label>
            <input
              type="text"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-900 shadow-sm rounded-lg"
              name="lastName"
            />
          </div>
          <div>
            <label className="font-medium">
              Email
            </label>
            <input
              type="email"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-900 shadow-sm rounded-lg"
              name="email"
            />
          </div>
          <div>
            <label className="font-medium">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-gray-900 shadow-sm rounded-lg"
              name="password"
            />
          </div>

          <button type="submit"
            className="w-full px-4 py-2 text-white font-medium bg-black hover:bg-black/80 active:bg-white duration-150">
            Sign in
          </button>
          <p className="text-center">Ya tiene una cuenta? <Link href="/login" className="font-medium text-sky-600 hover:text-blue-400">Log in</Link></p>
        </form>
      </div>
    </section>

  )
}

export default RegisterPage
