import ProductsTable from '@/components/dashboard/product/ProductTable'
import { Button } from '@/components/ui/button'
import { getProducts } from '@/queries/products.api'
import { File, PlusCircle } from 'lucide-react'
import Link from 'next/link'

async function ProductDashboard() {
  const products = await getProducts(20)
  return (
    <main className='sm:ml-16 mt-8 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8'>
      <div className='flex items-center'>
        <div className='flex items-center gap-2'>
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Exportar
            </span>
          </Button>
          <Link className="h-8 gap-1" href="/dashboard/products/create">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Agregar un producto
            </span>
          </Link>
        </div>
      </div>

      <ProductsTable products={products} />


    </main>
  )
}

export default ProductDashboard
