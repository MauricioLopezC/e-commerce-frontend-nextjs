'use client';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Product, ProductSku } from '@/interfaces/product';
import { CldImage } from 'next-cloudinary';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { deleteImage } from '@/lib/actions/image.actions';
import { KittenImageSrc } from '@/lib/constants';
import UploadImageDialog from './UploadImageDialog';
import { toast } from 'sonner';
import { Image } from '@/interfaces/images';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

function ImageDialog({
  image,
  skus,
  size = 'small',
}: {
  image: Image;
  skus: number[];
  size?: 'small' | 'main';
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const dimensions =
    size === 'main' ? { width: 300, height: 300 } : { width: 84, height: 84 };

  const imageClass =
    size === 'main'
      ? 'aspect-square w-full rounded-md object-cover'
      : 'aspect-square w-full rounded-md object-cover';

  return (
    <Dialog>
      <DialogTrigger asChild>
        <CldImage
          alt="Product image"
          className={imageClass}
          src={image.imgSrc ?? KittenImageSrc}
          {...dimensions}
          priority
        />
      </DialogTrigger>
      <DialogContent className="max-w-2xl md:max-w-3xl lg:max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center justify-center bg-gray-100 rounded-md min-h-[300px]">
            <CldImage
              alt="Product image preview"
              src={image.imgSrc ?? KittenImageSrc}
              width={400}
              height={400}
              className="w-full h-full max-h-[400px] object-contain"
            />
          </div>
          <div className="flex flex-col">
            <DialogHeader>
              <DialogTitle>Editar Imagen</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form className="grid gap-4 py-4 flex-1">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="productId" className="text-right">
                  Id del producto
                </Label>
                <Input
                  id="productId"
                  defaultValue={image.productId}
                  className="col-span-3"
                  disabled
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skus">Sku de la variación</Label>
                <Select defaultValue={image.productSkuId?.toString()}>
                  <SelectTrigger
                    id="skus"
                    aria-label="Select status"
                    className="col-span-3"
                  >
                    <SelectValue placeholder={image.productSkuId?.toString()} />
                  </SelectTrigger>
                  <SelectContent>
                    {skus.map((sku, idx) => (
                      <SelectItem value={sku.toString()} key={idx}>
                        {sku}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </form>
            <DialogFooter>
              <Button type="submit">Guardar</Button>
              <Button
                variant="destructive"
                disabled={isDeleting}
                onClick={async () => {
                  setIsDeleting(true);
                  try {
                    const { data } = await deleteImage(image.id);
                    if (data) {
                      toast.success('Imagen eliminada correctamente');
                    }
                  } finally {
                    setIsDeleting(false);
                  }
                }}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Eliminando
                  </>
                ) : (
                  'Borrar imagen'
                )}
              </Button>
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function ProductImages({
  product,
  productSkus,
}: {
  product: Product;
  productSkus: ProductSku[];
}) {
  const images = product.images;
  const skus = productSkus.map((sku) => sku.id);

  return (
    <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
      <CardHeader>
        <CardTitle>Imágenes del producto</CardTitle>
        <CardDescription>
          Click en las imágenes para ver información adicional
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <ImageDialog image={images[0]} skus={skus} size="main" />
          <div className="grid grid-cols-3 gap-2">
            {images.slice(1).map((image, idx) => (
              <ImageDialog image={image} skus={skus} key={idx} />
            ))}
            <UploadImageDialog skus={skus} productId={product.id} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ProductImages;
