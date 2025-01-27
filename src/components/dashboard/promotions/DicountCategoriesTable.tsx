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
import { PlusCircle, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Category } from "@/interfaces/products/categories";
import { useParams } from "next/navigation";
import AddCateogiresDialog from "./AddCategoriesDialog";
import { disconnectCategories } from "@/lib/actions/discounts.actions";

function DiscountCategoriesTable({ categories, allCategories }: { categories: Category[], allCategories: Category[] }) {
  const params = useParams()
  const discountId = Number(params.discountId)
  if (!discountId) return null

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categoría</CardTitle>
        <CardDescription>Lista de las categorías aplicables al descuento</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden md:table-cell">
                Descripcion
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category, idx) => (
              <TableRow key={idx}>
                <TableCell className="font-medium">
                  {category.name}
                </TableCell>
                <TableCell className="font-normal">
                  {category.description ?? 'Sin Descripcion'}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                    onClick={async () => {
                      const { discount, error } = await disconnectCategories(discountId, [category.id])
                    }}
                  >
                    <Trash2 className="h-4 w-4 md:mr-1" />
                    <span className="hidden md:inline">Eliminar</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 &&
              <TableRow>
                <TableCell
                  colSpan={2}
                  className="h-24 text-center"
                >
                  El descuento no aplica  a categorías
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </CardContent>
      {categories.length !== 0 &&
        <CardFooter className="justify-center border-t p-4">
          <AddCateogiresDialog categories={allCategories} discountCategories={categories} />
        </CardFooter>
      }
    </Card>
  )
}

export default DiscountCategoriesTable
