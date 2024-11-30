"use client"
import {
  Copy,
  CreditCard,
  TrashIcon,
  CheckIcon,
  Truck,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Order } from "@/interfaces/orders"
import { useOrdersStore } from "@/store/order-page-store"
import { peso } from "@/lib/constants"

export default function OrderSummaryDashboard({ orders }: { orders: Order[] }) {
  const selectedOrderId = useOrdersStore((state) => state.orderId)
  const updateSelectedOrderId = useOrdersStore((state) => state.updateSelectedOrderId)
  if (!selectedOrderId) updateSelectedOrderId(orders[0].id)

  const order = orders.find((order) => (
    order.id === selectedOrderId
  )) ?? orders[0]

  if (!order) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        Selecciona una orden para ver detalles
      </div>
    )
  }

  const orderItems = order.orderItems
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Orden con ID: {order.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>{new Date(order.createdAt).toLocaleDateString()}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Seguir
            </span>
          </Button>
          <Button size="icon" variant="outline" className="h-8 w-8">
            <CheckIcon className="h-3.5 w-3.5" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Detalles</div>
          <ul className="grid gap-3">
            {orderItems?.map((orderItem, idx) => (
              <li key={idx} className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {orderItem.product?.name} x <span>{orderItem.quantity}</span>
                </span>
                <span>{peso.format(orderItem.price)}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>{peso.format(order.total)}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Información de envío</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{order.user?.firstName} {order.user?.lastName}</span>
              <span>{order.Shipping?.adress}</span>
              <span>{order.Shipping?.city}</span>
            </address>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Información del Cliente</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Cliente</dt>
              <dd>{order.user?.firstName} {order.user?.lastName}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                {order.user?.email}
              </dd>
            </div>
          </dl>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Información de pago</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="flex items-center gap-1 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                {order.payment?.provider}
              </dt>
              <dd>**** **** **** </dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground">
          Actualizado <time dateTime={new Date(order.createdAt).toLocaleDateString()}>{new Date(order.createdAt).toLocaleDateString()}</time>
        </div>
      </CardFooter>
    </Card>
  )
}
