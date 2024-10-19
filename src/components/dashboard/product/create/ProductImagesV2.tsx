'use client'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Image } from "@/interfaces/products/image"
import { Product } from "@/interfaces/products/Product"
import { Upload } from "lucide-react"
import { CldImage } from "next-cloudinary"

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

function ProductImages({ product }: { product: Product }) {
  const images = product.images
  console.log("IMg>>", images)
  const newImages: Image[] = []
  const previews = []

  const skus = product.images.map((image) => image.productSkuId)
  console.log("SKUs", skus)
  return (
    <Card
      className="overflow-hidden" x-chunk="dashboard-07-chunk-4"
    >
      <CardHeader>
        <CardTitle>Imagenes del producto</CardTitle>
        <CardDescription>
          Click en las imagenes para ver informacion adicional
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <UploadButtonDialog skus={skus} />
          <div className="grid grid-cols-3 gap-2">
            {
              images.slice(1).map((image, idx) => (
                <SmallImageDialog image={image} skus={skus} key={idx} />
              ))
            }
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function SmallImageDialog({ image, skus }: { image: Image, skus: number[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          onClick={() => {
            console.log(`clickeando la imagen con id ${image.id}`)
          }}>
          <CldImage
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="84"
            src={image.imgSrc}
            width="84"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Imagen</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
            <Label htmlFor="skus">Sku de la variacion</Label>
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
        </div>
        <DialogFooter>
          <Button type="submit">Guardar</Button>
          <Button variant='destructive' type="submit">Borrar imagen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function UploadButtonDialog({ skus }: { skus: number[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed"
        >
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Subir Imagen</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="skus">Sku de la variacion</Label>
            <Select>
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
        </div>
        <DialogFooter>
          <Button type="submit">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function MainImageDialog({ image, skus }: { image: Image, skus: number[] }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button onClick={() => { console.log(`clickeando la imaagen con id ${image.id}`) }}>
          <CldImage
            alt="Product image"
            className="aspect-square w-full rounded-md object-cover"
            height="300"
            src={image.imgSrc}
            width="300"
          />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar Imagen</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
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
            <Label htmlFor="skus">Sku de la variacion</Label>
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
        </div>
        <DialogFooter>
          <Button type="submit">Guardar</Button>
          <Button variant='destructive' type="submit">Borrar imagen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}



export default ProductImages
