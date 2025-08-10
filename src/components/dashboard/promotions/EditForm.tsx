'use client'
import { z } from '@/lib/zod/es-zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { DiscountType, ApplicableTo, Discount } from "@/interfaces/discounts";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns"
import { es } from 'date-fns/locale'
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { updateDiscount } from '@/lib/actions/discounts.actions';
import { useToast } from '@/hooks/use-toast';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';

import MultipleSelector, { Option } from "@/components/shadcn-expansions/multiselect";
import { Product } from "@/interfaces/products/product";
import { Category } from "@/interfaces/products/categories";
import { searchByName } from "@/lib/actions/search.actions";


const categoryOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const productOptionSchema = z.object({
  label: z.string(),
  value: z.string(),
  disable: z.boolean().optional(),
});

const formSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().min(1).max(200).optional(),
  discountType: z.nativeEnum(DiscountType),
  value: z.coerce.number().min(0).step(0.01, "Solo se admiten 2 decimales"),
  startDate: z.date({ coerce: true }),
  endDate: z.date({ coerce: true }),
  applicableTo: z.nativeEnum(ApplicableTo).optional(),
  products: z.array(productOptionSchema),
  categories: z.array(categoryOptionSchema),
  orderThreshold: z.number().min(0).step(0.01, "Solo se admiten 2 decimales").optional(),
  maxUses: z.coerce.number().int().positive().optional(),
  isActive: z.boolean()
}).refine((schema) => {
  return (schema.startDate < schema.endDate)
}, {
  path: ['endDate'],
  message: 'La fecha de vencimiento debe ser posterior a la fecha de inicio'
}).refine((schema) => {
  if (schema.discountType === DiscountType.PERCENTAGE && schema.value >= 100) return false
  return true
}, {
  path: ['value'],
  message: 'Solo se admite porcentaje hasta el 100%'
})

interface EditFormProps {
  discount: Discount;
  products: Product[];
  categories: Category[];
}

function EditDiscountForm({ discount, products, categories }: EditFormProps) {
  // console.log("Discount =>", discount)
  const { toast } = useToast()

  const productsDefaultValue = discount.products.map(product => (
    {
      label: product.name,
      value: product.id.toString(),
    }
  ))

  const categoriesDefaultValue = discount.categories.map(category => (
    {
      label: category.name,
      value: category.id.toString()
    }
  ))

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: discount.name,
      description: discount.description ?? undefined,
      discountType: discount.discountType,
      value: discount.value,
      startDate: discount.startDate,
      endDate: discount.endDate,
      applicableTo: discount.applicableTo,
      products: productsDefaultValue,
      categories: categoriesDefaultValue,
      orderThreshold: discount.orderThreshold ?? 0,
      maxUses: discount.maxUses ?? undefined,
      isActive: discount.isActive,
    }
  })

  const applicableTo = form.watch("applicableTo")

  const productOptions: Option[] = products.map(product => (
    {
      label: product.name,
      value: product.id.toString(),
    }
  ))

  const categoryOptions: Option[] = categories.map(category => (
    {
      label: category.name,
      value: category.id.toString(),
    }
  ))

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const productsIds = values.products.map(item => Number(item.value))
    const categoryIds = values.categories.map(item => Number(item.value))
    const createDiscountData = { ...values, products: productsIds, categories: categoryIds }
    console.log(createDiscountData)
    const { discount: updatedDiscount, error } = await updateDiscount(discount.id, createDiscountData)
    if (updatedDiscount) {
      toast({
        description: (
          <div>
            <h2 className="font-semibold text-md">
              <span><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
              Descuento actualizado
            </h2>
          </div>
        ),
      })
    }
    if (error) {
      console.log(error)
      toast({
        description: (
          <div>
            <h2 className="font-semibold text-md">
              <span><XMarkIcon className="h-6 w-6 mr-2 text-red-500 inline" /></span>
              Error al actualizar
            </h2>
          </div>
        ),
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} id="edit-discount">
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
                <FormLabel>descripcion</FormLabel>
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
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona el tipo" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value={ApplicableTo.PRODUCT}>Producto</SelectItem>
                    <SelectItem value={ApplicableTo.CATEGORY}>Categoria</SelectItem>
                    <SelectItem value={ApplicableTo.GENERAL}>General</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {applicableTo === ApplicableTo.PRODUCT &&
            <FormField
              control={form.control}
              name="products"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Productos</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      defaultOptions={productOptions}
                      placeholder="Selecciona los productos"
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no hay resultados.
                        </p>
                      }
                      loadingIndicator={
                        <p className="py-2 text-center text-lg leading-10 text-muted-foreground">Buscando...</p>
                      }
                      onSearch={async (value) => {
                        const { products, error } = await searchByName(value)
                        if (error || !products) {
                          return []

                        }
                        const options: Option[] = products.map((product) => (
                          {
                            label: product.name,
                            value: product.id.toString()
                          }
                        ))
                        return options;
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          }

          {/* TODO: implement onSearch categories */}
          {applicableTo === ApplicableTo.CATEGORY &&
            <FormField
              control={form.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categorías</FormLabel>
                  <FormControl>
                    <MultipleSelector
                      {...field}
                      defaultOptions={categoryOptions}
                      placeholder="Seleciona las categorías"
                      emptyIndicator={
                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                          no hay resulados.
                        </p>
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          }

          <FormField
            control={form.control}
            name="orderThreshold"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Monto minimo</FormLabel>
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
                <FormLabel>Usos Maximos</FormLabel>
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
  )
}

export default EditDiscountForm
