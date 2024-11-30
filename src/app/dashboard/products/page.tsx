import NotLoggedPage from '@/components/common/notlogged-page'
import ProductsTable from '@/components/dashboard/product/ProductTable'
import { Button } from '@/components/ui/button'
import { isTokenExpired } from '@/lib/jwt-decode'
import { PlusCircle } from 'lucide-react'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { getAllProducts } from '@/lib/actions/product.actions'

async function ProductDashboard() {
  const cookieStore = cookies()
  const token = cookieStore.get('access-token')
  if (!token) return (<NotLoggedPage />)
  if (isTokenExpired(token?.value ?? '')) return (<NotLoggedPage />) //expired session

  const { productsData, error: productsError } = await getAllProducts({})
  if (!productsData) return null

  return (
    <main className=' mt-4 grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-4'>
      <div className='flex items-center'>
        <div className='flex items-center gap-2'>
          <Link href="/dashboard/products/create">
            <Button size="sm" className="h-8 gap-1">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Nuevo Producto
              </span>
            </Button>
          </Link>
        </div>
      </div>
      <ProductsTable products={productsData.products} />
    </main>
  )
}

export default ProductDashboard
