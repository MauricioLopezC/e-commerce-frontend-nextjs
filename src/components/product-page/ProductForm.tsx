'use client'
import { HeartIcon, TrashIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { ProductSku } from "@/interfaces/products/product";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { NoStockAlertDialog } from "./NoStockAlert";
import { NotLoggedInAlertDialog } from "./NotLoggedInAltert";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { addCartItem } from "@/lib/actions/cart.actions";
import { addFavorite, deleteFavorite, getFavorites } from "@/lib/actions/favorites.actions";
import { checkSession } from "@/lib/actions/navbar.actions";
import { Favorite } from "@/interfaces/favorites";
import CantidadSelectV2 from "./SelectV2";
import { Button } from "../ui/button";

interface ProductOptionsProps {
  productId: number;
  productSkus: ProductSku[];
}

function ProductForm({ productId, productSkus }: ProductOptionsProps) {
  //TODO: FIX productForm!!!
  const [quantity, setQuanity] = useState(1)
  const [size, setSize] = useState(productSkus[0].size)
  const [color, setColor] = useState(productSkus[0].color)
  const [isOpenNS, setIsOpenNS] = useState(false)
  const [isOpenNL, setIsOpenNL] = useState(false)
  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState(false)
  const [favorite, setFavorite] = useState<Favorite | null>()

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

  useEffect(() => {
    const checkFavorite = async () => {
      const session = await checkSession()
      if (session) {
        const { favorites, error } = await getFavorites()
        const favoriteFound = favorites?.find((favorite) => {
          return favorite.productId === productId;
        })
        if (favoriteFound) {
          setIsFavorite(true)
          setFavorite(favoriteFound)
        }
      }
      return
    }
    checkFavorite()
  }, [])

  async function onFavoriteClick() {
    const isFavoriteValue = !isFavorite
    setIsFavorite(!isFavorite)
    if (isFavoriteValue) {
      const { favorite, error } = await addFavorite(productId)
      console.log(favorite, error)
      if (favorite) {
        setFavorite(favorite)
        toast({
          description: (
            <div>
              <h2 className="font-semibold text-md">
                <span><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
                Producto agregado a favoritos
              </h2>
            </div>
          ),
        })
      }
    }
    if (!isFavoriteValue && favorite) {
      const { favorite: deletedFavorite, error } = await deleteFavorite(favorite.id)
      if (deletedFavorite) {
        setFavorite(null)
        toast({
          description: (
            <div>
              <h2 className="font-semibold text-md">
                <span><TrashIcon className="h-6 w-6 mr-2 text-red-500 inline" /></span>
                Producto eliminado de favoritos
              </h2>
            </div>
          ),
        })
      }
    }
  }

  async function onAddToCartClick() {
    if (selectedPSku && quantity > selectedPSku.quantity) {
      setIsOpenNS(true)
      return
    }
    //const res = await addToCart(productId, selectedPSku.id, quantity)
    const { cartItem, error } = await addCartItem(productId, selectedPSku.id, quantity)
    console.log(cartItem, error)
    if (error && error.statusCode === 401) {
      setIsOpenNL(true)
      return
    }

    if (error && error.statusCode === 409) {
      toast({
        description: (
          <div>
            <h2 className="font-semibold text-md">
              <span><XCircleIcon className="h-6 w-6 mr-2 text-white inline" /></span>
              El producto ya fue agregado al carrito
            </h2>
          </div>
        ),
        variant: 'destructive'
      })
      return
    }
    console.log({ quantity, size, color })
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
  }

  return (
    <>
      <div className="flex flex-row gap-2 mt-2 justify-between">
        <div className="basis-5/6">
          <CantidadSelectV2 setValue={setQuanity} />
        </div>
        <Button
          className="basis-1/6"
          variant='outline'
          size='icon'
          onClick={onFavoriteClick}
        >
          {isFavorite
            ? <HeartIcon className="w-5 h-5 fill-red-500 text-red-500" />
            : <HeartIcon className="w-5 h-5 hover:text-red-600 " />
          }
        </Button>
      </div>

      <div id="details" className="flex flex-col divide-y">
        <div className="py-2">
          <h1 className="font-semibold text-lg py-2 px-2">Talle:</h1>
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
                    disabled
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

      <Button
        className='max-w-md w-full px-4 py-2 bg-black text-white mt-2'
        onClick={onAddToCartClick}
      >
        Agregar al carrito
      </Button>
      <p className="text-xs text-gray-600 my-3">Envío gratuito en pedidos superiores a $100.000,00</p>
      <NoStockAlertDialog isOpen={isOpenNS} setIsOpen={setIsOpenNS} />
      <NotLoggedInAlertDialog isOpen={isOpenNL} setIsOpen={setIsOpenNL} />
    </>
  )
}

export default ProductForm

