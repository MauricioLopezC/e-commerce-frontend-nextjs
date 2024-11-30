import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { deleteProductSku } from "@/lib/actions/product-skus.actions"
import { Trash2 } from "lucide-react"

function DeleteAlert({ productId, productSkuId }: { productId: number, productSkuId: number }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'><Trash2 className='w-4 h-4' /></Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro de eliminar?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={async () => {
            const res = await deleteProductSku(productId, productSkuId)
            console.log(res)
          }}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlert
