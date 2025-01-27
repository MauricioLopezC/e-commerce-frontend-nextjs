'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Category } from "@/interfaces/products/categories"
import { Label } from "@/components/ui/label";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { CreateCategoryDialog } from "../create/CreateCategoryDialog";
import { replaceProductCategories } from "@/lib/actions/product.actions";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

interface ProductCategoriesFormProps {
  categories: Category[];
  productCategories: Category[];
  productId: number;
}
function ProductCategoriesForm({ categories, productCategories, productId }: ProductCategoriesFormProps) {
  const defaultOptions: Option[] = categories.map(category => ({ value: category.id.toString(), label: category.name }))
  const [value, setValue] = useState<Option[]>(
    productCategories.map(category => ({ value: category.id.toString(), label: category.name }))
  )
  const [createCategoryIsOpen, setCreateCategoryIsOpen] = useState(false)
  const { toast } = useToast()

  async function onSubmit() {
    console.log(value)
    const categoryIds = value.map(value => Number(value.value))
    const { product } = await replaceProductCategories(productId, categoryIds)
    if (product) {
      toast({
        description: (
          <div>
            <h2 className="font-semibold text-md">
              <span><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
              Categorías guardadas
            </h2>
          </div>
        ),
      })
    } else {
      toast({
        description: (
          <div>
            <h2 className="font-semibold text-md">
              <span><XMarkIcon className="h-6 w-6 mr-2 text-red-500 inline" /></span>
              Error! intente nuevamente
            </h2>
          </div>
        ),
      })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorías</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label>Selecciona las categorías del producto</Label>
          <div className="flex space-x-2">
            <MultipleSelector
              commandProps={{
                label: "Selecciona Categorías",
              }}
              value={value}
              onChange={setValue}
              defaultOptions={defaultOptions}
              placeholder="Selecciona Categorías"
              hideClearAllButton
              hidePlaceholderWhenSelected
              emptyIndicator={<p className="text-center text-sm">Sin resultados</p>}
            />

            <Button size='sm' variant='secondary' onClick={() => { setCreateCategoryIsOpen(true) }}>
              <PlusCircleIcon className='h-5 w-5' />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="space-x-2">
          <Button onClick={onSubmit} >Guardar Categorías</Button>
        </div>
        <CreateCategoryDialog isOpen={createCategoryIsOpen} setIsOpen={setCreateCategoryIsOpen} />
      </CardFooter>
    </Card>
  )
}

export default ProductCategoriesForm
