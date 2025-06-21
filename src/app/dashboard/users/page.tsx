import { OrdersByUserChart } from "@/components/dashboard/users/OrdersByUserChart"
import { SalesByUserChart } from "@/components/dashboard/users/SalesByUserChart"
import UsersTable from "@/components/dashboard/users/UsersTable"
import { PaginationWithLinks } from "@/components/ui/paginations-with-links"
import { salesByUser } from "@/lib/actions/statistics.actions"
import { getUsers } from "@/lib/actions/user.actions"

async function UsersPage(
  { searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }
) {

  const filters = await searchParams
  const pageSize = Number(filters.limit ?? 9)
  const currentPage = Number(filters.page ?? 1)

  const { usersData } = await getUsers({
    page: currentPage,
    limit: pageSize
  })
  console.log(usersData);
  if (!usersData) return null

  const { data: salesByUserData } = await salesByUser()
  // console.log(salesByUserData)
  const chartData = salesByUserData?.map((item) => ({
    userName: item.userName,
    totalSpent: item._sum.finalTotal,
  }))

  return (
    <section className="container mx-auto px-4 mt-4 mb-16">
      <UsersTable usersData={usersData} />
      <div className="mt-4 mb-16">
        <PaginationWithLinks
          page={currentPage}
          pageSize={pageSize}
          totalCount={usersData.metadata._count}
        />
      </div>
      {/* charts sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {chartData &&
          <SalesByUserChart chartData={chartData} />
        }
        {/* <OrdersByUserChart /> */}
      </div>

    </section>
  )
}

export default UsersPage
