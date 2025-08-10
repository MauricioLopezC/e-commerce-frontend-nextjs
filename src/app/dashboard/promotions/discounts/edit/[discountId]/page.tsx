import NotFoundPage from "@/components/common/NotFoundPage";
import EditDiscountForm from "@/components/dashboard/promotions/EditForm"
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllCategories } from "@/lib/actions/category.actions";
import { getOneDiscount } from "@/lib/actions/discounts.actions"
import { getAllProducts } from "@/lib/actions/product.actions";
import Link from "next/link";
async function EditDiscountPage({ params }: { params: { discountId: string } }) {
  const discountId = Number(params.discountId);
  if (!discountId) return NotFoundPage();

  const { discount } = await getOneDiscount(discountId)
  const { productsData } = await getAllProducts({ limit: 20 })
  const { categories } = await getAllCategories()

  if (!discount) return NotFoundPage();
  if (!categories) return null
  if (!productsData) return null

  return (
    <main className='container mx-auto mt-4 mb-16'>
      <div className="max-w-[59rem] space-y-2 mx-auto">

        <div className="gap-2 mb-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/dashboard/promotions">Cancelar</Link>
          </Button>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Descuento</CardTitle>
            </CardHeader>
            <CardContent>
              <EditDiscountForm discount={discount} products={productsData.products} categories={categories} />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

export default EditDiscountPage
