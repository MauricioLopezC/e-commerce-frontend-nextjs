'use client'
import { Button } from '@/components/ui/button'
import { CircleCheckBig, Pencil } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ProductSku } from '@/interfaces/products/product'
import { editProductSku } from '@/lib/actions/product-skus.actions'
import { useState } from 'react'

function EditDialog({ productSku }: { productSku: ProductSku }) {

  const [isCreated, setIsCreated] = useState(false)
  return (
    <Dialog onOpenChange={() => { setIsCreated(false) }}>
      <DialogTrigger asChild>
        <Button variant='secondary'><Pencil className='w-4 h-4' /></Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Variación</DialogTitle>
          {isCreated &&
            <div className='flex space-x-1 items-center'>
              <CircleCheckBig className='w-5 h-5 text-green-500' />
              <p>Variación editada correctamente</p>
            </div>
          }
        </DialogHeader>
        <form id='edit-form' action={async (formData: FormData) => {
          const productId = productSku.productId
          const productSkuId = productSku.id
          const res = await editProductSku(formData, productId, productSkuId)
          console.log(res)
          if (!res.error) {
            setIsCreated(true)
          }
        }}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productSku" className="text-right">
                SKU
              </Label>
              <Input
                id="productSku"
                name='productSkuId'
                defaultValue={productSku.id}
                className="col-span-3"
                disabled
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                Stock
              </Label>
              <Input
                name='stock'
                id="stock"
                defaultValue={productSku.quantity}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <Input
                name='color'
                id="color"
                defaultValue={productSku.color}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="size" className="text-right">
                Talle
              </Label>
              <Input
                name='size'
                id="size"
                defaultValue={productSku.size}
                className="col-span-3"
              />
            </div>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit" form='edit-form'>Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditDialog
