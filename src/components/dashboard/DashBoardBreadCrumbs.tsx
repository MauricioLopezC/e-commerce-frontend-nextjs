'use client'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useBreadCrumbsStore } from "@/store/dashboard-store"


function DashBoardBreadCrumbs() {
  const pages = useBreadCrumbsStore((state) => state.pages)
  if (!pages) return (
    <h1 className="font-bold text-lg text-black">Dashboard</h1>
  )

  return (
    <Breadcrumb className="ml-8 lg:ml-16">
      <BreadcrumbList>
        {pages.map((page, idx) => (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink href={page.href}>{page.name}</BreadcrumbLink>
            </BreadcrumbItem>
            {idx !== pages.length - 1 &&
              <BreadcrumbSeparator />
            }
            {idx === pages.length - 1 &&
              <BreadcrumbItem>
                <BreadcrumbPage>{page.name}</BreadcrumbPage>
              </BreadcrumbItem>
            }
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export default DashBoardBreadCrumbs
