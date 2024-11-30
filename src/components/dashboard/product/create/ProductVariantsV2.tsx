'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { ProductSku } from '@/interfaces/products/product'
import { useState } from 'react'

interface skuInput {
  color: string;
  size: string;
  stock: number;
}

function ProductVariantsV2() {
  const [skuInput, setSkuInput] = useState<skuInput[]>([
    {
      color: '',
      size: '',
      stock: 0,
    }
  ])

  return (
    <Card x-chunk="dashboard-07-chunk-1">
      <CardHeader>
        <CardTitle>Variaciones</CardTitle>
        <CardDescription>
          Editar las variaciones del producto
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Stock</TableHead>
              <TableHead>Color</TableHead>
              <TableHead>Talle</TableHead>
              <TableHead>Imágenes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {skuInput.map((psku, idx) => ( //refactorizar esto
              <TableRow key={idx}>
                <TableCell>
                  <Label htmlFor={`stock-${idx + 1}`} className="sr-only">
                    Stock
                  </Label>
                  <Input
                    id="stock-1"
                    type="number"
                    min={1}
                    required
                    name={`stock-${idx + 1}`}
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor={`color-${idx + 1}`} className="sr-only">
                    Color
                  </Label>
                  <Input
                    id="color-1"
                    type="text"
                    required
                    name={`color-${idx + 1}`}
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor={`size-${idx + 1}`} className="sr-only">
                    Size
                  </Label>
                  <Input
                    id="size-1"
                    type="text"
                    required
                    name={`size-${idx + 1}`}
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor={`images-${idx + 1}`} className="sr-only">
                    Imágenes
                  </Label>
                  <Input
                    id="size-1"
                    type="file"
                    accept='image/*'
                    required
                    name={`images-${idx + 1}`}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button
          size="sm"
          variant="ghost"
          className="gap-1"
          onClick={() => {
            setSkuInput([
              ...skuInput,
              {
                color: '',
                size: '',
                stock: 0,
              }
            ])
          }}
        >
          <PlusCircleIcon className="h-5 w-5" />
          Agregar Variante
        </Button>
      </CardFooter>
    </Card>
  )
}
export default ProductVariantsV2
