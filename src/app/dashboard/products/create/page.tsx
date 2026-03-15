import CreateProductForm from '@/components/dashboard/product/create/CreateProductForm';
import { getAllCategories } from '@/lib/actions/category.actions';
import { BreadcrumbUpdater } from '@/components/dashboard/BreadcrumbUpdater';

async function CreateProductPage() {
  const { data: categories } = await getAllCategories();
  if (!categories) return null;

  return (
    <>
      <BreadcrumbUpdater
        items={[
          { name: 'Dashboard', href: '/dashboard' },
          { name: 'Productos', href: '/dashboard/products' },
          { name: 'Nuevo Producto', href: '/dashboard/products/create' },
        ]}
      />
      <main className="container mx-auto mt-4 mb-16">
        <div className="mx-auto max-w-[59rem] ">
          <CreateProductForm categories={categories} />
        </div>
      </main>
    </>
  );
}

export default CreateProductPage;
