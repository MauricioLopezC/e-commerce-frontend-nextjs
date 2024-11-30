'use client'
import { CldImage } from 'next-cloudinary'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Product } from '@/interfaces/products/product'
import { peso } from '@/lib/constants'

function TopProductsTable({ products }: { products: Product[] }) {
  return (
    <Card className='xl:col-span-2'>
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
              <TableHead className="hidden md:table-cell">
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
                .sort((a, b) => (b.unitsOnOrder - a.unitsOnOrder))
                .filter((product) => (product.unitsOnOrder > 0))
                .slice(0, 4)
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
                    <TableCell className="hidden md:table-cell">
                      {product.unitsOnOrder}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {peso.format(product.unitsOnOrder * product.price)}
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
