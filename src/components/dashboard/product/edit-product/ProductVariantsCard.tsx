'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { ProductSku } from '@/interfaces/products/product'
import { Pencil, Trash2 } from 'lucide-react'
import EditDialog from './EditDialog'
import CreateDialog from './CreateDialog'
import DeleteAlert from './DeleteAlert'
import { useState } from 'react'

function ProductVariantsCard({ productSkus }: { productSkus: ProductSku[] }) {
  const [PSkuIdToDelete, setPSkuIdToDelete] = useState<number | null>(null)
  const [PSkuToUpdate, setPSkuToUpdate] = useState<ProductSku | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false)

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
                    <Button
                      variant='secondary'
                      onClick={() => {
                        setPSkuToUpdate(productSku)
                        setUpdateDialogOpen(true)
                      }}
                    >
                      <Pencil className='w-4 h-4' />
                    </Button>
                    <Button variant='destructive'
                      onClick={() => {
                        setPSkuIdToDelete(productSku.id)
                        setDeleteDialogOpen(true)
                      }}>
                      <Trash2 className='w-4 h-4' />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="justify-center border-t p-4">
        <CreateDialog productId={productSkus[0].productId} />
        {PSkuToUpdate && //if not null
          <EditDialog productSku={PSkuToUpdate} dialogOpen={updateDialogOpen} setDialogOpen={setUpdateDialogOpen} />
        }
        {PSkuIdToDelete && //if not null
          <DeleteAlert productId={productSkus[0].productId} productSkuId={PSkuIdToDelete} dialogOpen={deleteDialogOpen} setDialogOpen={setDeleteDialogOpen} />
        }
      </CardFooter>
    </Card>
  )
}

export default ProductVariantsCard
