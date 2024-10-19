import { Button } from '@headlessui/react'
import { useToast } from '@/hooks/use-toast'

function UpdateToast() {
  const { toast } = useToast()
  return (
    <Button
      onClick={() => {
        toast({
          title: "Cantidad del producto actualizada",
        })
      }}
    >
      Add to calendar
    </Button>
  )

}

export default UpdateToast
