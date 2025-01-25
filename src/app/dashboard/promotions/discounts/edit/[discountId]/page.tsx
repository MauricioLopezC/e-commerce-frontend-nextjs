import NotFoundPage from "@/components/common/NotFoundPage";
import DiscountCategoriesTable from "@/components/dashboard/promotions/DicountCategoriesTable";
import DiscountProductsTable from "@/components/dashboard/promotions/DicountProductsTable";
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
  if (!discount) return null
  const discountProducts = discount.products
  const discountCategories = discount.categories
  const { productsData } = await getAllProducts({ limit: 20 })
  if (!productsData) return null

  const { categories } = await getAllCategories()
  if (!categories) return null

  return (
    <main className='container mx-auto mt-4 mb-16'>
      <div className="gap-2 mb-2">
        <Button variant="outline" size="sm" asChild>
          <Link href="/dashboard/promotions">Cancelar</Link>
        </Button>
      </div>
      <div className="lg:grid lg:gap-4 lg:grid-cols-2">
        <Card className="lg: row-span-2">
          <CardHeader>
            <CardTitle>Descuento</CardTitle>
          </CardHeader>
          <CardContent>
            <EditDiscountForm discount={discount} discountId={discountId} />
          </CardContent>
        </Card>
        <DiscountProductsTable products={discountProducts} allProducts={productsData.products} />
        <DiscountCategoriesTable categories={discountCategories} allCategories={categories} />
      </div>
    </main>
  )
}

export default EditDiscountPage
