'use client'
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Discount } from "@/interfaces/discounts"
import { peso } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog"
import { useState } from "react"
import { deleteDiscount } from "@/lib/actions/discounts.actions"
import { useToast } from "@/hooks/use-toast"
import { CheckCircleIcon } from "@heroicons/react/24/solid"
import { XMarkIcon } from "@heroicons/react/24/outline"

function DiscountsTable({ discounts }: { discounts: Discount[] }) {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { toast } = useToast()
  const [discountId, setDiscountId] = useState<number | null>(null)
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
                      <DropdownMenuItem
                        onClick={() => {
                          router.push(`/dashboard/promotions/discounts/edit/${discount.id}`)
                        }}>
                        Editar
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={async () => {
                        setIsOpen(true)
                        setDiscountId(discount.id)
                      }}>
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Eliminará permanentemente al descuento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                onClick={async () => {
                  console.log(discountId)
                  if (discountId) {
                    const { discount, error } = await deleteDiscount(discountId)
                    console.log(discount, error)
                    if (discount) {
                      toast({
                        description: (
                          <div>
                            <h2 className="font-semibold text-md">
                              <span><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
                              Descuento eliminado
                            </h2>
                          </div>
                        ),
                      })
                      setDiscountId(null)
                    }
                    if (error) {
                      toast({
                        description: (
                          <div>
                            <h2 className="font-semibold text-md">
                              <span><XMarkIcon className="h-6 w-6 mr-2 text-red-500 inline" /></span>
                              Error al eliminar
                            </h2>
                          </div>
                        ),
                      })
                    }
                  }
                }}>
                Continuar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  )
}

export default DiscountsTable
