import RecentSalesCard from "@/components/dashboard/mainpage/RecentSales"
import SmallCards from "@/components/dashboard/mainpage/SmallCards"
import { getAllOrders } from "@/lib/actions/order.actions"
import { getUsers } from "@/lib/actions/user.actions"
import { getAllProducts } from "@/lib/actions/product.actions"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import SalesChart from "@/components/dashboard/mainpage/SalesChart"
import { salesByCategory, salesByMonth, salesByProduct } from "@/lib/actions/statistics.actions"
import SalesByCategoryChart from "@/components/dashboard/mainpage/SalesByCategoryChart"
import { SalesByProductChart } from "@/components/dashboard/mainpage/SalesByProductChart"
import { SalesByCategoryChartPieDonut } from "@/components/dashboard/mainpage/SalesByCategoryDonutChart"

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
  const { data: salesByMonthData } = await salesByMonth(startDate, endDate)
  const { data: salesByCategoryData } = await salesByCategory(startDate, endDate)
  const { data: salesByProductData } = await salesByProduct(startDate, endDate)

  if (!usersData) return null
  if (!ordersData) return null
  if (!salesByMonthData) return null
  if (!salesByCategoryData) return null
  if (!salesByProductData) return null



  return (
    <>
      <main className='flex flex-1 flex-col gap-4 p-4  md:p-8'>
        <div id='small-cards' className='grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4'>
          <SmallCards ordersData={ordersData} usersData={usersData} />
        </div>
        <div id='big-cards' className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
          <Card>
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
          {/* <RecentSalesCard orders={ordersData.orders} /> */}

          <Card>
            <CardHeader>
              <CardTitle>Ventas por categoría</CardTitle>
              <CardDescription>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <SalesChart AllSalesByMonth={salesByMonthData} /> */}
              <SalesByCategoryChart salesByCategory={salesByCategoryData} />

            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              {/* <div className="flex gap-2 font-medium leading-none"> */}
              {/*   <p>Trending up by ${salesMothlyVariation}% this month</p> */}
              {/*   <TrendingUp className="h-4 w-4" /> */}
              {/* </div> */}
              <div className="leading-none text-muted-foreground">
                Mostrando el total de ventas por categoría el último año
              </div>
            </CardFooter>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Ventas por producto</CardTitle>
              <CardDescription>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              <SalesByProductChart salesByProduct={salesByProductData} />
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              {/* <div className="flex gap-2 font-medium leading-none"> */}
              {/*   <p>Trending up by ${salesMothlyVariation}% this month</p> */}
              {/*   <TrendingUp className="h-4 w-4" /> */}
              {/* </div> */}
              <div className="leading-none text-muted-foreground">
                Total de ventas por producto el ultimo año
              </div>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ventas por categoría</CardTitle>
              <CardDescription>{startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}</CardDescription>
            </CardHeader>
            <CardContent>
              {/* <SalesChart AllSalesByMonth={salesByMonthData} /> */}
              <SalesByCategoryChartPieDonut salesByCategory={salesByCategoryData} />

            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
              {/* <div className="flex gap-2 font-medium leading-none"> */}
              {/*   <p>Trending up by ${salesMothlyVariation}% this month</p> */}
              {/*   <TrendingUp className="h-4 w-4" /> */}
              {/* </div> */}
              <div className="leading-none text-muted-foreground">
                Mostrando el total de ventas por categoría el último año
              </div>
            </CardFooter>
          </Card>

        </div>
      </main>
    </>
  )
}

export default DashBoard
