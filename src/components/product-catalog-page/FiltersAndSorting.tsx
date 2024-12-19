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

export function OrderByMenu() {
  const searchParams = useSearchParams()
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ChevronDownIcon className="h-4 w-4 mx-2" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel >Orden</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => {
          const params = new URLSearchParams(searchParams.toString())
          params.set('orderBy', 'price')
          router.push(`/products?${params.toString()}`)
        }}>Menor precio</DropdownMenuItem>
        <DropdownMenuItem onClick={() => {
          const params = new URLSearchParams(searchParams.toString())
          params.set('orderBy', '-price')
          router.push(`/products?${params.toString()}`)
        }}>Mayor precio</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
