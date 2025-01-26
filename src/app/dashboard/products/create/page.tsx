import CreateProductForm from "@/components/dashboard/product/create/CreateProductForm"
import { getAllCategories } from "@/lib/actions/category.actions"

async function CreateProductPage() {
  const { categories } = await getAllCategories()
  if (!categories) return null


  return (
    <main className='container mx-auto mt-4 mb-16'>
      <div className='mx-auto max-w-[59rem] '>
        <CreateProductForm categories={categories} />
      </div>
    </main>
  )
}

export default CreateProductPage
