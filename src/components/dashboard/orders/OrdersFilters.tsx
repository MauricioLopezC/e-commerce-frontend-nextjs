'use client'
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ListFilter } from "lucide-react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

function OrdersFilters() {
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams.toString())
  const router = useRouter()
  const [status, setStatus] = useState<string>(params.get('status') ?? 'ALL')

  useEffect(() => {
    status === 'ALL' ? params.delete('status') : params.set('status', status)
    router.push(`/dashboard/orders?${params.toString()}`)
  }, [status])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 gap-1 text-sm"
        >
          <ListFilter className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only">Filtros</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Estado</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={status} onValueChange={setStatus}>
          <DropdownMenuRadioItem value="ALL">Todos</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="IN_PROGRESS">En progreso</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="COMPLETED">Completado</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="CANCELLED">Cancelado</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default OrdersFilters
