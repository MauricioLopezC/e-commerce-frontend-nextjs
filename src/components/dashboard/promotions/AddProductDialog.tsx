import { Button } from "@/components/ui/button";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import { Product } from "@/interfaces/products/product";
import { connectProducts } from "@/lib/actions/discounts.actions";
import { useParams } from "next/navigation";
import { useState } from "react";

interface AddProductDialogProps {
  products: Product[]
  discountProducts: Product[]
}

export default function AddProductDialog({ products, discountProducts }: AddProductDialogProps) {
  const [values, setValues] = useState<Option[]>([])
  const params = useParams()
  const discountId = Number(params.discountId)
  if (!discountId) return null
  const productOptions: Option[] = products.map(product => {
    const alreadyExists = discountProducts.some(discountProduct => discountProduct.id === product.id)
    if (alreadyExists) {
      return ({ value: product.id.toString(), label: product.name, disable: true })
    }
    return ({ value: product.id.toString(), label: product.name })
  })

  async function onClick() {
    console.log(values)
    const productIds = values.map(value => Number(value.value))
    const { discount, error } = await connectProducts(discountId, productIds)
    console.log(discount, error)
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
        defaultOptions={productOptions}
        placeholder="Agregar productos"
        hidePlaceholderWhenSelected
        emptyIndicator={<p className="text-center text-sm">No hay productos</p>}
        value={values}
        onChange={setValues}
      />
      <Button size='sm' onClick={onClick}>Guardar</Button>
    </div>
  );
}
