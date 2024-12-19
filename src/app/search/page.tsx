import ProductCard from "@/components/ProductCard"
import { searchByName } from "@/lib/actions/search.actions"
import { ChevronDownIcon, HeartOff } from "lucide-react"
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from '@headlessui/react'
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline"

export const metadata = {
  title: 'Search'
}

async function SearchPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | undefined }> }) {
  const productName = (await searchParams).productName
  if (!productName) return null

  const { products } = await searchByName(productName)
  if (!products) return null
  return (
    <section className="mt-6 ">
      <h1 className="font-bold text-xl flex justify-center items-center">PRODUCTOS</h1>

      {/* products section */}
      {products.length === 0 &&
        <div className="w-fit mx-auto mt-10 mb-5 h-screen">
          <div className="flex flex-col space-y-3 items-center">
            <img className="h-8 w-8" src="emoji-neutral-526-svgrepo-com.svg" />
            <h1 className="font-bold text-lg">No hay resultados</h1>
          </div>
        </div>

      }
      {products.length !== 0 &&
        <div className="w-fit mx-auto mt-10 mb-5">
          <div className="flex justify-between">
            <FiltersMenu />
            <div className="flex items-center">
              Ordenar por
              <ChevronDownIcon className="h-4 w-4 mx-2" />
            </div>
          </div>

          <div className=" grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-8 gap-x-8">
            {products.map((product) => (
              <ProductCard id={product.id} title={product.name} price={product.price} imgSrc={product.images[0]?.imgSrc} key={product.id} />
            ))}
          </div>
        </div>
      }
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

export default SearchPage
