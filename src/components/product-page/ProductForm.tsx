'use client'
import { HeartIcon, TrashIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { ProductSku } from "@/interfaces/products/product";
// import { Field, Label, Radio, RadioGroup } from "@headlessui/react";

import { RadioGroup, RadioGroupItem } from "@/components/origin-ui/radio-group";
import { NoStockAlertDialog } from "./NoStockAlert";
import { NotLoggedInAlertDialog } from "./NotLoggedInAltert";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
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
  const [quantity, setQuanity] = useState(1)
  const [size, setSize] = useState(productSkus[0].size)
  const [color, setColor] = useState<string | undefined>(undefined)
  const [isOpenNS, setIsOpenNS] = useState(false)
  const [isOpenNL, setIsOpenNL] = useState(false)
  const { toast } = useToast()
  const [isFavorite, setIsFavorite] = useState(false)
  const [favorite, setFavorite] = useState<Favorite | null>()
  const order = ["xs", "s", "m", "l", "xl", "xxl", "xxxl"];

  const [selectedPSku, setSelectedPSku] = useState<ProductSku | null>(productSkus[0])
  useEffect(() => {
    let sPsku = productSkus.find((productSku) => {
      return productSku.size === size && productSku.color === color
    })
    if (sPsku) {
      setSelectedPSku(sPsku)
    } else {
      setSelectedPSku(null)
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
    if (selectedPSku === null) return null
    console.log(color, size, selectedPSku)
    if (selectedPSku && quantity > selectedPSku.quantity) {
      setIsOpenNS(true)
      return
    }
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

      <div id="details" className="flex flex-col  mt-4 space-y-4">
        <fieldset className="space-y-4">
          <legend className="text-sm font-medium leading-none text-foreground">Talle</legend>
          <RadioGroup className="grid grid-cols-3 gap-2" value={size} onValueChange={setSize}>
            {/*HACK: find a way to avoid sorting two times the array, checking if array is only numeric or contains strings*/}
            {productSkus
              .filter((productSku, idx, self) =>
                idx === self.findIndex(pSku => pSku.size === productSku.size)
              )
              .sort((a, b) => {
                return Number(a.size) - Number(b.size)
              })
              .sort((a, b) => {
                return order.indexOf(a.size.toLowerCase()) - order.indexOf(b.size.toLowerCase())
              })
              .map((productSku) => (
                <label
                  key={productSku.id}
                  className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                >
                  <RadioGroupItem
                    id={productSku.id.toString()}
                    value={productSku.size}
                    className="sr-only after:absolute after:inset-0"
                  />
                  <p className="text-sm font-medium leading-none text-foreground">{productSku.size.toUpperCase()}</p>
                </label>
              ))}
          </RadioGroup>
        </fieldset>
        <fieldset className="space-y-4">
          <legend className="text-sm font-medium leading-none text-foreground">Color</legend>
          <RadioGroup className="grid grid-cols-3 gap-2" value={color} onValueChange={setColor}>
            {productSkus
              .filter((productSku, idx, self) =>
                idx === self.findIndex(pSku => pSku.color === productSku.color)
              )
              .map((filteredPsku) => {
                let isEnabled = productSkus.some((originalPsku) => originalPsku.size === size && originalPsku.color === filteredPsku.color)
                return (
                  <label
                    key={filteredPsku.id}
                    className="relative flex cursor-pointer flex-col items-center gap-3 rounded-lg border border-input px-2 py-3 text-center shadow-sm shadow-black/5 outline-offset-2 transition-colors has-[[data-disabled]]:cursor-not-allowed has-[[data-state=checked]]:border-ring has-[[data-state=checked]]:bg-accent has-[[data-disabled]]:opacity-50 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-ring/70"
                  >
                    <RadioGroupItem
                      id={filteredPsku.id.toString()}
                      value={filteredPsku.color}
                      className="sr-only after:absolute after:inset-0"
                      disabled={!isEnabled}
                    />
                    <p className="text-sm font-medium leading-none text-foreground">{filteredPsku.color}</p>
                  </label>
                )
              })}
          </RadioGroup>
        </fieldset>
      </div>
      <h1 className="text-sm font-medium leading-none text-foreground mt-4">Stock: {selectedPSku?.quantity}</h1>
      {selectedPSku &&
        <Button
          className='max-w-md w-full px-4 py-2 bg-black text-white mt-2'
          onClick={onAddToCartClick}
        >
          Agregar al carrito
        </Button>
      }
      {!selectedPSku &&
        <Button
          className='max-w-md w-full px-4 py-2 bg-black text-white mt-2'
          disabled
        >
          No disponible
        </Button>
      }
      <p className="text-xs text-gray-600 my-3">Envío gratuito en pedidos superiores a $100.000,00</p>
      <NoStockAlertDialog isOpen={isOpenNS} setIsOpen={setIsOpenNS} />
      <NotLoggedInAlertDialog isOpen={isOpenNL} setIsOpen={setIsOpenNL} />
    </>
  )
}

export default ProductForm

