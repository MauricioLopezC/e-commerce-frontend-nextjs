'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Image } from "@/interfaces/products/image"
import { Product, ProductSku } from "@/interfaces/products/product"
import { CircleCheckBig } from "lucide-react"
import { CldImage } from "next-cloudinary"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { deleteImage } from "@/lib/actions/image.actions"
import { KittenImageSrc } from "@/lib/constants"
import UploadImageDialog from "./UploadImageDialog"
import { useToast } from "@/hooks/use-toast"

//TODO: edit product sku images, not implmented in backend yet
//error messages too
function ProductImages({ product, productSkus }: { product: Product, productSkus: ProductSku[] }) {
  const images = product.images
  const skus = productSkus.map(sku => sku.id)

  return (
    <Card
      className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
    >
      <CardHeader>
        <CardTitle>Imágenes del producto</CardTitle>
        <CardDescription>
          Click en las imágenes para ver información adicional
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <MainImageDialog image={images[0]} skus={skus} />
          <div className="grid grid-cols-3 gap-2">
            {
              images.slice(1).map((image, idx) => (
                <SmallImageDialog image={image} skus={skus} key={idx} />
              ))
            }
            <UploadImageDialog skus={skus} productId={product.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SmallImageDialog({ image, skus }: { image: Image, skus: number[] }) {
  const { toast } = useToast()
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CldImage
          alt="Product image"
          className="aspect-square w-full rounded-md object-cover"
          height="84"
          src={image.imgSrc ?? KittenImageSrc}
          width="84"
          priority
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Imagen</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ProductId" className="text-right">
              Id del producto
            </Label>
            <Input
              id="ProductId"
              defaultValue={image.productId}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skus">Sku de la variación</Label>
            <Select>
              <SelectTrigger id="skus" aria-label="Select status" className="col-span-3">
                <SelectValue placeholder={image.productSkuId} defaultValue={image.productSkuId} />
              </SelectTrigger>
              <SelectContent>
                {skus.map((sku, idx) => (
                  <SelectItem value={sku.toString()} key={idx}>{sku}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Guardar</Button>
          <Button
            variant='destructive'
            onClick={async () => {
              console.log(`eliminando imagen con id ${image.id} ${image.productId} ${image.productSkuId}`)
              const { data } = await deleteImage(image.id)
              if (data) {
                toast({
                  variant: "default",
                  title: "Imagen eliminada correctamente",
                })
              }
            }}
          >
            Borrar imagen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


function MainImageDialog({ image, skus }: { image: Image, skus: number[] }) {
  const { toast } = useToast()


  return (
    <Dialog>
      <DialogTrigger asChild>
        <CldImage
          alt="Product image"
          className="aspect-square w-full rounded-md object-cover"
          height="300"
          src={image.imgSrc}
          width="300"
          priority
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Imagen</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ProductId" className="text-right">
              Id del producto
            </Label>
            <Input
              id="ProductId"
              name="productId"
              defaultValue={image.productId}
              className="col-span-3"
              disabled
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skus">Sku de la variación</Label>
            <Select name="productSkuId">
              <SelectTrigger id="skus" aria-label="Select status" className="col-span-3">
                <SelectValue placeholder={image.productSkuId} defaultValue={image.productSkuId} />
              </SelectTrigger>
              <SelectContent>
                {skus.map((sku, idx) => (
                  <SelectItem value={sku.toString()} key={idx}>{sku}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </form>
        <DialogFooter>
          <Button type="submit">Guardar</Button>
          <Button variant='destructive'
            onClick={async () => {
              console.log(`eliminando imagen con id ${image.id} ${image.productId} ${image.productSkuId}`)
              const { data } = await deleteImage(image.id)
              if (data) {
                toast({
                  variant: "default",
                  title: "Imagen Eliminada correctamente",
                })
              }
            }}>Borrar imagen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProductImages
