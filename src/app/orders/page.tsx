import UserOrdersCard from "@/components/user-orders/UserOrdersCard"
import { getUserOrders } from "@/lib/actions/order.actions"

async function OrdersPage() {
  const { ordersData } = await getUserOrders()
  if (!ordersData) return null

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Tus Compras</h1>
        </div>

        <div className="space-y-6">
          {ordersData.orders.map((order) => (
            <UserOrdersCard order={order} key={order.id} />
          ))}
        </div>
      </div>
    </main>
  )
}


export default OrdersPage
