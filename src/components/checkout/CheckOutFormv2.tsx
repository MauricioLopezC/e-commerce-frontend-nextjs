'use client'
import { z } from '@/lib/zod/es-zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Card, CardHeader, CardContent, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { Calendar, CreditCard, Lock } from 'lucide-react'
import { Button } from '../ui/button'
import { createOrder } from '@/lib/actions/order.actions'
import { useRouter } from 'next/navigation'

enum PaymentProvider {
  PAYPAL = "PAYPAL",
  VISA = "VISA",
  MASTERCARD = "MASTERCARD",
  APPLE_PAY = "APPLE_PAY",
  OTHER = "OTHER",
}

const formSchema = z.object({
  // Personal Information
  phone: z.string().min(1),
  email: z.string().email().min(1),

  // Shipping Information
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  country: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.string().min(1,),
  address: z.string().min(1),

  // Payment Method
  payment: z.nativeEnum(PaymentProvider),

  // Card Details
  cardNumber: z.string().min(16).max(19),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Formato inválido (MM/AA)"),
  cvv: z.string().min(3).max(4),
})

function CheckOutFormv2() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: "",
      email: "mauroagustin.lopez.456@gmail.com",
      firstName: "",
      lastName: "",
      country: "Argentina",
      city: "salta",
      postalCode: "4400",
      address: "",
      payment: PaymentProvider.VISA,
      cardNumber: "4242 4242 4242 4242",
      expiryDate: "02/27",
      cvv: "",
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log(data)

    const { order } = await createOrder({
      email: data.email,
      country: data.country,
      city: data.city,
      postalCode: data.postalCode,
      address: data.address,
      provider: data.payment
    })
    if (order) {
      setIsSubmitting(false)
      router.push('/checkout/confirm')
    }

  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">INFORMACIÓN PERSONAL</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Número de teléfono" className="h-12" {...field} />
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
                    <FormControl>
                      <Input placeholder="Email" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Shipping Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">INFORMACIÓN DE ENVÍO</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Nombre" className="h-12" {...field} />
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
                    <FormControl>
                      <Input placeholder="Apellido" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="País" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Ciudad" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Código Postal" className="h-12" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Dirección" className="h-12" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">MÉTODO DE PAGO</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="payment"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={PaymentProvider.VISA} id="visa" />
                        <FormLabel htmlFor="visa" className="font-medium cursor-pointer">
                          VISA
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={PaymentProvider.MASTERCARD} id="mastercard" />
                        <FormLabel htmlFor="mastercard" className="font-medium cursor-pointer">
                          MASTERCARD
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={PaymentProvider.APPLE_PAY} id="apple_pay" />
                        <FormLabel htmlFor="apple_pay" className="font-medium cursor-pointer">
                          APPLE_PAY
                        </FormLabel>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={PaymentProvider.PAYPAL} id="paypal" />
                        <FormLabel htmlFor="paypal" className="font-medium cursor-pointer">
                          PAYPAL
                        </FormLabel>
                      </div>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Card Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">DETALLES DE TARJETA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        placeholder="4242 4242 4242 4242"
                        className="h-12 pl-10"
                        {...field}
                        onChange={(e) => {
                          const formatted = formatCardNumber(e.target.value)
                          field.onChange(formatted)
                        }}
                        maxLength={19}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                control={form.control}
                name="expiryDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="MM/AA"
                          className="h-12 pl-10"
                          {...field}
                          onChange={(e) => {
                            const formatted = formatExpiryDate(e.target.value)
                            field.onChange(formatted)
                          }}
                          maxLength={5}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cvv"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                        <Input
                          placeholder="•••"
                          type="password"
                          className="h-12 pl-10"
                          {...field}
                          maxLength={4}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </CardContent>
        </Card>

        {/* Pay Button */}
        <Button
          type="submit"
          className="w-full h-14 bg-gray-800 hover:bg-gray-900 text-white text-lg font-semibold"
          disabled={isSubmitting}
        >
          {isSubmitting ? "PROCESANDO..." : "PAGAR"}
        </Button>
      </form>
    </Form>
  )
}

export default CheckOutFormv2
