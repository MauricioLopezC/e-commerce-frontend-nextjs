import ProductsTable from '@/components/dashboard/product/ProductTable'
import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import Link from 'next/link'
import { getAllProducts } from '@/lib/actions/product.actions'
import { PaginationWithLinks } from '@/components/ui/paginations-with-links'

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ProductDashboard({ searchParams }: ProductsPageProps) {

  const filters = await searchParams
  const pageSize = Number(filters.limit ?? 10)
  const currentPage = Number(filters.page ?? 1)

  const { productsData } = await getAllProducts(filters)
  if (!productsData) return null

  return (
    <main className='mt-4 flex flex-col gap-2 p-4 sm:px-6 sm:py-0 mb-4'>
      <div className='flex items-center'>
        <Link href="/dashboard/products/create">
          <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Nuevo Producto
            </span>
          </Button>
        </Link>
      </div>
      <ProductsTable products={productsData.products} />
      <div className="">
        <PaginationWithLinks
          page={currentPage}
          pageSize={pageSize}
          totalCount={productsData.metadata._count}
        />
      </div>
    </main>
  )
}

export default ProductDashboard
