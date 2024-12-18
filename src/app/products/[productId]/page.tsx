import { StarIcon } from "@heroicons/react/24/solid"
import ProductForm from "@/components/product-page/ProductForm"
import { peso } from "@/lib/constants"
import { getAllProducts, getProduct } from "@/lib/actions/product.actions"
import FeaturesList from "@/components/home/Features"
import Carousel from "@/components/product-page/CarouselCustomV2"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Link from "next/link"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import ProductCard from "@/components/ProductCard"
import { Product } from "@/interfaces/products/product"
import ProductPageBreadCrumbs from "@/components/product-page/ProductPageBreadCrumbs"
import { getAllProductsSkus } from "@/lib/actions/product-skus.actions"

async function ProductPage({ params }: { params: { productId: string } }) {
  //NOTE: params.productId could be NaN, nullish coalescing operator only works
  //with undefinded and null and || operator with falsy and truthy 

  let productId = Number(params.productId) || 1
  const { product } = await getProduct(productId)
  const { productSkus } = await getAllProductsSkus(productId)
  if (!product || !productSkus) return null

  const { productsData } = await getAllProducts({
    limit: 5
  })
  if (!productsData) return null

  return (
    <main className="container mx-auto px-4 lg:px-24 mb-16">
      <ProductPageBreadCrumbs productName={product.name} />
      <div className="grid gap-8 md:grid-cols-2">
        {/* Product Images */}
        <Carousel images={product.images} />
        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <p className="font-bold text-2xl tracking-tight">{product.name.toUpperCase()}</p>
            <p className="font-bold text-2xl mt-2">{peso.format(product.price)}</p>
          </div>
          <div className="flex">
            <StarIcon className="w-6 h-6 text-yellow-400" />
            <StarIcon className="w-6 h-6 text-yellow-400" />
            <StarIcon className="w-6 h-6 text-yellow-400" />
            <StarIcon className="w-6 h-6" />
            <StarIcon className="w-6 h-6" />
          </div>
          <ProductForm productId={productId} productSkus={productSkus} />
          <Accordion className="w-full" type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Descripción</AccordionTrigger>
              <AccordionContent>
                {product.description}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Replace this section with may also like section */}
      <section className="mt-14">
        <div className="flex justify-between py-2">
          <h2 className="font-bold">Nuevos</h2>
          <Link href='/products' className="text-gray-600">MAS</Link>
        </div>

        <ScrollArea className="mb-16 whitespace-nowrap rounded-md border">
          <div className="flex w-max space-x-6 p-4">
            {productsData?.products.map((product: Product, idx: number) => (
              <ProductCard key={idx} id={product.id} price={product.price} title={product.name} imgSrc={product.images[0].imgSrc} />
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </section>

      <div className="mt-16">
        <FeaturesList />
      </div>

    </main>
  )
}

export default ProductPage
