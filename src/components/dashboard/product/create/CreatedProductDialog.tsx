import { Image } from "@/interfaces/products/image"
import { Product, ProductSku } from "@/interfaces/products/product"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface DialogProps {
  product: Product, productSkus: ProductSku[], images: string[]
}

function CreatedProductDialog({ product, productSkus, images }: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type='submit' size="sm">Crear Producto</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Producto creado correctamente</DialogTitle>
        </DialogHeader>
        <div>
          <div>
            <h2>Producto</h2>
            <ul>
              <li>{product.id}</li>
              <li>{product.name}</li>
              <li>{product.description}</li>
              <li>{product.price}</li>
              <li>{product.category}</li>
              <li>{product.sex}</li>
            </ul>
          </div>

          <div>
            <h2>Variaciones</h2>
            <ul>
              {productSkus.map((psku: ProductSku) => (
                <>
                  <li>{psku.id}</li>
                  <li>{psku.quantity}</li>
                  <li>{psku.size}</li>
                  <li>{psku.color}</li>
                </>
              ))}
            </ul>
          </div>

          <div>
            <h2>Imágenes</h2>
            <ul>
              {images.map((img: string) => (
                <li>{img}</li>
              ))}
            </ul>
          </div>

        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreatedProductDialog
