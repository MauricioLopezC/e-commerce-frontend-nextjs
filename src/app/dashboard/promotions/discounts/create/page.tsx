import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { getAllCategories } from '@/lib/actions/category.actions';
import { getAllProducts } from '@/lib/actions/product.actions';
import CreateDiscountForm from '@/components/dashboard/promotions/create/CreateDiscountForm';
import { BreadcrumbUpdater } from '@/components/dashboard/BreadcrumbUpdater';

async function CreateDiscountPage() {
  const { data: categories } = await getAllCategories();
  const { data: productsData } = await getAllProducts({});

  if (!categories) return null;
  if (!productsData) return null;

  return (
    <>
      <BreadcrumbUpdater
        items={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Promociones', href: '/dashboard/promotions' },
          {
            name: 'Nuevo Descuento',
            href: '/dashboard/promotions/discounts/create',
          },
        ]}
      />
      <main className="container mx-auto mt-4 mb-16">
        <div className="max-w-[59rem] space-y-2 mx-auto">
          <div className="flex items-center gap-4">
            <Link href={'/dashboard/promotions'}>
              <Button variant="outline" size="icon" className="h-7 w-7">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Button>
            </Link>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Link href={'/dashboard/promotions'}>
                <Button variant="outline" size="sm">
                  Cancelar
                </Button>
              </Link>
              <Button type="submit" form="create-discount" size="sm">
                Guardar descuento
              </Button>
            </div>
          </div>
          <div className="">
            <Card>
              <CardHeader>
                <CardTitle>Crear descuento</CardTitle>
                <CardDescription>
                  La opción para conectar productos o descuentos aplicables se
                  mostrara en el siguiente paso
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* main form here */}
                <CreateDiscountForm
                  categories={categories}
                  products={productsData.products}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </>
  );
}

export default CreateDiscountPage;
