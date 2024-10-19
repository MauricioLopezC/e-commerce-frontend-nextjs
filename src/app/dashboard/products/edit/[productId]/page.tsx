import ProductDetails from '@/components/dashboard/edit-create/ProductDetails'
import ProductImages from '@/components/dashboard/edit-create/ProductImages'
import ProductVariantsCard from '@/components/dashboard/edit-create/ProductVariantsCard'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { getProduct, getProducts, getProductSkus } from '@/queries/products.api'
import { ChevronLeftIcon } from '@heroicons/react/24/outline'

async function EditProductPage({
  params, searchParams
}: {
  params: { productId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  const productId = Number(params.productId)

  if (!productId) return null

  const product = await getProduct(productId)
  const productSkus = await getProductSkus(productId)

  //TODO: add form and form button on both ProductDetails and ProductVariants Cards for
  //submit

  return (
    <main className='grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 mb-16 mt-16'>
      <div className='mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4'>
        <div className='flex items-center gap-4'>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ChevronLeftIcon className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
            {product.name.toUpperCase()}
          </h1>
          <Badge variant="outline" className="ml-auto sm:ml-0">
            In stock
          </Badge>
          <div className="hidden items-center gap-2 md:ml-auto md:flex">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8"'>
          {/* product details and stock */}
          <div className='grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8 w-full'>

            <ProductDetails product={product} />

            <ProductVariantsCard productSkus={productSkus} />

          </div>
          <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <ProductImages product={product} />
          </div>


          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>

        </div>
      </div>
    </main>
  )
}

export default EditProductPage
