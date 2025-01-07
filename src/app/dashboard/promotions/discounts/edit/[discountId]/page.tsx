import EditDiscountForm from "@/components/dashboard/promotions/EditForm"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getOneDiscount } from "@/lib/actions/discounts.actions"

async function EditDiscountPage({ params }: { params: { discountId: string } }) {
  const discountId = Number(params.discountId);
  if (!discountId) return null;
  const { discount } = await getOneDiscount(discountId)
  if (!discount) return null
  const products = discount.products
  const categories = discount.categories

  return (
    <main className='container mx-auto mt-4 mb-16'>
      <div className="lg:grid lg:gap-4 lg:grid-cols-2">
        <Card className="lg: row-span-2">
          <CardHeader>
            <CardTitle>Descuento</CardTitle>
          </CardHeader>
          <CardContent>
            <EditDiscountForm discount={discount} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Productos</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-lg text-center">El Descuento se aplica en general</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-lg text-center">El Descuento se aplica en general</p>
          </CardContent>
          <CardFooter>
          </CardFooter>
        </Card>
      </div>
    </main>
  )
}

export default EditDiscountPage
