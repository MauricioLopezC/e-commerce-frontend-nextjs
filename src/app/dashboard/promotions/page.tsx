import DiscountsTable from "@/components/dashboard/promotions/DiscountsTable"
import { Button } from "@/components/ui/button"
import { getAllDiscounts } from "@/lib/actions/discounts.actions"
import { PlusCircle } from "lucide-react"
import Link from "next/link"

async function PromotionsPage() {
  const { discounts } = await getAllDiscounts()
  if (!discounts) return null

  return (
    <main className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="space-y-2">
        <Button >
          <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Descuento
        </Button>
        <DiscountsTable discounts={discounts} />
      </div>
      <div></div>
    </main>
  )
}

export default PromotionsPage
