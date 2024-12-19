'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Image } from "@/interfaces/products/image"
import { Product, ProductSku } from "@/interfaces/products/product"
import { CircleCheckBig, Loader2, Upload } from "lucide-react"
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
import { deleteImage, uploadImage } from "@/lib/actions/image.actions"
import { useState } from "react"

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
            <UploadButtonDialog skus={skus} productId={product.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SmallImageDialog({ image, skus }: { image: Image, skus: number[] }) {
  const [isDeleted, setIsDeleted] = useState(false)
  return (
    <Dialog onOpenChange={() => {
      setIsDeleted(false)
    }}>
      <DialogTrigger asChild>
        <CldImage
          alt="Product image"
          className="aspect-square w-full rounded-md object-cover"
          height="84"
          src={image.imgSrc}
          width="84"
          priority
        />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Imagen</DialogTitle>
          <DialogDescription>
            {isDeleted &&
              <div className='flex space-x-1 items-center'>
                <CircleCheckBig className='w-5 h-5 text-green-500' />
                <p>Imagen eliminada</p>
              </div>
            }</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          action={async () => {
            console.log("EDITANDO")
          }}
        >
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
              const res = await deleteImage(image.id, image.productId)
              console.log(res)
              if (res.result === 'ok') {
                setIsDeleted(true)
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

function UploadButtonDialog({ skus, productId }: { skus: number[], productId: number }) {
  const [isCreated, setIsCreated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  return (
    <Dialog onOpenChange={() => {
      setIsCreated(false)
      setIsLoading(false)
    }}>
      <DialogTrigger asChild>
        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-description="upload image" aria-describedby="upload">
        <DialogHeader>
          <DialogTitle>Subir Imagen</DialogTitle>
          {isCreated &&
            <div className='flex space-x-1 items-center'>
              <CircleCheckBig className='w-5 h-5 text-green-500' />
              <p>Imagen subida correctamente</p>
            </div>
          }
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          id="upload-image"
          action={async (formData: FormData) => {
            setIsLoading(true)
            formData.append('productId', productId.toString())
            const { createdImage, error } = await uploadImage(formData)
            console.log(createdImage, error)
            setIsCreated(true)
            setIsLoading(false)
          }}
        >
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skus">Sku de la variación</Label>
            <Select required name="productSkuId">
              <SelectTrigger id="skus" aria-label="Select status" className="col-span-3">
                <SelectValue placeholder="Seleccionar el sku del producto" />
              </SelectTrigger>
              <SelectContent>
                {skus.map((sku, idx) => (
                  <SelectItem value={sku.toString()} key={idx}>{sku}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="image" className="text-right">
              Nueva Imagen
            </Label>
            <Input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="col-span-3"
              required
            />
          </div>
        </form>
        <DialogFooter>
          {!isLoading &&
            <Button type="submit" form="upload-image">Guardar</Button>
          }
          {isLoading &&
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subiendo
            </Button>
          }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function MainImageDialog({ image, skus }: { image: Image, skus: number[] }) {
  const [isDeleted, setIsDeleted] = useState(false)

  return (
    <Dialog onOpenChange={() => { setIsDeleted(false) }}>
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
          <DialogDescription>
            {isDeleted &&
              <div className='flex space-x-1 items-center'>
                <CircleCheckBig className='w-5 h-5 text-green-500' />
                <p>Imagen eliminada</p>
              </div>
            }</DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          action={async () => {

          }}
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
              const res = await deleteImage(image.id, image.productId)
              console.log(res)
              if (res.result === 'ok') {
                setIsDeleted(true)
              }
            }}>Borrar imagen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ProductImages
