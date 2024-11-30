import UsersTable from "@/components/dashboard/users/UsersTable"
import { Button } from "@/components/ui/button"
import { getUsers } from "@/lib/actions/user.actions"
import { PlusCircle } from "lucide-react"

async function UsersPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {

  const page = Number((await searchParams).page ?? 1)

  const { usersData } = await getUsers(10, page)
  console.log(usersData)
  if (!usersData) return null

  return (
    <section className="flex flex-col space-y-5  sm:px-6 sm:py-0 mt-4">
      {/* <header className="flex items-center justify-between"> */}
      {/*   <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">Clientes</h1> */}
      {/**/}
      {/*   <Button size="sm" className="h-8 gap-1"> */}
      {/*     <PlusCircle className="h-3.5 w-3.5" /> */}
      {/*     <span className="sr-only sm:not-sr-only sm:whitespace-nowrap"> */}
      {/*       Nuevo Cliente */}
      {/*     </span> */}
      {/*   </Button> */}
      {/* </header> */}

      <div>
        <UsersTable usersData={usersData} />
      </div>

    </section>
  )
}

export default UsersPage
