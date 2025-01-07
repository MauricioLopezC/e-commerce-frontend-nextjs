'use client'
import { ChevronDownIcon } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "../ui/button"

export function OrderByMenu() {
  const searchParams = useSearchParams()
  const router = useRouter()
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
        <DropdownMenuItem
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('orderBy', 'price')
            router.push(`/products?${params.toString()}`)
          }}>
          Menor precio
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set('orderBy', '-price')
            router.push(`/products?${params.toString()}`)
          }}>
          Mayor precio
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
