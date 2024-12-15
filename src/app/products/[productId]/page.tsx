//import CarouselCustom from "@/components/product-page/Carousel"
import { StarIcon } from "@heroicons/react/24/solid"
import ProductForm from "@/components/product-page/ProductForm"
import ProductDisclosure from "@/components/product-page/Disclosure"
import { getProductSkus } from "@/queries/products.api"
import { peso } from "@/lib/constants"
import { getProduct } from "@/lib/actions/product.actions"
import FeaturesList from "@/components/home/Features"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Carousel from "@/components/product-page/CarouselCustomV2"

async function ProductPage({ params }: { params: { productId: string } }) {
  //NOTE: params.productId could be NaN, nullish coalescing operator only works
  //with undefinded and null and || operator with falsy and truthy 

  let productId = Number(params.productId) || 1
  const { product } = await getProduct(productId)
  const productSkus = await getProductSkus(productId)
  if (!product) return null

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <main>
          <Breadcrumb className="mt-2">
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
                <BreadcrumbPage>{product.name.toLowerCase()}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <section className="lg:flex lg:mt-2 lg:gap-6">
            <Carousel images={product.images} />
            <div className="mt-2 max-w-md w-full">
              <div className="flex justify-between">
                <p className="font-bold text-lg">{product.name.toUpperCase()}</p>
                <p className="font-bold text-lg">{peso.format(product.price)}</p>
              </div>
              <div className="flex">
                <StarIcon className="w-6 h-6 text-yellow-400" />
                <StarIcon className="w-6 h-6 text-yellow-400" />
                <StarIcon className="w-6 h-6 text-yellow-400" />
                <StarIcon className="w-6 h-6" />
                <StarIcon className="w-6 h-6" />
              </div>
              <ProductForm productId={productId} productSkus={productSkus} />
              <div className="mt-6 w-full">
                <ProductDisclosure title="Descripción" content={product.description} />
              </div>
            </div>
          </section>
        </main>
      </div>
      <div className="my-16">
        <FeaturesList />
      </div>
    </div>
  )
}

export default ProductPage
