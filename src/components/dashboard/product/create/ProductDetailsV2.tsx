'use client'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'

function ProductDetailsV2() {
  return (
    <Card x-chunk="dashboard-07-chunk-0">
      <CardHeader>
        <CardTitle>Detalles del Producto</CardTitle>
        <CardDescription>
          Editar datos del producto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="grid gap-3">
            <Label htmlFor="name">Nombre</Label>
            <Input
              id="name"
              name='name'
              type="text"
              className="w-full"
              maxLength={100}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              name='price'
              type="number"
              className="w-full"
              min={0}
              step=".01"
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="cathegory">Categoría</Label>
            <Input
              name='category'
              id="cathegory"
              type="text"
              className="w-full"
              maxLength={100}
              required
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sex">Sexo</Label>
            <Select name='sex' required>
              <SelectTrigger id="sex" aria-label="Select sex">
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
              className="min-h-32"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default ProductDetailsV2
