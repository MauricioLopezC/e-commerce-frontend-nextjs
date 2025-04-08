"use client"
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, UserIcon, XMarkIcon, HeartIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import SearchDialog from './dialogs/SearchDialog'
import { useState } from 'react'
import { checkSession, isAdminAction } from '@/lib/actions/navbar.actions'

const navigation = [
  { name: "Todo", href: "/products?limit=9", current: false },
  { name: "Hombre", href: "/products?sex=MALE&limit=9", current: false },
  { name: "Mujer", href: "/products?sex=FEMALE&limit=9", current: false },
  { name: "About", href: "/about", current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

function NavBar() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  return (
    <Disclosure as="nav" className="sticky top-0 z-50 bg-white border-b" >
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2  sm:px-6 lg:px-8">
            <div className="relative flex h-14 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-200">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={'/'}>
                    <h1 className="font-bold text-xl">APRIL</h1>
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-200"
                            : " hover:bg-gray-200",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <Link href={'/favorites'}>
                  <HeartIcon className="h-6 w-6 mx-2" />
                </Link>
                <Link href={'/cart'}>
                  <ShoppingBagIcon className="h-6 w-6 mx-2" />
                </Link>
                <button onClick={() => {
                  setSearchOpen(true)
                }}>
                  <MagnifyingGlassIcon className="h-6 w-6 mx-2" />
                </button>
                <SearchDialog isOpen={searchOpen} setIsOpen={setSearchOpen} />

                <Menu>
                  <MenuButton onClick={async () => {
                    //server action here
                    const session = await checkSession()
                    console.log(session)
                    setIsAuthenticated(session)
                    const admin = await isAdminAction()
                    console.log(admin)
                    setIsAdmin(admin)
                  }}>
                    <UserIcon className="h-6 w-6 rounded-full" />
                  </MenuButton>
                  <MenuItems
                    transition
                    anchor="bottom"
                    className="absolute right-0 z-10 mt-4 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {!isAuthenticated &&
                      <>
                        <MenuItem>
                          <Link className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" href="/auth/register">
                            Registrarse
                          </Link>
                        </MenuItem>
                        <MenuItem>
                          <Link className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" href="/auth/login">
                            Iniciar Sesión
                          </Link>
                        </MenuItem>
                      </>
                    }
                    {isAuthenticated && (
                      <>
                        <MenuItem>
                          <Link className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" href="/profile">
                            Perfil de Usuario
                          </Link>
                        </MenuItem>
                        {isAdmin &&
                          <MenuItem>
                            <Link className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" href="/dashboard">
                              Dashboard
                            </Link>
                          </MenuItem>
                        }
                      </>
                    )}
                    <MenuItem>
                      <Link className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100" href="/orders">
                        Compras
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>

              </div>
            </div>
          </div>

          <DisclosurePanel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-200 "
                      : "text-gray-300 hover:bg-gray-200 hover:text-black",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                  aria-current={item.current ? "page" : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}


export default NavBar

