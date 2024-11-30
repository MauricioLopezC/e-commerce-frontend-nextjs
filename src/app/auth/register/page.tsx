'use client'
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { z } from '@/lib/zod/es-zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { register } from "@/lib/actions/auth.actions"
import { useToast } from "@/hooks/use-toast"
import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const formSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  email: z.string().min(2).max(100).email(),
  password: z.string().min(2).max(100),
})

function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState('')
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: ''
    }
  })

  async function onSubmitV2(values: z.infer<typeof formSchema>) {
    const firstName = values.firstName
    const lastName = values.lastName
    const email = values.email
    const password = values.password

    const { user, error } = await register(firstName, lastName, email, password)
    if (user) {
      toast({
        title: 'Registrado correctamente!',
        description: (
          <div className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <h2 className="text-white">
              {user.email}
            </h2>
          </div>
        ),
      })
      router.push("/auth/login")
    }

    if (error && error.statusCode === 409) setErrorMessage("El usuario ya existe!")
    console.log(values)
  }

  return (
    <section className="mb-16">
      <div className="container mx-auto bg-gray-50 max-w-lg shadow rounded-lg mt-8 pb-8 px-8">
        <div className="flex flex-col items-center">
          <h1 className="font-bold text-xl mt-4">APRIL STORE</h1>
          <h2 className="font-bold text-lg">Ingrese a su cuenta</h2>
          {errorMessage !== '' &&
            <Alert variant="destructive" className="my-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {errorMessage}
              </AlertDescription>
            </Alert>
          }
        </div>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(onSubmitV2)}
          >
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="John" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Apellido</FormLabel>
                  <FormControl>
                    <Input placeholder="Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Registrarse</Button>
            <p className="text-center">Ya tiene una cuenta? <Link href="/auth/login" className="font-medium text-sky-600 hover:text-blue-400">Log in</Link></p>
          </form>
        </Form>
      </div>
    </section>
  )
}

export default RegisterPage
