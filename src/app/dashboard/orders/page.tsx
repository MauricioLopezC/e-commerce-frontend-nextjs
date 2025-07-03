import OrdersTableDashBoard from "@/components/dashboard/orders/OrdersTableDashboard"
import OrderSummaryDashboard from "@/components/dashboard/orders/OrderSummaryDashboard"
import OrdersFilters from "@/components/dashboard/orders/OrdersFilters"
import OrdersOrderByMenu from "@/components/dashboard/orders/OrdersOrderBy"
import { PaginationWithLinks } from "@/components/ui/paginations-with-links"
import { getAllOrders } from "@/lib/actions/order.actions"
import SerchEmails from "@/components/dashboard/orders/SearchEmails"


async function OrdersPageDashboard(
  { searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {
  const query = await searchParams
  const pageSize = Number(query.limit ?? 10)
  const currentPage = Number(query.page ?? 1)

  const { ordersData } = await getAllOrders({
    ...query,
    page: currentPage,
    limit: pageSize,
  })

  if (!ordersData) return null
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 ">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3">
          <div className="items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="ml-auto flex items-center gap-2 mb-2">
              <OrdersFilters />
              <OrdersOrderByMenu />
              <SerchEmails />
            </div>
            <OrdersTableDashBoard orders={ordersData.orders} />
            <div className="mt-4">
              <PaginationWithLinks
                page={currentPage}
                pageSize={pageSize}
                totalCount={ordersData.metadata._count}
              />
            </div>
          </div>
          <OrderSummaryDashboard orders={ordersData.orders} />
        </main>
      </div>
    </div>
  )
}

export default OrdersPageDashboard
