import NotLoggedPage from "@/components/common/notlogged-page"
import RecentSalesCard from "@/components/dashboard/mainpage/RecentSales"
import SmallCards from "@/components/dashboard/mainpage/smallCards"
import TopProductsTable from "@/components/dashboard/mainpage/TopProducts"
import { getAllOrders } from "@/lib/actions/order.actions"
import { getUsers } from "@/lib/actions/user.actions"
import { isTokenExpired } from "@/lib/jwt-decode"
import { cookies } from "next/headers"
import { getAllProducts } from "@/lib/actions/product.actions"

async function DashBoard() {

  const cookieStore = cookies()
  const token = cookieStore.get('access-token')
  if (!token) return (<NotLoggedPage />)
  if (isTokenExpired(token?.value ?? '')) return (<NotLoggedPage />) //expired session


  //TODO: implement orderby query param for send to backend
  const { productsData, error: productsError } = await getAllProducts({})
  if (!productsData) return null

  const { data, error } = await getAllOrders(20, 1)

  const { usersData, error: usersError } = await getUsers()
  console.log(usersData)
  if (!usersData) return null
  console.log(usersError)
  if (!data) return null
  console.log(error)

  return (
    <div className='flex min-h-screen w-full flex-col'>
      <main className='flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8'>
        <div id='small-cards' className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
          <SmallCards orderData={data} usersData={usersData} />
        </div>
        <div id='big-cards' className='grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3'>
          <TopProductsTable products={productsData.products} />
          <RecentSalesCard orders={data.orders} />
        </div>
      </main>
    </div>
  )
}

export default DashBoard
