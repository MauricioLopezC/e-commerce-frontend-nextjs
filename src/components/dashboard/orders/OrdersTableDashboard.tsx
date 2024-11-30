"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
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
import { OrderData } from "@/lib/actions/order.actions"
import { peso } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useOrdersStore } from "@/store/order-page-store"
import { useRouter, useSearchParams } from "next/navigation"

function OrdersTableDashBoard({ orderData }: { orderData: OrderData }) {
  const updateSelectedOrderId = useOrdersStore((state) => state.updateSelectedOrderId)
  const selectedOrderId = useOrdersStore((state) => state.orderId)
  const router = useRouter()

  const searchParams = useSearchParams()
  const page = Number(searchParams.get('page') ?? 1)
  // console.log("page", page)
  const totalPages = Math.floor(orderData.aggregate._count / 10) + 1
  // console.log(totalPages)
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Pedidos</CardTitle>
        <CardDescription>Pedidos recientes de la tienda.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead className="hidden sm:table-cell">Estado</TableHead>
              <TableHead className="hidden md:table-cell">Fecha</TableHead>
              <TableHead className="text-right">Monto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderData.orders.map((order, idx) => (
              <TableRow
                className={cn(order.id === selectedOrderId ? "bg-accent" : '')}
                onClick={() => {
                  updateSelectedOrderId(order.id)
                }}
                key={idx}
              >
                <TableCell>
                  <div className="font-medium">{order.user?.firstName} {order.user?.lastName} </div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {order.user?.email}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <Badge className="text-xs" variant="secondary">
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(order.createdAt).toLocaleDateString('es-AR')}
                </TableCell>
                <TableCell className="text-right">{peso.format(order.total)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter>
        <div className="space-x-2 ml-auto">
          {page === 1 &&
            <Button variant='outline' disabled>Atras</Button>
          }
          {page > 1 &&
            <Button
              variant='outline'
              onClick={() => {
                if (page > 1) {
                  router.push(`/dashboard/orders?page=${page - 1}`)
                }
              }}
            >
              Atras
            </Button>

          }
          {page < totalPages &&
            <Button
              variant='outline'
              onClick={() => {
                if (page < totalPages) {
                  router.push(`/dashboard/orders?page=${page + 1}`)
                }
              }}
            >
              Siguiente
            </Button>
          }
          {page >= totalPages &&
            <Button variant='outline' disabled>Siguiente</Button>
          }
        </div>
      </CardFooter>
    </Card>
  )
}

export default OrdersTableDashBoard
