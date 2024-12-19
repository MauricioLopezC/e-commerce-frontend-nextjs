import RecentSalesCard from "@/components/dashboard/mainpage/RecentSales"
import SmallCards from "@/components/dashboard/mainpage/smallCards"
import TopProductsTable from "@/components/dashboard/mainpage/TopProducts"
import { getAllOrders } from "@/lib/actions/order.actions"
import { getUsers } from "@/lib/actions/user.actions"
import { getAllProducts } from "@/lib/actions/product.actions"

async function DashBoard() {
  //TODO: implement orderby query param for send to backend
  const { productsData } = await getAllProducts({})
  if (!productsData) return null
  const { ordersData } = await getAllOrders({})
  const { usersData } = await getUsers({})
  if (!usersData) return null
  if (!ordersData) return null

  return (
    <div className='container mx-auto'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div id='small-cards' className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
          <SmallCards ordersData={ordersData} usersData={usersData} />
        </div>
        <div id='big-cards' className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
          <TopProductsTable products={productsData.products} />
          <RecentSalesCard orders={ordersData.orders} />
        </div>
      </main>
    </div>
  )
}

export default DashBoard
