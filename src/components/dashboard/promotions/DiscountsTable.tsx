import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Discount } from "@/interfaces/discounts"
import { peso } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import Link from "next/link"

function DiscountsTable({ discounts }: { discounts: Discount[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Descuentos</CardTitle>
        <CardDescription>Se listan todos los descuentos automaticos de tu tienda</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-3 px-4 font-semibold text-gray-900">Nombre</TableHead>
              <TableHead className="hidden md:table-cell py-3 px-4 font-semibold text-gray-900">Descuento</TableHead>
              <TableHead className="hidden md:table-cell py-3 px-4 font-semibold text-gray-900">Vencimiento</TableHead>
              <TableHead className="hidden md:table-cell py-3 px-4 font-semibold text-gray-900">Usos</TableHead>
              <TableHead className="hidden md:table-cell py-3 px-4 font-semibold text-gray-900">Estado</TableHead>
              <TableHead className="py-3 px-4 font-semibold text-gray-900">Opciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {discounts.map((discount, index) => (
              <TableRow key={discount.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                <TableCell className="py-3 px-4">
                  <div className="font-medium text-gray-900">{discount.name}</div>
                  <div className="text-sm text-gray-500">{discount.description}</div>
                </TableCell>
                <TableCell className="hidden md:table-cell py-3 px-4">
                  <span className="font-medium">
                    {discount.discountType === 'PERCENTAGE' ? `${discount.value}%` : `$${discount.value}`}
                  </span>
                  <span className="text-sm text-gray-500 block">
                    Min. orden: {peso.format(discount.orderThreshold ?? 0)}
                  </span>
                </TableCell>
                <TableCell className="hidden md:table-cell py-3 px-4">
                  {new Date(discount.endDate).toLocaleDateString('es-AR')}
                </TableCell>
                <TableCell className="hidden md:table-cell py-3 px-4">
                  <div className="flex items-center">
                    <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                      {discount.maxUses &&
                        <div
                          className="bg-blue-600 rounded-full h-2"
                          style={{ width: `${(discount.currentUses / discount.maxUses) * 100}%` }}
                        ></div>
                      }
                    </div>
                    <span className="text-sm text-gray-600">
                      {discount.currentUses}/ {discount.maxUses ?? 'ilimitado'}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell py-3 px-4">
                  <Badge variant={discount.isActive ? "success" : "secondary"}>
                    {discount.isActive ? 'Activo' : 'Inactivo'}
                  </Badge>
                </TableCell>
                <TableCell className="py-3 px-4">
                  {/* <ActionButtons discountId={discount.id} /> */}
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-700" asChild >
                      <Link href={`/dashboard/promotions/discounts/edit/${discount.id}`}>
                        <Pencil className="h-4 w-4 md:mr-1" />
                        <span className="hidden md:inline">Editar</span>
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      <Trash2 className="h-4 w-4 md:mr-1" />
                      <span className="hidden md:inline">Eliminar</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <p>Card Footer</p>
      </CardFooter>
    </Card>
  )
}

export default DiscountsTable
