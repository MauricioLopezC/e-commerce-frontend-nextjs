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
import { OrdersData } from "@/lib/actions/order.actions"
import { peso } from "@/lib/constants"
import { cn } from "@/lib/utils"
import { useOrdersStore } from "@/store/order-page-store"

function OrdersTableDashBoard({ ordersData }: { ordersData: OrdersData }) {
  const updateSelectedOrderId = useOrdersStore((state) => state.updateSelectedOrderId)
  const selectedOrderId = useOrdersStore((state) => state.orderId)

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
            {ordersData.orders.map((order, idx) => (
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
    </Card>
  )
}

export default OrdersTableDashBoard
