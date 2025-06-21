'use client'
import { Button } from '@/components/ui/button'
import { createProduct } from '@/lib/actions/product.actions'
import { uploadImage } from '@/lib/actions/image.actions'
import { createProductSku } from '@/lib/actions/product-skus.actions'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CircleCheckBig, Loader2, TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { z } from '@/lib/zod/es-zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from 'react-hook-form'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Category } from '@/interfaces/products/categories'
import { CreateCategoryDialog } from './CreateCategoryDialog'

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const pVariationsSchema = z.object({
  stock: z.coerce.number().int().min(0),
  size: z.string().min(1).max(10),
  color: z.string().min(2).max(50),
  image: z
    .instanceof(File)
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), 'Solo se admiten los formatos .jpg, .jpeg, .png y .webp.')
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'El tamaño máximo de la imagen es 5 MB.')
})

const formSchema = z.object({
  name: z.string().min(2).max(50).toLowerCase(),
  price: z.coerce.number().positive().step(0.01),
  categoryId: z.coerce.number().int().positive(),
  sex: z.string().min(2).max(100),
  description: z.string().min(2).max(100),
  variations: z.array(pVariationsSchema).min(1)
})

function CreateProductForm({ categories }: { categories: Category[] }) {
  const [isCreated, setIsCreated] = useState(false)
  const router = useRouter()
  const [productId, setProductId] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const [descIsOpen, setDescIsOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      description: '',
      variations: [{ stock: 0, color: '', size: '', image: new File(["foo"], "foo.txt") }]
    }
  })

  const { fields, append, remove } = useFieldArray({
    name: 'variations',
    control: form.control
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    const { variations, ...rest } = values
    const { product, error } = await createProduct({ ...rest, categories: [rest.categoryId] })
    console.log(product, error)

    if (!product) {
      toast({
        variant: "destructive",
        title: "¡Vaya! Algo salió mal.",
        description: "Hubo un problema al crear el producto, intento nuevamente mas tarde",
        // action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
      return
    }
    const productId = product.id
    console.log(product)

    for (let variation of variations) {
      const { createdProductSku, error: productSkuError } = await createProductSku({
        size: variation.size,
        color: variation.color,
        quantity: variation.stock
      }, productId)
      console.log(createdProductSku, productSkuError)

      if (!createdProductSku) {
        toast({
          variant: "destructive",
          title: "¡Vaya! Algo salió mal.",
          description: "Hubo un problema al crear la variación, intente nuevamente mas tarde",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
        return
      }

      const imageData = new FormData()
      imageData.append('file', variation.image)
      imageData.append('productId', productId.toString())
      imageData.append('productSkuId', createdProductSku.id.toString())
      console.log(imageData)
      const { createdImage, error: imageError } = await uploadImage(imageData)
      console.log(createdImage, imageError)
      if (!createdImage) {
        toast({
          variant: "destructive",
          title: "¡Vaya! Algo salió mal.",
          description: "Hubo un problema al subir la imagen, intente nuevamente mas tarde",
          // action: <ToastAction altText="Try again">Try again</ToastAction>,
        })
      }
    }
    setProductId(productId)
    setIsCreated(true)
    setIsLoading(false)
  }

  return (
    <div className='space-y-2'>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/products">Cancelar</Link>
        </Button>
        {isLoading ?
          <Button disabled>
            <Loader2 className="animate-spin" />
            Subiendo
          </Button>
          : <Button type='submit' size="sm" form='create-product-form'>Crear Producto</Button>
        }
      </div>
      <Form {...form}>
        <form
          id='create-product-form'
          className="space-y-8"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Card>
            <CardHeader>
              <CardTitle>Detalles del Producto</CardTitle>
            </CardHeader>
            <CardContent>
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
                <div className='w-full'>
                  <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <div className='flex gap-2'>
                          <Select onValueChange={field.onChange} defaultValue={field.value?.toString()}>
                            <FormControl>
                              <SelectTrigger id="categoryId" aria-label="Select category">
                                <SelectValue placeholder="Seleccionar la Categoría de la prenda" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map(category => (
                                <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                              ))}
                            </SelectContent>
                            {/* button to create new categories */}
                            <Button size='sm'
                              onClick={(event) => {
                                event.preventDefault()
                                setDescIsOpen(true)
                              }}>
                              <PlusCircleIcon className='h-5 w-5' />
                            </Button>

                          </Select>
                        </div>
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
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <Table className='space-y-8'>
                <TableBody>
                  {fields.map((field, idx) => (
                    <TableRow key={field.id}>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`variations.${idx}.stock`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Stock</FormLabel>
                              <FormControl>
                                <Input placeholder="0" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`variations.${idx}.color`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Color</FormLabel>
                              <FormControl>
                                <Input placeholder="rojo" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`variations.${idx}.size`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Talle</FormLabel>
                              <FormControl>
                                <Input placeholder="XL" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        <FormField
                          control={form.control}
                          name={`variations.${idx}.image`}
                          render={({ field: { value, onChange, ...fieldProps } }) => (
                            <FormItem>
                              <FormLabel>Imágenes</FormLabel>
                              <FormControl>
                                <Input
                                  {...fieldProps}
                                  placeholder="img"
                                  type='file'
                                  accept="image/*"
                                  onChange={(event) => {
                                    onChange(event.target.files && event.target.files[0])
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </TableCell>
                      <TableCell>
                        {idx > 0 &&
                          <Button variant='outline' size='icon' onClick={() => {
                            console.log(`borrando la variacion con index ${idx}`)
                            remove(idx)
                          }}>
                            <TrashIcon className='text-red-500 h-4 w-4' />
                          </Button>
                        }
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="justify-center border-t p-4">
              <Button
                size="sm"
                variant="ghost"
                className="gap-1"
                onClick={() => {
                  append({ stock: 0, size: '', color: '', image: new File(["foo"], "foo.txt") })
                }}
              >
                <PlusCircleIcon className="h-5 w-5" />
                Agregar Variante
              </Button>
            </CardFooter>
          </Card>
        </form>
      </Form>

      <Dialog open={isCreated} >
        <DialogContent className="sm:max-w-[425px]" >
          <DialogHeader>
            <DialogTitle>
              <div className='flex space-x-1 items-center'>
                <CircleCheckBig className='w-5 h-5 text-green-500' />
                <p>Producto creado correctamente</p>
              </div>
            </DialogTitle>
            <DialogDescription>
              Producto creado, puede ir a la sección de editar producto si así lo desea
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => {
              router.push(`/dashboard/products/edit/${productId}`)
            }}>Ver</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CreateCategoryDialog isOpen={descIsOpen} setIsOpen={setDescIsOpen} />
    </div>
  )
}

export default CreateProductForm
