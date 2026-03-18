import ProductCard from '@/components/ProductCard';
import { getAllProducts } from '@/lib/actions/product.actions';
import { getAllCategories } from '@/lib/actions/category.actions';
import { PaginationWithLinks } from '@/components/ui/paginations-with-links';
import FeaturesList from '@/components/home/Features';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  FiltersMenu,
  OrderByMenu,
} from '@/components/product-catalog-page/FiltersAndSorting';
import { parseQueryNumber } from '@/lib/parse-query';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Products page',
};

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filters = await searchParams;
  const pageSize = parseQueryNumber(filters.limit, 10);
  const currentPage = parseQueryNumber(filters.page, 1);

  const [{ data: productsData }, { data: categories }] = await Promise.all([
    getAllProducts({
      ...filters,
      limit: pageSize,
      page: currentPage,
    }),
    getAllCategories(),
  ]);
  return (
    <section className="mt-6 ">
      <Breadcrumb className="ml-8 lg:ml-16">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products?limit=9">Productos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {filters.sex
                ?.toString()
                .charAt(0)
                .toUpperCase()
                .concat(filters.sex?.toString().slice(1)) ?? 'Todo'}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-bold text-xl flex justify-center items-center">
        PRODUCTOS
      </h1>
      {/* products section */}
      <div className="w-fit mx-auto mt-10 mb-5">
        <div className="flex gap-4 mb-4">
          <FiltersMenu categories={categories ?? []} />
          <OrderByMenu />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-8">
          {productsData?.products.length === 0 ? (
            <div className="col-span-full flex justify-center items-center min-h-[300px]">
              <p className="text-muted-foreground">
                No hay productos disponibles
              </p>
            </div>
          ) : (
            productsData?.products.map((product) => (
              <ProductCard
                id={product.id}
                title={product.name}
                price={product.price}
                imgSrc={product.images[0]?.imgSrc}
                key={product.id}
              />
            ))
          )}
        </div>
        <div className="mt-4">
          <PaginationWithLinks
            page={currentPage}
            pageSize={pageSize}
            totalCount={productsData?.metadata._count ?? 0}
          />
        </div>
      </div>
      <div className="my-16">
        <FeaturesList />
      </div>
    </section>
  );
}

export default ProductsPage;
