'use client'
import { Button } from '@/components/ui/button'
import { CircleCheckBig, PlusCircleIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { DialogDescription } from '@radix-ui/react-dialog'
import { createProductSku } from '@/lib/actions/product-skus.actions'
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

const formSchema = z.object({
  quantity: z.coerce.number().int().min(0),
  size: z.string().min(1).max(10),
  color: z.string().min(2).max(50),
})

function CreateDialog({ productId }: { productId: number }) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quantity: 0,
      size: '',
      color: '',
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const { createdProductSku } = await createProductSku(values, productId)
    if (createdProductSku) {
      toast({
        description: (
          <div>
            <h2 className="font-semibold text-md">
              <span><CircleCheckBig className="h-5 w-5 mr-2 text-green-500 inline" /></span>
              Variante creada
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
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircleIcon className="h-5 w-5" />
          Agregar Variante
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Variante</DialogTitle>
          <DialogDescription>Nueva variante para el producto</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form id='create-sku-form' onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 py-4">
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
          <Button type="submit" form='create-sku-form'>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateDialog
