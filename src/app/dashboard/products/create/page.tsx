'use client'
import ProductDetailsV2 from '@/components/dashboard/product/create/ProductDetailsV2'
import { Button } from '@/components/ui/button'
import { createProduct, createProductAndVariations, createProductSku, uploadImage } from '@/lib/actions/product.actions'
import { useState } from 'react'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
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
  category: z.string().min(2).max(100).toLowerCase(),
  sex: z.string().min(2).max(100),
  description: z.string().min(2).max(100),
  variations: z.array(pVariationsSchema).min(1)
})

function CreateProductPage() {
  const [isCreated, setIsCreated] = useState(false)
  const router = useRouter()
  const [productId, setProductId] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      price: 0,
      category: '',
      sex: '',
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
    const { createdProduct, error: productError } = await createProduct(rest)
    if (!createdProduct) return null
    const productId = createdProduct.id
    console.log(createdProduct)

    for (let variation of variations) {
      const { createdProductSku, error: productSkuError } = await createProductSku({
        size: variation.size,
        color: variation.color,
        quantity: variation.stock
      }, productId)
      console.log(createdProductSku, productSkuError)

      if (!createdProductSku) return null

      const imageData = new FormData()
      imageData.append('file', variation.image)
      imageData.append('productId', productId.toString())
      imageData.append('productSkuId', createdProductSku.id.toString())
      const { createdImage, error: imageError } = await uploadImage(imageData)
      console.log(createdImage, imageError)
      if (!createdImage) return null
    }
    setProductId(productId)
    setIsCreated(true)
    setIsLoading(false)
  }

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-16 mt-4'>
      <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-2'>
        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Cancelar
          </Button>
          {isLoading ?
            <Button disabled>
              <Loader2 className="animate-spin" />
              Subiendo
            </Button>
            : <Button type='submit' size="sm" form='create-product-form'>Crear Producto</Button>
          }
        </div>

        <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"'>
          <div className='grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8 w-full'>
            <Form {...form}>
              <form
                id='create-product-form'
                className="space-y-8"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <ProductDetailsV2 form={form} />
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
          </div>
        </div>
      </div>
      <Dialog open={isCreated} >
        <DialogContent className="sm:max-w-[425px]" >
          <DialogHeader>
            <DialogTitle>
              <div className='flex space-x-1 items-center'>
                <CircleCheckBig className='w-5 h-5 text-green-500' />
                <p>Producto creado correctamente</p>
              </div>
            </DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button onClick={() => {
              router.push(`/dashboard/products/edit/${productId}`)
            }}>Ver</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}

export default CreateProductPage
