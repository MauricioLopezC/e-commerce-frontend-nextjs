"use client"
import {
  Copy,
  CreditCard,
  Truck,
  MoreVertical,
  CircleCheckBig,
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Order } from "@/interfaces/orders"
import { useOrdersStore } from "@/store/order-page-store"
import { peso } from "@/lib/constants"
import { updateOrderStatus } from "@/lib/actions/order.actions"
import { useToast } from "@/hooks/use-toast"

export default function OrderSummaryDashboard({ orders }: { orders: Order[] }) {
  const { toast } = useToast()
  const selectedOrderId = useOrdersStore((state) => state.orderId)

  const order = orders.find((order) => (
    order.id === selectedOrderId
  ))

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
            Orden número {order.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <Copy className="h-3 w-3" />
              <span className="sr-only">Copy Order ID</span>
            </Button>
          </CardTitle>
          <CardDescription>{new Date(order.createdAt).toLocaleString('es-AR')}</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <Button size="sm" variant="outline" className="h-8 gap-1">
            <Truck className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
              Seguir
            </span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="outline" className="h-8 w-8">
                <MoreVertical className="h-3.5 w-3.5" />
                <span className="sr-only">Mas</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Estado</DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem
                className="gap-1.5"
                onClick={async () => {
                  const { order: createdOrder, error } = await updateOrderStatus(order.id, "COMPLETED")
                  console.log(createdOrder, error)
                  if (createdOrder) {
                    toast({
                      description: (
                        <div>
                          <h2 className="font-semibold text-md">
                            <span><CircleCheckBig className="h-5 w-5 mr-2 text-green-500 inline" /></span>
                            Estado actualizado a {createdOrder.status}
                          </h2>
                        </div>
                      ),
                    })
                  }
                }}>
                {order.status === 'COMPLETED' &&
                  <span className="size-1.5 rounded-full bg-black" aria-hidden="true"></span>
                }
                COMPLETADO
              </DropdownMenuItem>

              <DropdownMenuItem
                className="gap-1.5"
                onClick={async () => {
                  const { order: createdOrder } = await updateOrderStatus(order.id, "IN_PROGRESS")
                  console.log(createdOrder)
                  if (createdOrder) {
                    toast({
                      description: (
                        <div>
                          <h2 className="font-semibold text-md">
                            <span><CircleCheckBig className="h-5 w-5 mr-2 text-green-500 inline" /></span>
                            Estado actualizado a {createdOrder.status}
                          </h2>
                        </div>
                      ),
                    })
                  }
                }}
              >
                {order.status === 'IN_PROGRESS' &&
                  <span className="size-1.5 rounded-full bg-black" aria-hidden="true"></span>
                }
                EN PROGRESO
              </DropdownMenuItem>

              <DropdownMenuItem
                className="gap-1.5"
                onClick={async () => {
                  const { order: createdOrder } = await updateOrderStatus(order.id, "CANCELLED")
                  console.log(createdOrder)
                  if (createdOrder) {
                    toast({
                      description: (
                        <div>
                          <h2 className="font-semibold text-md">
                            <span><CircleCheckBig className="h-5 w-5 mr-2 text-green-500 inline" /></span>
                            Estado actualizado a {createdOrder.status}
                          </h2>
                        </div>
                      ),
                    })
                  }
                }}
              >
                {order.status === 'CANCELLED' &&
                  <span className="size-1.5 rounded-full bg-black" aria-hidden="true"></span>
                }
                CANCELADO
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Editar</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
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
          {(order.discounts && order.discounts.length > 0) &&
            <>
              <Separator className="my-2" />
              <div className="font-semibold">Descuentos</div>
              <ul className="grid gap-3">
                {order.discounts.map((discount, idx) => (
                  <li key={idx} className="flex items-center justify-between">
                    <span className="text-muted-foreground">
                      {discount.discount.name} x <span>{discount.appliedTimes}</span>
                    </span>
                    <span>{peso.format(discount.discountAmount)}</span>
                  </li>
                ))}
              </ul>
            </>
          }

          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{peso.format(order.total)}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Importe de descuento</span>
              <span>{peso.format(order.discountAmount)}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total final</span>
              <span>{peso.format(order.finalTotal)}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Información de envío</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{order.user?.firstName} {order.user?.lastName}</span>
              <span>{order.shipping?.address}</span>
              <span>{order.shipping?.city}</span>
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
