import DiscountsTable from "@/components/dashboard/promotions/DiscountsTable"
import { Button } from "@/components/ui/button"
import { PaginationWithLinks } from "@/components/ui/paginations-with-links"
import { getAllDiscounts } from "@/lib/actions/discounts.actions"
import { parseQueryNumber } from "@/lib/parse-query"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

interface DiscountsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function PromotionsPage({ searchParams }: DiscountsPageProps) {
  const query = await searchParams
  const pageSize = parseQueryNumber(query.limit, 10)
  const currentPage = parseQueryNumber(query.page, 1)

  const { discountsData } = await getAllDiscounts({
    ...query,
    page: currentPage,
    limit: pageSize,
  })
  if (!discountsData) return null
  console.log(discountsData)

  return (
    <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Link href='/dashboard/promotions/discounts/create'>
          <Button size='sm' className="h-8 gap-1">
            <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Descuento
          </Button>
        </Link>
        <DiscountsTable discounts={discountsData.discounts} />
        <div className="mt-4">
          <PaginationWithLinks
            page={currentPage}
            pageSize={pageSize}
            totalCount={discountsData.metadata._count}
          />
        </div>
      </div>
      <div></div>
    </main>
  )
}

export default PromotionsPage
