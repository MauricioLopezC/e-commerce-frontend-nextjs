'use client'
import {
  ChevronLeft,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { z } from '@/lib/zod/es-zod'
import { ApplicableTo, DiscountType } from "@/interfaces/discounts"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { es } from 'date-fns/locale'
import { Switch } from "@/components/ui/switch"
import Link from "next/link"
import { createDiscount } from "@/lib/actions/discounts.actions"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"


//TODO: custom button to reset maxUses value
const formSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(200),
  discountType: z.nativeEnum(DiscountType),
  value: z.coerce.number().positive().step(0.01, "Solo se admiten 2 decimales"),
  startDate: z.date({ coerce: true }),
  endDate: z.date({ coerce: true }),
  applicableTo: z.nativeEnum(ApplicableTo),
  orderThreshold: z.coerce.number().min(0).step(0.01, "Solo se admiten 2 decimales"),
  maxUses: z.coerce.number().int().positive().optional(),
  isActive: z.boolean(),
})
  .refine((schema) => {
    return (schema.startDate < schema.endDate)
  }, {
    path: ['endDate'],
    message: 'La fecha de vencimiento debe ser posterior a la fecha de inicio'
  })
  .refine((schema) => {
    if (schema.discountType === DiscountType.PERCENTAGE && schema.value >= 100) return false
    return true
  }, {
    path: ['value'],
    message: 'Solo se admite porcentaje hasta el 100%'
  })

function CreateDiscountForm() {
  const router = useRouter()
  const [dialogOpen, setDialogOpen] = useState(false)
  const [createdDiscountId, setCreatedDiscountId] = useState<number | null>(null)

  const now = new Date()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      discountType: DiscountType.PERCENTAGE,
      value: 0,
      startDate: now,
      endDate: now,
      applicableTo: ApplicableTo.GENERAL,
      orderThreshold: 0,
      maxUses: undefined,
      isActive: true,
    }
  })

  async function onSubmit(value: z.infer<typeof formSchema>) {
    console.log(value)
    const { discount, error } = await createDiscount(value)
    if (discount) {
      setCreatedDiscountId(discount.id)
      setDialogOpen(true)
    }
    if (error) {
      console.log(error)
    }
  }

  return (
    <main className="container mx-auto mt-4 mb-16">
      <div className="max-w-[59rem] space-y-2 mx-auto">
        <div className="flex items-center gap-4">
          <Link href={'/dashboard/promotions'}>
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button type='submit' form="create-discount" size="sm">Guardar descuento</Button>
          </div>
        </div>
        <div className="">
          <Card >
            <CardHeader>
              <CardTitle>Crear descuento</CardTitle>
              <CardDescription>La opción para conectar productos o descuentos aplicables se mostrara en el siguiente paso</CardDescription>
            </CardHeader>
            <CardContent>
              {/* main form here */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} id="create-discount">
                  <div className="grid gap-4 py-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nombre</FormLabel>
                          <FormControl>
                            <Input className='col-span-3' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Descripción</FormLabel>
                          <FormControl>
                            <Input className='col-span-3' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="discountType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tipo de descuento</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona el tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={DiscountType.PERCENTAGE}>Porcentaje</SelectItem>
                              <SelectItem value={DiscountType.FIXED}>Monto fijo</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="value"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Valor</FormLabel>
                          <FormControl>
                            <Input className='col-span-3' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="startDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Fecha de inicio</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: es })
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date("1900-01-01")
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="endDate"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Fecha de vencimiento</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-[240px] pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP", { locale: es })
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date < new Date()
                                }
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="applicableTo"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aplicable a</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Selecciona el tipo" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value={ApplicableTo.PRODUCT}>Producto</SelectItem>
                              <SelectItem value={ApplicableTo.CATEGORY}>Categoría</SelectItem>
                              <SelectItem value={ApplicableTo.GENERAL}>General</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="orderThreshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Monto mínimo</FormLabel>
                          <FormControl>
                            <Input className='col-span-3' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="maxUses"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Usos Máximos</FormLabel>
                          <FormControl>
                            <Input className='col-span-3' {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isActive"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                          <div className="space-y-0.5">
                            <FormLabel >
                              Esta Activo
                            </FormLabel>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  <Button type="submit">Guardar</Button>
                </form>
              </Form>

            </CardContent>
          </Card>
        </div>
      </div>
      {/* confirmation dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Descuento creado correctamente!</DialogTitle>
            <DialogDescription>
              Ahora puede dirigirse al apartado de edición para conectar productos o categorías si así lo desea
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Hecho
              </Button>
            </DialogClose>
            <Button onClick={() => {
              router.push(`/dashboard/promotions/discounts/edit/${createdDiscountId}`)
            }}>Editar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default CreateDiscountForm
