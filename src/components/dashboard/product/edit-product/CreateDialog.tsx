'use client'
import { Button } from '@/components/ui/button'
import { CheckCircleIcon, CircleCheckBig, Pencil, PlusCircleIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProductSku } from '@/interfaces/products/product'
import { createProductSku } from '@/lib/actions/product-skus.actions'
import { DialogDescription } from '@radix-ui/react-dialog'
import { useState } from 'react'

function CreateDialog({ productId }: { productId: number }) {
  const [isCreated, setIsCreated] = useState(false)
  return (
    <Dialog onOpenChange={() => { setIsCreated(false) }}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircleIcon className="h-5 w-5" />
          Agregar Variante
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Agregar Variante</DialogTitle>
          {isCreated &&
            <div className='flex space-x-1 items-center'>
              <CircleCheckBig className='w-5 h-5 text-green-500' />
              <p>Variación creada correctamente</p>
            </div>
          }
        </DialogHeader>
        <form id='create-sku-form' action={async (formData: FormData) => {
          console.log(productId)
          const res = await createProductSku(formData, productId)
          //TODO: add visual feedback
          if (!res.error) {
            setIsCreated(true)
          }

        }}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                name='stock'
                type='number'
                id="stock"
                className="col-span-3"
                required
                min={0}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <Input
                name='color'
                id="color"
                className="col-span-3"
                required
                type='text'
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Talle
              </Label>
              <Input
                name='size'
                id="size"
                type='text'
                className="col-span-3"
                required
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form='create-sku-form'>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateDialog
