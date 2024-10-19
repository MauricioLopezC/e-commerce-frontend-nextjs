import { TooltipProvider } from "@/components/ui/tooltip"
import { ArchiveBoxIcon, ShoppingBagIcon, UsersIcon } from "@heroicons/react/24/outline"
import { Tooltip, TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip"
import Link from "next/link"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section className="">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col bg-background border-r border-t  sm:flex sm:mt-16 sm:mr-16">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/products"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ArchiveBoxIcon className="h-5 w-5" />
                  <span className="sr-only">Products</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Products</TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/orders"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <ShoppingBagIcon className="h-5 w-5" />
                  <span className="sr-only">Orders</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Orders</TooltipContent>
            </Tooltip>


            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard/users/"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <UsersIcon className="h-5 w-5" />
                  <span className="sr-only">Users</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Users</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      {children}
    </section>
  )
}
