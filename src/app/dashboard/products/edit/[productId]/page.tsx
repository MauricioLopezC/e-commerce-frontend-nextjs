import ProductDetails from "@/components/dashboard/product/edit-product/ProductDetails";
import ProductImages from "@/components/dashboard/product/edit-product/ProductImages";
import ProductVariantsCard from "@/components/dashboard/product/edit-product/ProductVariantsCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { getAllProductsSkus } from "@/lib/actions/product-skus.actions";
import { getProduct } from "@/lib/actions/product.actions";
import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

async function EditProductPage({
  params,
}: {
  params: { productId: string };
}) {
  const productId = Number(params.productId);

  if (!productId) return null;

  const { product } = await getProduct(productId)
  const { productSkus } = await getAllProductsSkus(productId)
  if (!product || !productSkus) return null

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-16 mt-4">
      <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
        <div className="flex items-center gap-4">
          <Link href='/dashboard/products'>
            <Button variant="outline" size="icon" className="h-7 w-7">
              <ChevronLeftIcon className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </Button>
          </Link>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {product.name.toUpperCase()}
          </h1>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Link href="/dashboard/products"
              className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              Cancelar
            </Link>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"'>
          {/* product details and stock */}
          <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 w-full">
            <ProductDetails product={product} />
            <ProductVariantsCard productSkus={productSkus} />
          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <ProductImages product={product} productSkus={productSkus} />
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Link href="/dashboard/products"
              className={buttonVariants({ variant: 'outline', size: 'sm' })}>
              Cancelar</Link>
            <Button size="sm">Guardar</Button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default EditProductPage;
