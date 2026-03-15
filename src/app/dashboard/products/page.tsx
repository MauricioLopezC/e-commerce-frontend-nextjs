import ProductsTable from '@/components/dashboard/product/ProductTable';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import { getAllProducts } from '@/lib/actions/product.actions';
import { PaginationWithLinks } from '@/components/ui/paginations-with-links';
import { parseQueryNumber } from '@/lib/parse-query';
import { BreadcrumbUpdater } from '@/components/dashboard/BreadcrumbUpdater';

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ProductDashboard({ searchParams }: ProductsPageProps) {
  const filters = await searchParams;
  const pageSize = parseQueryNumber(filters.limit, 10);
  const currentPage = parseQueryNumber(filters.page, 1);

  const { data: productsData, error } = await getAllProducts(filters);
  console.log(productsData, error);
  if (!productsData) return null;

  return (
    <>
      <BreadcrumbUpdater
        items={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Productos', href: '/dashboard/products' },
        ]}
      />
      <main className="mt-4 flex flex-col gap-2 p-4 sm:px-6 sm:py-0 mb-4">
        <div className="flex items-center">
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
    </>
  );
}

export default ProductDashboard;
