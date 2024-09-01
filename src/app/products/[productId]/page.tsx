import CarouselCustom from "@/components/product-page/Carousel"
import { StarIcon } from "@heroicons/react/24/solid"
import { Product, ProductSku } from "@/interfaces/products/Product"
import ProductOptions from "@/components/product-page/ProductOptions"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

async function getProduct(id: number): Promise<Product> {
  const res = await fetch(`http://localhost:3000/products/${id}`, {
    method: 'GET',
  })
  return res.json()
}

async function getProductSkus(id: number): Promise<ProductSku[]> {
  const res = await fetch(`http://localhost:3000/products/${id}/product-skus`, {
    method: 'GET',
  })
  return res.json()
}

async function ProductPage({ params }: { params: { productId: string } }) {
  const productId = Number(params.productId)
  const product = await getProduct(productId)
  const productSkus = await getProductSkus(productId)
  //TODO: add state ProductSku selected to save productSku combination selected

  return (
    <section className="mb-20 lg:flex lg:justify-center lg:mt-6 lg:gap-16 mx-auto container">
      <div className="">
        <CarouselCustom images={product.images} />
      </div>

      <div id="group2" className="px-2 mt-2 max-w-md">
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

        <ProductOptions productId={product.id} userId={1} />
        <p className="text-xs text-gray-600 my-3">Envio gratis a partir de los 100USD</p>
        <div id="details" className="flex flex-col divide-y">
          <h1 className="font-semibold text-lg py-2 px-2">DISPONIBLES: {productSkus[0].quantity}</h1>
          <div className="py-2">
            <ToggleGroup type="single">
              <h1 className="font-semibold text-lg py-2 px-2">Size:</h1>
              {productSkus
                .filter((productSku, idx, self) =>
                  idx === self.findIndex(pSku => pSku.size === productSku.size)
                )
                .map((productSku) => (
                  <ToggleGroupItem
                    value={productSku.size}
                    className="border border-gray-500/50"
                    key={productSku.id}>{productSku.size}</ToggleGroupItem>
                ))}
            </ToggleGroup>
          </div>
          <div className="py-2">
            <ToggleGroup type="single">
              <h1 className="font-semibold text-lg py-2 px-2">Color:</h1>
              {productSkus
                .filter((productSku, idx, self) =>
                  idx === self.findIndex(pSku => pSku.color === productSku.color)
                )
                .map((productSku) => (
                  <ToggleGroupItem
                    value={productSku.color}
                    className="border border-gray-500/50"
                    key={productSku.id}>{productSku.color}</ToggleGroupItem>
                ))}
            </ToggleGroup>
          </div>
        </div>

        <div className="mt-6">
          <h1 className="font-bold text-lg">DESCRIPCION</h1>
          <p>{product.description}</p>
        </div>
      </div>
    </section>

  )
}

export default ProductPage
