
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Order } from "@/interfaces/orders"
import { peso } from "@/lib/constants"

function RecentSalesCard({ orders }: { orders: Order[] }) {
  return (
    <Card className="overflow-x-auto">
      <CardHeader>
        <CardTitle>Ventas Recientes</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-8">
        {orders.map((order, idx) => (
          <div className="flex items-center gap-4" key={idx}>
            <Avatar className="hidden h-9 w-9 sm:flex">
              <AvatarFallback>
                {order.user?.firstName.slice(0, 1)}{order.user?.lastName.slice(0, 1)}
              </AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">
                {order.user?.firstName} {order.user?.lastName}
              </p>
              <div className="max-w-[12rem]">
                <p className="text-sm text-muted-foreground truncate">
                  {order.user?.email}
                </p>
              </div>
            </div>
            <div className="ml-auto font-medium text-ellipsis">+{peso.format(order.total)}</div>
          </div>
        ))}
      </CardContent>
    </Card>

  )
}

export default RecentSalesCard
