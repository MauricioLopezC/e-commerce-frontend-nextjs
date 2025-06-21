import RecentSalesCard from "@/components/dashboard/mainpage/RecentSales"
import SmallCards from "@/components/dashboard/mainpage/SmallCards"
import { getAllOrders } from "@/lib/actions/order.actions"
import { getUsers } from "@/lib/actions/user.actions"
import { getAllProducts } from "@/lib/actions/product.actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SalesChart from "@/components/dashboard/mainpage/SalesChart"
import { TrendingUp } from "lucide-react"
import { salesByMonth } from "@/lib/actions/statistics.actions"

async function DashBoard() {
  const { productsData } = await getAllProducts({
    orderBy: '-unitsOnOrder',
    limit: 5
  })
  if (!productsData) return null
  const { ordersData } = await getAllOrders({})
  const { usersData } = await getUsers({})
  const endDate = new Date()
  const startDate = new Date()
  startDate.setFullYear(endDate.getFullYear() - 1)
  console.log(startDate, endDate)
  const { data: salesByMonthData, error } = await salesByMonth(startDate, endDate)
  console.log(salesByMonthData)
  console.log(error)
  if (!usersData) return null
  if (!ordersData) return null
  if (!salesByMonthData) return null

  return (
    <>
      <main className='flex flex-1 flex-col gap-4 p-4  md:p-8'>
        <div id='small-cards' className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
          <SmallCards ordersData={ordersData} usersData={usersData} />
        </div>
        <div id='big-cards' className='grid grid-cols-1 gap-4 lg:grid-cols-7'>
          <Card className="col-span-1 lg:col-span-4">
            <CardHeader>
              <CardTitle>Ventas</CardTitle>
              <CardDescription>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesChart AllSalesByMonth={salesByMonthData} />
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              {/* <div className="flex gap-2 font-medium leading-none"> */}
              {/*   <p>Trending up by ${salesMothlyVariation}% this month</p> */}
              {/*   <TrendingUp className="h-4 w-4" /> */}
              {/* </div> */}
              <div className="leading-none text-muted-foreground">
                Mostrando el total de ventas el último año
              </div>
            </CardFooter>
          </Card>

          {/* <TopProductsTable products={productsData.products} /> */}
          <RecentSalesCard orders={ordersData.orders} />
        </div>
      </main>
    </>
  )
}

export default DashBoard
