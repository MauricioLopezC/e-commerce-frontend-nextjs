'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ProductSku } from '@/interfaces/products/product'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { Pencil, Trash2 } from 'lucide-react'
import EditDialog from './EditDialog'
import CreateDialog from './CreateDialog'
import DeleteAlert from './DeleteAlert'

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
        <form id='form2' action={async (formData: FormData) => {
          const currentFormData = Object.fromEntries(formData)
          console.log(currentFormData)
        }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">SKU</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Color</TableHead>
                <TableHead className="">Talle</TableHead>
                <TableHead className="">Opciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productSkus.map((productSku, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-semibold">
                    {productSku.id}
                  </TableCell>
                  <TableCell>
                    {productSku.quantity}
                  </TableCell>
                  <TableCell>
                    {productSku.color}
                  </TableCell>
                  <TableCell>
                    {productSku.size}
                  </TableCell>
                  <TableCell>
                    <div className='flex space-x-1'>
                      <EditDialog productSku={productSku} />
                      <DeleteAlert productId={productSkus[0].productId} productSkuId={productSku.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </form>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <CreateDialog productId={productSkus[0].productId} />
      </CardFooter>
    </Card>
  )
}

export default ProductVariantsCard
