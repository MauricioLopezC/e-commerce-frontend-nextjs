'use client'
import { CldImage } from 'next-cloudinary'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Product } from '@/interfaces/products/product'
import { peso } from '@/lib/constants'

function TopProductsTable({ products }: { products: Product[] }) {
  return (
    <Card className='col-span-1 lg:col-span-4'>
      <CardHeader>
        <CardTitle>Los más vendidos</CardTitle>
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
              <TableHead className="hidden md:table-cell text-center">
                Ventas totales
              </TableHead>
              <TableHead className="hidden md:table-cell">
                Recaudado
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {
              products
                .map((product, idx) => (
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
                    <TableCell className="hidden md:table-cell text-center">
                      {product.unitsOnOrder}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {peso.format(product.totalCollected)}
                    </TableCell>
                  </TableRow>
                ))
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )

}

export default TopProductsTable
