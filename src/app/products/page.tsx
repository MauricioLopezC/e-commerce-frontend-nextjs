import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import ProductCard from "@/components/ProductCard"
import { getAllProducts } from "@/lib/actions/product.actions"
import { PaginationWithLinks } from "@/components/ui/paginations-with-links"
import FeaturesList from "@/components/home/Features"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

export const metadata = {
  title: 'Products page'
}

interface ProductsPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function ProductsPage({ searchParams }: ProductsPageProps) {
  const filters = await searchParams
  const pageSize = Number(filters.limit ?? 10)
  const currentPage = Number(filters.page ?? 1)

  const { productsData } = await getAllProducts(filters)

  if (!productsData) return null
  return (
    <section className="mt-6 ">
      <Breadcrumb className="ml-8 lg:ml-16">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/products?limit=9">Productos</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{filters.sex?.toString().charAt(0).toUpperCase().concat(filters.sex?.toString().slice(1)) ?? 'Todo'}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-bold text-xl flex justify-center items-center">PRODUCTOS</h1>
      {/* products section */}
      <div className="w-fit mx-auto mt-10 mb-5">
        {/* <div className="flex justify-between"> */}
        {/*   <FiltersMenu /> */}
        {/*   <div className="flex items-center"> */}
        {/*     Ordenar por */}
        {/*     <ChevronDownIcon className="h-4 w-4 mx-2" /> */}
        {/*   </div> */}
        {/* </div> */}

        <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-8">
          {productsData.products.map((product) => (
            <ProductCard id={product.id} title={product.name} price={product.price} imgSrc={product.images[0]?.imgSrc} key={product.id} />
          ))}
        </div>
        <div className="mt-4">
          <PaginationWithLinks
            page={currentPage}
            pageSize={pageSize}
            totalCount={productsData.aggregate._count}
          />
        </div>
      </div>
      <div className="my-16">
        <FeaturesList />
      </div>
    </section>
  )
}


function FiltersMenu() {
  return (
    <div className="text-right">
      <Menu>
        <MenuButton className="flex items-center">
          <AdjustmentsHorizontalIcon className="h-6 w-6 mx-2" />
          Filters
        </MenuButton>
        <Transition
          enter="transition ease-out duration-75"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <MenuItems
            anchor="bottom end"
            className="w-52 rounded-xl border p-1 text-sm/6 bg-white"
          >
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                Color
              </button>
            </MenuItem>
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                Size
              </button>
            </MenuItem>
            <div className="my-1 h-px" />
            <MenuItem>
              <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 data-[focus]:bg-gray-100">
                Price
              </button>
            </MenuItem>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  )
}

export default ProductsPage
