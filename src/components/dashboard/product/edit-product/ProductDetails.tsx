'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { Product } from '@/interfaces/products/product'
import { updateProduct } from '@/lib/actions/product.actions'
import { CheckCircleIcon, CircleCheckBig } from 'lucide-react'
import { useState } from 'react'

function ProductDetails({ product }: { product: Product }) {
  const [isUpdated, setIsUpdated] = useState(false)
  const [isChanged, setIsChanged] = useState(false)

  const { toast } = useToast()

  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Detalles del Producto</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          id='product-form'
          action={async (formData: FormData) => {
            const { product: updatedProduct, error } = await updateProduct(product.id, formData)
            if (product) {
              setIsUpdated(true)
            }

            toast({
              description: (
                <div>
                  <h2 className="font-semibold text-md">
                    <span><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
                    Producto editado
                  </h2>
                </div>
              ),
            })
          }}
          onChange={(e) => {
            setIsChanged(true)
          }}
        >
          <div className="grid gap-6">
            <div className="grid gap-3">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                name='name'
                type="text"
                className="w-full"
                defaultValue={product.name}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                name='price'
                type="number"
                className="w-full"
                defaultValue={product.price}
                required
                min={0}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="category">Categoría</Label>
              <Input
                id="category"
                name="category"
                type="text"
                className="w-full"
                defaultValue={product.category}
                required
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="sex">Sexo</Label>
              <Select name='sex' defaultValue={product.sex} required>
                <SelectTrigger id="sex" aria-label="Select status">
                  <SelectValue placeholder="Seleccionar sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="hombre">Hombre</SelectItem>
                  <SelectItem value="mujer">Mujer</SelectItem>
                  <SelectItem value="unisex">Unisex</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                name='description'
                id="description"
                defaultValue={product.description}
                className="min-h-32"
                required
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter >
        {!isChanged &&
          <Button size="sm" form="product-form" disabled>
            Guardar
          </Button>
        }
        {isChanged &&
          <Button size="sm" type="submit" form="product-form">
            Guardar
          </Button>
        }
      </CardFooter>
    </Card>
  )
}

export default ProductDetails
