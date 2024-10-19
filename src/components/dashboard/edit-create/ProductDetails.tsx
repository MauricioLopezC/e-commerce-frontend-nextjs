import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Product } from '@/interfaces/products/Product'
import React from 'react'

function ProductDetails({ product }: { product: Product }) {
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Detalles del Producto</CardTitle>
        <CardDescription>
          Editar datos del produco
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              type="text"
              className="w-full"
              defaultValue={product.name}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              className="w-full"
              defaultValue={product.price}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="cathegory">Categoria</Label>
            <Input
              id="cathegory"
              type="text"
              className="w-full"
              defaultValue={product.category}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sex">Sexo</Label>
            <Select>
              <SelectTrigger id="sex" aria-label="Select status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hombre">Hombre</SelectItem>
                <SelectItem value="mujer">Mujer</SelectItem>
                <SelectItem value="unisex">Unisex</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-3">
            <Label htmlFor="description">Descripcion</Label>
            <Textarea
              id="description"
              defaultValue={product.description}
              className="min-h-32"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductDetails
