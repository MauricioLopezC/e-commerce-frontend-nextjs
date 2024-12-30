'use client'
import { ChevronDownIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

function OrdersOrderByMenu() {
  const [orderBy, setOrderBy] = useState<string>('-createdAt')
  const searchParams = useSearchParams()
  const router = useRouter()

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('orderBy', orderBy)
    router.push(`/dashboard/orders?${params.toString()}`)
  }, [orderBy])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1 text-sm"
        >
          <ChevronDownIcon className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Ordenar por</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel >Orden</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={orderBy} onValueChange={setOrderBy}>
          <DropdownMenuRadioItem value="-createdAt">Mas recientes</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="createdAt">Menos recientes</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OrdersOrderByMenu
