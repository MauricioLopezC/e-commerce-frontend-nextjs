import OrdersTableDashBoard from "@/components/dashboard/orders/OrdersTableDashboard"
import OrderSummaryDashboard from "@/components/dashboard/orders/OrderSummaryDashboard"
import { getAllOrders } from "@/lib/actions/order.actions"


async function OrdersPageDashboard(
  { searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {

  const page = Number((await searchParams).page ?? 1)
  // console.log("PAGE", page)

  const { data, error } = await getAllOrders(10, page)
  // console.log(data?.orders)
  // console.log(error)
  if (!data) return null
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3">
          <div className="items-start gap-4 md:gap-8 lg:col-span-2">
            <OrdersTableDashBoard orderData={data} />
          </div>
          <OrderSummaryDashboard orders={data.orders} />
        </main>
      </div>
    </div>
  )
}

export default OrdersPageDashboard
