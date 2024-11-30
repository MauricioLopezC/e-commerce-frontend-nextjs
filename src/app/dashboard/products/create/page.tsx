'use client'
import ProductDetailsV2 from '@/components/dashboard/product/create/ProductDetailsV2'
import { Button } from '@/components/ui/button'
import { createProductSkus, createProductV2 } from '@/lib/actions/product.actions'
import ProductVariantsV2 from '@/components/dashboard/product/create/ProductVariantsV2'
import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CircleCheckBig } from 'lucide-react'
import { useRouter } from 'next/navigation'

function CreateProductPage() {
  //TODO: use zod to validate image input in ProductVariantsV2 component
  const [errorMessage, setErrorMessage] = useState('')
  const [isCreated, setIsCreated] = useState(false)
  const router = useRouter()
  const [productId, setProductId] = useState(0)

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-16'>
      <form
        className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4' action={async (formData: FormData) => {
          const res = await createProductV2(formData);
          console.log(res)
          if ('error' in res && res.statusCode === 400) {
            setErrorMessage(res.message.toString())
            return
          }

          if ('name' in res) {
            const resPK = await createProductSkus(formData, res)
            console.log(resPK)
            setIsCreated(true)
            setProductId(res.id)
          }
        }}>

        <div className="hidden items-center gap-2 md:ml-auto md:flex">
          <Button variant="outline" size="sm">
            Cancelar
          </Button>
          <Button type='submit' size="sm">Crear Producto</Button>
        </div>

        <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"'>
          {/* product details and stock */}
          <div className='grid auto-rows-max items-start gap-4 lg:col-span-3 lg:gap-8 w-full'>

            <ProductDetailsV2 />

            <ProductVariantsV2 />

          </div>

          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">Cancelar</Button>
            <Button size="sm">Guardar</Button>
          </div>

        </div>
      </form>
      <Dialog open={isCreated} >
        <DialogContent className="sm:max-w-[425px]">
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
