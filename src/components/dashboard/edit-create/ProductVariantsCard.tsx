import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { ProductSku } from '@/interfaces/products/Product'
import { PlusCircleIcon } from '@heroicons/react/24/outline'

function ProductVariantsCard({ productSkus }: { productSkus: ProductSku[] }) {
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
              <TableHead className="w-[100px]">SKU</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead className="">Talle</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {productSkus.map((productSku, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-semibold">
                  {productSku.id}
                </TableCell>
                <TableCell>
                  <Label htmlFor="stock-1" className="sr-only">
                    Stock
                  </Label>
                  <Input
                    id="stock-1"
                    type="number"
                    defaultValue={productSku.quantity}
                    min={0}
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor="color-1" className="sr-only">
                    Color
                  </Label>
                  <Input
                    id="color-1"
                    type="text"
                    defaultValue={productSku.color}
                  />
                </TableCell>
                <TableCell>
                  <Label htmlFor="size-1" className="sr-only">
                    Size
                  </Label>
                  <Input
                    id="size-1"
                    type="text"
                    defaultValue={productSku.size}
                  />
                </TableCell>
                {/* <TableCell> */}
                {/*   <Label htmlFor="imges-1" className="sr-only"> */}
                {/*     Imgs */}
                {/*   </Label> */}
                {/*   <Input */}
                {/*     id="images-1" */}
                {/*     type="file" */}
                {/*     accept=".jpg, .jpeg, .png" */}
                {/*     multiple */}
                {/*   /> */}
                {/* </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <Button size="sm" variant="ghost" className="gap-1">
          <PlusCircleIcon className="h-5 w-5" />
          Agregar Variante
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ProductVariantsCard
