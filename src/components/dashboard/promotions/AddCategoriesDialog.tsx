import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { Category } from "@/interfaces/products/categories";
import { connectCategories } from "@/lib/actions/discounts.actions";
import { useParams } from "next/navigation";
import { useState } from "react";

interface AddProductDialogProps {
  categories: Category[],
  discountCategories: Category[]
}

export default function AddCateogiresDialog({ categories, discountCategories }: AddProductDialogProps) {
  const [values, setValues] = useState<Option[]>([])
  const params = useParams()
  const discountId = Number(params.discountId)
  if (!discountId) return null
  const categoryOptions: Option[] = categories.map(category => {
    const alreadyExists = discountCategories.some(discountCategory => discountCategory.id === category.id)
    if (alreadyExists) {
      return ({ value: category.id.toString(), label: category.name, disable: true })
    }
    return ({ value: category.id.toString(), label: category.name })
  })

  async function onClick() {
    console.log(values)
    const categoryIds = values.map(value => Number(value.value))
    const { discount } = await connectCategories(discountId, categoryIds)
    if (discount) {
      setValues([])
    }
  }

  return (
    <div className="flex space-x-2">
      <MultipleSelector
        commandProps={{
          label: "Select products",
        }}
        defaultOptions={categoryOptions}
        placeholder="Agregar categorias"
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No hay categorias</p>}
        onChange={setValues}
      />
      <Button size='sm' onClick={onClick}>Guardar</Button>
    </div>
  );
}
