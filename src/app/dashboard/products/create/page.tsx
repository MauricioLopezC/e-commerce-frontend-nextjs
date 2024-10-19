'use client'
import ProductDetailsV2 from '@/components/dashboard/product/create/ProductDetailsV2'
import { Button } from '@/components/ui/button'
import { createProductSkus, createProductV2 } from '@/lib/actions/product-actions'
import ProductVariantsV2 from '@/components/dashboard/product/create/ProductVariantsV2'
import { useState } from 'react'
import { useToast } from '@/hooks/use-toast'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

function CreateProductPage() {
  const [errorMessage, setErrorMessage] = useState('')
  const { toast } = useToast()

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-16 mt-16 ml-16'>
      <form
        className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4' action={async (formData: FormData) => {
          const res = await createProductV2(formData);
          console.log(res)
          if ('error' in res && res.statusCode === 400) {
            setErrorMessage(res.message.toString())
            return
          }

          if ('name' in res) {
            console.log('entrando che')
            const resPK = await createProductSkus(formData, res)
            console.log(resPK)
            toast({
              description: (
                <div>
                  <h2 className="font-semibold text-md">
                    <span><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
                    El producto fue creado correctamente
                  </h2>
                </div>
              ),
              variant: 'default'
            })
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
          <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 w-full'>

            <ProductDetailsV2 />

            <ProductVariantsV2 />

          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <h1>IMAGENES XD</h1>
            {errorMessage !== '' &&
              <p>{errorMessage}</p>
            }
          </div>

          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>

        </div>
      </form>
    </main>
  )
}

export default CreateProductPage
