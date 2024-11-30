import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { OrderData } from "@/lib/actions/order.actions"
import { UsersData } from "@/lib/actions/user.actions"
import { peso } from "@/lib/constants"
import { Activity, CreditCard, DollarSign, Users } from "lucide-react"

function SmallCards({ orderData, usersData }: { orderData: OrderData, usersData: UsersData }) {
  console.log(orderData)
  return (
    <>
      <Card x-chunk="dashboard-01-chunk-0">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Ingresos totales
          </CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{peso.format(orderData.aggregate._sum.total)}</div>
          {/* <p className="text-xs text-muted-foreground"> */}
          {/*   +20.1% from last month */}
          {/* </p> */}
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Clientes
          </CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{usersData.aggregate._count}</div>
          {/* <p className="text-xs text-muted-foreground"> */}
          {/*   +180.1% from last month */}
          {/* </p> */}
        </CardContent>
      </Card>
      <Card x-chunk="dashboard-01-chunk-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ventas</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">+{orderData.aggregate._count}</div>
          {/* <p className="text-xs text-muted-foreground"> */}
          {/*   +19% from last month */}
          {/* </p> */}
        </CardContent>
      </Card>
    </>

  )
}

export default SmallCards
