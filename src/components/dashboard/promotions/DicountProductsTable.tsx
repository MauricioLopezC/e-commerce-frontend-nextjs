'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { CldImage } from "next-cloudinary";
import { Product } from "@/interfaces/products/product";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { peso } from "@/lib/constants";

import AddProductDialog from "./AddProductDialog";
import { disconnectProducts } from "@/lib/actions/discounts.actions";
import { useParams } from "next/navigation";



function DiscountProductsTable({ products, allProducts }: { products: Product[], allProducts: Product[] }) {
  const params = useParams()
  const discountId = Number(params.discountId)
  if (!discountId) return null
  return (
    <Card>
      <CardHeader>
        <CardTitle>Productos</CardTitle>
        <CardDescription>Lista de los productos aplicables al descuento</CardDescription>
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
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product, idx) => (
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
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={async () => {
                      const { discount, error } = await disconnectProducts(discountId, [product.id])
                      console.log(discount, error)
                    }}
                  >
                    <Trash2 className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:inline">Eliminar</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {products.length === 0 &&
              <TableRow>
                <TableCell
                  colSpan={3}
                  className="h-24 text-center"
                >
                  El descuento no aplica  a productos
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </CardContent>
      {products.length !== 0 &&
        <CardFooter className="justify-center border-t p-4">
          <AddProductDialog products={allProducts} discountProducts={products} />
        </CardFooter>
      }
    </Card>
  )
}

export default DiscountProductsTable
