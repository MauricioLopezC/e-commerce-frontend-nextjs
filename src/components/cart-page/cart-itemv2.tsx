'use client'
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Minus, Plus, X } from "lucide-react";
import { CartItem } from "@/interfaces/cart-item/cart";
import { Badge } from "../ui/badge";
import { KittenImageSrc, peso } from "@/lib/constants";
import { CldImage } from "next-cloudinary";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { deleteCartItem, updateCartItemQuantity } from "@/lib/actions/cart.actions";

function CartItemCard({ cartItem }: { cartItem: CartItem }) {
  const [quantity, setQuantity] = useState(cartItem.quantity)
  const { toast } = useToast()

  async function onUpdateQuantity(newQuantity: number) {
    const { cartItem: updatedCartItem, error } = await updateCartItemQuantity(newQuantity, cartItem.id, cartItem.cartId)
    if (error) {
      if (error.statusCode === 409) {
        toast({
          variant: 'destructive',
          title: "No hay suficiente stock",
        })
        return
      }
      toast({
        variant: 'destructive',
        title: "Error al actulizar",
        description: "Intente nuevamente más tarde"
      })
      return
    }

    toast({
      variant: 'default',
      title: "Actulizado correctamente",
      description: `Ahora tiene una catidad de ${updatedCartItem?.quantity}`
    })
    setQuantity(newQuantity)
    return
  }

  async function onDeleteButton() {
    const { cartItem: deletedCartItem, error } = await deleteCartItem(cartItem.cartId, cartItem.id)
    if (error) {
      console.log(error)
      toast({
        variant: 'destructive',
        title: "Error al eliminar el producto del carrito",
      })
      return
    }
    if (deletedCartItem) {
      toast({
        variant: 'default',
        title: "eliminado correctamente",
      })
      return
    }
  }

  return (
    <Card className="overflow-hidden hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="flex items-center gap-4 p-4">
          {/* Product Image */}
          <div className="relative w-24 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
            <CldImage
              src={cartItem.product.images[0].imgSrc ?? KittenImageSrc}
              alt={cartItem.product.name}
              priority={true}
              className="object-cover"
              width="400"
              height="500"
              crop={{
                type: 'auto',
                source: true
              }}
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">{cartItem.product.name}</h3>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-500 p-1 h-auto" onClick={() => onDeleteButton()}>
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="flex items-center gap-3 mb-3">
              <Badge variant="outline" className="text-xs">
                {cartItem.productSku.color}
              </Badge>
              <Badge variant="outline" className="text-xs">
                {cartItem.productSku.size}
              </Badge>
            </div>

            <div className="flex items-center justify-between">
              {/* Quantity Controls */}
              <div className="flex items-center border rounded-lg">
                {quantity > 1 &&
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    onClick={() => { onUpdateQuantity(quantity - 1) }}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                }
                {quantity === 1 &&
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-gray-100"
                    disabled
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                }

                <span className="w-12 text-center text-sm font-medium">{cartItem.quantity}</span>
                <Button
                  variant="ghost" size="sm"
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                  onClick={() => { onUpdateQuantity(quantity + 1) }}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>

              {/* Price */}
              <div className="text-right">
                <p className="font-bold text-gray-900">{peso.format(cartItem.product.price)}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default CartItemCard

