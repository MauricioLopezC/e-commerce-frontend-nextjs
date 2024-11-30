'use client'
import { usePathname } from "next/navigation"

function DashboardBreadCrumbs() {
  const pathname = usePathname()
  console.log(pathname)
  return <p>Current pathname: {pathname}</p>
}

export default DashboardBreadCrumbs
