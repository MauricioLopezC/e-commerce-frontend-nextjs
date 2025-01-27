'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Product } from '@/interfaces/products/product'
import { updateProduct } from '@/lib/actions/product.actions'
import { CheckCircleIcon, PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { z } from '@/lib/zod/es-zod'
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
import { Category } from '@/interfaces/products/categories'
import { CreateCategoryDialog } from '../create/CreateCategoryDialog'

const formSchema = z.object({
  name: z.string().min(2).max(50).toLowerCase(),
  price: z.coerce.number().positive().step(0.01),
  categoryId: z.coerce.number().int().positive(),
  sex: z.string().min(2).max(100),
  description: z.string().min(2).max(100),
})


function ProductDetails({ product, categories }: { product: Product, categories: Category[] }) {
  const [isChanged, setIsChanged] = useState(false)
  const { toast } = useToast()
  const [descIsOpen, setDescIsOpen] = useState(false)


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: product.name,
      price: product.price,
      categoryId: product.categories[0]?.id ?? 0,
      sex: product.sex,
      description: product.description,
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const { product: updatedProduct, error } = await updateProduct(product.id, values)
    if (updatedProduct) {
      toast({
        description: (
          <div>
            <h2 className="font-semibold text-md">
              <span><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
              Producto actualizado
            </h2>
          </div>
        ),
      })
    } else {
      toast({
        variant: "destructive",
        title: "¡Vaya! Algo salió mal.",
        description: "Hubo un problema al crear el producto, intento nuevamente mas tarde",
      })
    }
  }

  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Detalles del Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            id='product-form'
            className='space-y-2'
            onSubmit={form.handleSubmit(onSubmit)}
            onChange={() => {
              setIsChanged(true)
            }}
          >
            <div className="grid gap-6">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input placeholder="Remera" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio</FormLabel>
                      <FormControl>
                        <Input placeholder="$0.00" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="sex"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sexo</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger id="sex" aria-label="Select sex">
                            <SelectValue placeholder="Seleccionar sexo de la prenda" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="hombre">Hombre</SelectItem>
                          <SelectItem value="mujer">Mujer</SelectItem>
                          <SelectItem value="unisex">Unisex</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea {...field}
                          className="min-h-32"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        {!isChanged &&
          <Button size="sm" form="product-form" disabled>
            Guardar
          </Button>
        }
        {isChanged &&
          <Button size="sm" type="submit" form="product-form">
            Guardar
          </Button>
        }
        <CreateCategoryDialog isOpen={descIsOpen} setIsOpen={setDescIsOpen} />
      </CardFooter>
    </Card>
  )
}

export default ProductDetails
