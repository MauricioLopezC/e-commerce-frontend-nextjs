"use client"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
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
import { Order } from "@/interfaces/orders"
import { peso } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useOrdersStore } from "@/store/order-page-store"

function OrdersTableDashBoard({ orders }: { orders: Order[] }) {
  const updateSelectedOrderId = useOrdersStore((state) => state.updateSelectedOrderId)
  const selectedOrderId = useOrdersStore((state) => state.orderId)

  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Pedidos</CardTitle>
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
            {orders.map((order, idx) => (
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
                  <Badge className="text-xs gap-1.5" variant="outline">
                    {order.status === 'IN_PROGRESS' &&
                      <span className="size-1.5 rounded-full bg-amber-500" aria-hidden="true"></span>
                    }
                    {order.status === 'COMPLETED' &&
                      <span className="size-1.5 rounded-full bg-emerald-500" aria-hidden="true"></span>
                    }
                    {order.status === 'CANCELLED' &&
                      <span className="size-1.5 rounded-full bg-red-500" aria-hidden="true"></span>
                    }
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {new Date(order.createdAt).toLocaleDateString('es-AR')}
                </TableCell>
                <TableCell className="text-right">{peso.format(order.total)}</TableCell>
              </TableRow>
            ))}
            {orders.length === 0 &&
              <TableRow>
                <TableCell
                  colSpan={4}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
            }
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

export default OrdersTableDashBoard
