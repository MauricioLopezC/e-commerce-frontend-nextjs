'use client'
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { logIn } from "@/lib/actions/auth.actions"
import { z } from '@/lib/zod/es-zod'
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import { AlertCircle, UserRoundCheck } from "lucide-react"
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
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useSearchParams } from 'next/navigation'

const formSchema = z.object({
  email: z.string().min(2).max(100).email(),
  password: z.string().min(2).max(100),
})

function LoginPage() {
  const [errorMessage, setErrorMessage] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect: string | null = searchParams.get('redirect')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {

    const email = values.email
    const password = values.password

    const { access_token, error } = await logIn(email, password)
    if (access_token) {
      setIsOpen(true)
    }

    if (error?.statusCode === 401) {
      setErrorMessage("email o contraseña incorrectas")
    }
  }

  return (
    <section className="mb-16 min-h-[70vh]">
      <div id="" className="container mx-auto bg-gray-50 max-w-lg shadow rounded-lg mt-8 pb-8 px-8">
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
            onSubmit={form.handleSubmit(onSubmit)}
          >
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
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">Iniciar sesión</Button>
            <p className="text-center">No tiene una cuenta? <Link href="/auth/register" className="font-medium text-sky-600 hover:text-blue-400">Sign Up</Link></p>
          </form>
        </Form>
      </div>
      <Dialog open={isOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>¡Bienvenido!</DialogTitle>
            <DialogDescription className="hidden">
              Inicio de sesión
            </DialogDescription>
          </DialogHeader>
          <div className="flex space-x-2">
            <UserRoundCheck className="h-6 w-6 text-green-500" />
            <h1>Sesión iniciada correctamente</h1>
          </div>
          <DialogFooter >
            <Button onClick={() => router.push(redirect ?? '/')}>Continuar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section >
  )
}

export default LoginPage
