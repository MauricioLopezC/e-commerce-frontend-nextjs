'use client'
import { Button } from '@/components/ui/button'
import { CircleCheckBig } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ProductSku } from '@/interfaces/products/product'
import { updateProductSku } from '@/lib/actions/product-skus.actions'
import { Dispatch, SetStateAction, useEffect } from 'react'
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
import { useToast } from '@/hooks/use-toast'
import { DialogDescription } from '@radix-ui/react-dialog'

interface EditDialogProps {
  productSku: ProductSku;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

const formSchema = z.object({
  productSkuId: z.coerce.number(),
  quantity: z.coerce.number().int().min(0),
  size: z.string().min(1).max(10),
  color: z.string().min(2).max(50),
})


function EditDialog({ productSku, dialogOpen, setDialogOpen }: EditDialogProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productSkuId: productSku.id,
      quantity: productSku.quantity,
      size: productSku.size,
      color: productSku.color
    }
  })

  useEffect(() => {
    form.reset({
      productSkuId: productSku.id,
      quantity: productSku.quantity,
      size: productSku.size,
      color: productSku.color
    })
  }, [productSku])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const productId = productSku.productId
    const productSkuId = productSku.id
    const { productSku: updatedProductSku } = await updateProductSku(values, productId, productSkuId)
    if (updatedProductSku) {
      toast({
        description: (
          <div>
            <h2 className="font-semibold text-md">
              <span><CircleCheckBig className="h-5 w-5 mr-2 text-green-500 inline" /></span>
              Variante actualizada
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
    <Dialog onOpenChange={setDialogOpen} open={dialogOpen} >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Variación</DialogTitle>
          <DialogDescription>
            Actualiza los datos de la variación
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id='edit-form' onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="productSkuId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>ID</FormLabel>
                    <FormControl>
                      <Input className='col-span-3' disabled {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input className='col-span-3' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='color'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input className='col-span-3'  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='size'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Talle</FormLabel>
                    <FormControl>
                      <Input className='col-span-3'  {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        <DialogFooter>
          <Button type="submit" form='edit-form'>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditDialog
