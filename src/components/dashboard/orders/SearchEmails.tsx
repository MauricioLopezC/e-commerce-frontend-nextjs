'use client'
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"

function SerchEmails() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [emailSearch, setEmailSearch] = useState<string>('')

  function handleSearch() {
    const params = new URLSearchParams(searchParams.toString())
    if (emailSearch === '') {
      params.delete('email')
    }

    params.set('email', emailSearch)
    router.push(`/dashboard/orders?${params.toString()}`)
  }

  return (
    <Input
      type="email"
      placeholder="Buscar email"
      className="max-w-sm h-7"
      onChange={(e) => setEmailSearch(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          handleSearch()
        }
      }}
    />
  )
}

export default SerchEmails
