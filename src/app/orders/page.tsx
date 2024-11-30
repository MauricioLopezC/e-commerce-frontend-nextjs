import NotLoggedPage from "@/components/common/notlogged-page"
import { getUserOrders } from "@/lib/actions/order.actions"
import { getPayload, isTokenExpired } from "@/lib/jwt-decode"
import { cookies } from "next/headers"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

async function OrdersPage() {
  const cookieStore = cookies()
  const token = cookieStore.get('access-token')
  if (!token) return (<NotLoggedPage />)
  if (isTokenExpired(token?.value ?? '')) return (<NotLoggedPage />) //expired session

  const { data, error } = await getUserOrders()
  console.log(data)
  console.log(error)

  console.log(data[0].orderItems)
  console.log(data[0].payments)

  return (
    <section className="container mx-auto h-screen">
      <Card>
        <CardHeader>
          <CardTitle>Orden numero</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex p-8">
            <div>
              {/* <CldImage /> */}
              <div>DATOS PRODUCTO</div>
            </div>
            <div>DATOS ENVIO</div>
            <div>DATOS XD</div>

          </div>


        </CardContent>
      </Card>
    </section>
  )
}


export default OrdersPage
