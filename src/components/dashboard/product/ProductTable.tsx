'use client'
import { CldImage } from 'next-cloudinary'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
import { Product } from '@/interfaces/products/product'
import { useRouter } from 'next/navigation'
import { peso } from '@/lib/constants'
import { useState } from 'react'
import { DeleteProductAlert } from './DeleteProductAlert'

function ProductsTable({ products }: { products: Product[] }) {
  const router = useRouter()
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)
  const [deleteProductId, setDeleteProductId] = useState<number | null>(null)
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>
          Gestione sus productos y visualice su rendimiento de ventas
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="hidden w-[100px] sm:table-cell">
                <span className="sr-only">Image</span>
              </TableHead>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden md:table-cell">
                Precio
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Ventas totales
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Recaudado
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Creado el
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              products.map((product, idx) => (
                <TableRow key={idx}>
                  <TableCell className="hidden sm:table-cell">
                    <CldImage
                      alt="Product image"
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.images[0]?.imgSrc ?? 'samples/animals/cat'}
                      width="64"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    {product.name}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {peso.format(product.price)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.unitsOnOrder}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {peso.format(product.totalCollected)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {new Date(product.createdAt).toLocaleDateString('es-AR')}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Opciones</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => {
                          router.push(`/dashboard/products/edit/${product.id}`)
                        }}>
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={async () => {
                          setDeleteProductId(product.id)
                          setDeleteAlertOpen(true)
                        }}>
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        {/* <div className="text-xs text-muted-foreground"> */}
        {/*   Showing <strong>1-10</strong> of <strong>32</strong>{" "} */}
        {/*   products */}
        {/* </div> */}
        <DeleteProductAlert isOpen={deleteAlertOpen} setIsOpen={setDeleteAlertOpen} productId={deleteProductId} />
      </CardFooter>
    </Card>
  )
}

export default ProductsTable
