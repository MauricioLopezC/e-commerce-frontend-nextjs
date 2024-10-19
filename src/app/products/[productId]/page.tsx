import CarouselCustom from "@/components/product-page/Carousel"
import { StarIcon } from "@heroicons/react/24/solid"
import ProductForm from "@/components/product-page/ProductForm"
import ProductDisclosure from "@/components/product-page/Disclosure"
import { getProduct, getProductSkus } from "@/queries/products.api"


async function ProductPage({ params }: { params: { productId: string } }) {
  const productId = Number(params.productId)
  const product = await getProduct(productId)
  const productSkus = await getProductSkus(productId)

  return (
    <section className="mb-20 lg:flex lg:justify-center lg:mt-6 lg:gap-16 mx-auto container">
      <div className="">
        <CarouselCustom images={product.images} />
      </div>

      <div id="group2" className="px-2 mt-2 max-w-md w-full">
        <div className="flex justify-between">
          <p className="font-bold text-lg">{product.name.toUpperCase()}</p>
          <p className="font-bold text-lg">${product.price} ARS</p>
        </div>

        <div className="flex">
          <StarIcon className="w-6 h-6 text-yellow-400" />
          <StarIcon className="w-6 h-6 text-yellow-400" />
          <StarIcon className="w-6 h-6 text-yellow-400" />
          <StarIcon className="w-6 h-6" />
          <StarIcon className="w-6 h-6" />
        </div>
        <ProductForm productId={productId} productSkus={productSkus} userId={1} />

        <div className="mt-6 w-full">
          <ProductDisclosure title="DESCRIPTION" content={product.description} />
        </div>
      </div>
    </section>

  )
}

export default ProductPage
