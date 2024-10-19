'use client'
import { HeartIcon } from "lucide-react";
import CantidadSelect from "./Select";
import { useState, useEffect } from "react";
import { addToCart } from "@/queries/cart.api";
import { ProductSku } from "@/interfaces/products/Product";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { NoStockAlertDialog } from "./NoStockAlert";
import { NotLoggedInAlertDialog } from "./NotLoggedInAltert";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { addToCartAction } from "@/lib/actions/cart-actions";

interface ProductOptionsProps {
  productId: number;
  userId: number;
  productSkus: ProductSku[];
}

function ProductForm({ productId, productSkus }: ProductOptionsProps) {
  const [quantity, setQuanity] = useState(1)
  const [isFavorite, setIsFavorite] = useState(false)
  const [size, setSize] = useState(productSkus[0].size)
  const [color, setColor] = useState(productSkus[0].color)
  const [isOpenNS, setIsOpenNS] = useState(false)
  const [isOpenNL, setIsOpenNL] = useState(false)
  const { toast } = useToast()


  const [selectedPSku, setSelectedPSku] = useState(productSkus[0])

  useEffect(() => {
    let sPsku = productSkus.find((productSku) => {
      return productSku.size === size && productSku.color === color
    })
    if (sPsku) {
      setSelectedPSku(sPsku)
    } else {
      alert("ERROR FATAL??? XD")
    }
  }, [size, color])



  return (
    <>
      <div className="flex flex-row gap-2 mt-2">
        <div className="basis-5/6 border border-black">
          <CantidadSelect setValue={setQuanity} />
        </div>
        <button
          className="border border-black basis-1/6 flex justify-center py-1 px-1"
          onClick={() => {
            setIsFavorite(!isFavorite)
          }}
        >
          {isFavorite
            ? <HeartIcon className="w-6 h-6 fill-red-500 text-red-500" />
            : <HeartIcon className="w-6 h-6 hover:text-red-600 " />
          }
        </button>
      </div>

      <div id="details" className="flex flex-col divide-y">
        <div className="py-2">
          <h1 className="font-semibold text-lg py-2 px-2">Size:</h1>
          <RadioGroup value={size} onChange={setSize}>
            {productSkus
              .filter((productSku, idx, self) =>
                idx === self.findIndex(pSku => pSku.size === productSku.size)
              )
              .map((productSku, idx) => (
                <Field key={idx} className="flex items-center gap-2">
                  <Radio
                    value={productSku.size}
                    className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
                  >
                    <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                  </Radio>
                  <Label>{productSku.size}</Label>
                </Field>

              ))}
          </RadioGroup>
        </div>

        <div className="py-2">
          <h1 className="font-semibold text-lg py-2 px-2">Color:</h1>
          <RadioGroup value={color} onChange={setColor}>
            {productSkus
              .filter((productSku, idx, self) =>
                idx === self.findIndex(pSku => pSku.color === productSku.color)
              )
              .map((productSku, idx) => (
                <Field key={idx} className="flex items-center gap-2">
                  <Radio
                    value={productSku.color}
                    className="group flex size-5 items-center justify-center rounded-full border bg-white data-[checked]:bg-blue-400"
                  >
                    <span className="invisible size-2 rounded-full bg-white group-data-[checked]:visible" />
                  </Radio>
                  <Label>{productSku.color}</Label>
                </Field>

              ))}
          </RadioGroup>
        </div>

      </div>
      <h1 className="font-semibold text-lg py-2 px-2">STOCK: {selectedPSku?.quantity}</h1>

      <button
        className='max-w-md w-full px-4 py-2 bg-black text-white mt-2'
        onClick={async () => {
          if (selectedPSku && quantity > selectedPSku.quantity) {
            setIsOpenNS(true)
            return
          }
          //const res = await addToCart(productId, selectedPSku.id, quantity)
          const res = await addToCartAction(productId, selectedPSku.id, quantity) //server action
          console.log(res)
          if (res.error && res.statusCode === 401) {
            setIsOpenNL(true)
            return
          }

          if (res.error && res.statusCode === 409) {
            toast({
              description: (
                <div>
                  <h2 className="font-semibold text-md">
                    <span><XCircleIcon className="h-6 w-6 mr-2 text-white inline" /></span>
                    El producto fue agregado al carrito
                  </h2>
                </div>
              ),
              variant: 'destructive'
            })
            return
          }
          console.log(quantity)
          console.log(size)
          console.log(color)
          toast({
            description: (
              <div>
                <h2 className="font-semibold text-md">
                  <span><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
                  Producto agregado correctamente
                </h2>
              </div>
            ),
          })
        }}
      >
        Agregar al carrito
      </button>
      <p className="text-xs text-gray-600 my-3">Envio gratis a partir de los 100USD</p>

      <NoStockAlertDialog isOpen={isOpenNS} setIsOpen={setIsOpenNS} />
      <NotLoggedInAlertDialog isOpen={isOpenNL} setIsOpen={setIsOpenNL} />
    </>
  )
}

export default ProductForm

