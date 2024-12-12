import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { deleteProductSku } from "@/lib/actions/product-skus.actions"
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { TrashIcon } from "lucide-react";

interface DeleteAlertProps {
  productId: number;
  productSkuId: number;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

function DeleteAlert({ productId, productSkuId, dialogOpen, setDialogOpen }: DeleteAlertProps) {
  const { toast } = useToast()
  return (
    <AlertDialog defaultOpen={false} open={dialogOpen} onOpenChange={setDialogOpen}>
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
            toast({
              description: (
                <div>
                  <h2 className="font-semibold text-md">
                    <span><TrashIcon className="h-4 w-4 mr-2 text-red-500 inline" /></span>
                    Variante elimindada
                  </h2>
                </div>
              ),
            })
          }}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteAlert
