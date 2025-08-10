import UsersTable from "@/components/dashboard/users/UsersTable"
import { PaginationWithLinks } from "@/components/ui/paginations-with-links"
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
  if (!usersData) return null

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
    </section>
  )
}

export default UsersPage
