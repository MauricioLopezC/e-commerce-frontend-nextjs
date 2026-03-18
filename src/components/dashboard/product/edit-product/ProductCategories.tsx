'use client';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import { PlusCircleIcon } from 'lucide-react';
import { useState } from 'react';
import { CreateCategoryDialog } from '../create/CreateCategoryDialog';
import { replaceProductCategories2 } from '@/lib/actions/product.actions';
import { toast } from 'sonner';
import { CheckCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Category } from '@/interfaces/product';

interface ProductCategoriesFormProps {
  categories: Category[];
  productCategories: Category[];
  productId: number;
}
function ProductCategoriesForm({
  categories,
  productCategories,
  productId,
}: ProductCategoriesFormProps) {
  const defaultOptions: Option[] = categories.map((category) => ({
    value: category.id.toString(),
    label: category.name,
  }));
  const [value, setValue] = useState<Option[]>(
    productCategories.map((category) => ({
      value: category.id.toString(),
      label: category.name,
    })),
  );
  const [createCategoryIsOpen, setCreateCategoryIsOpen] = useState(false);

  async function onSubmit() {
    const categoryIds = value.map((value) => Number(value.value));
    const { data: product } = await replaceProductCategories2(
      productId,
      categoryIds,
    );
    if (product) {
      toast.success('Categorías guardadas');
    } else {
      toast.error('Error! intente nuevamente');
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
                label: 'Selecciona Categorías',
              }}
              value={value}
              onChange={setValue}
              defaultOptions={defaultOptions}
              placeholder="Selecciona Categorías"
              hideClearAllButton
              hidePlaceholderWhenSelected
              emptyIndicator={
                <p className="text-center text-sm">Sin resultados</p>
              }
            />

            <Button
              size="sm"
              variant="secondary"
              onClick={() => {
                setCreateCategoryIsOpen(true);
              }}
            >
              <PlusCircleIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="space-x-2">
          <Button onClick={onSubmit}>Guardar Categorías</Button>
        </div>
        <CreateCategoryDialog
          isOpen={createCategoryIsOpen}
          setIsOpen={setCreateCategoryIsOpen}
        />
      </CardFooter>
    </Card>
  );
}

export default ProductCategoriesForm;
