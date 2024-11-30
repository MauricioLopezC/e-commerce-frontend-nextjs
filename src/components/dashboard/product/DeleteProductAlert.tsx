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
import { deleteProduct } from "@/lib/actions/product.actions";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon } from "lucide-react";

export interface AlertDialogProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  productId: number | null;
}

export function DeleteProductAlert({ isOpen, setIsOpen, productId }: AlertDialogProps) {
  const { toast } = useToast()
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Eliminará permanentemente al usuario.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              if (productId) {
                const { product: deletedProduct, error } = await deleteProduct(productId)
                console.log(deletedProduct, error)

                toast({
                  description: (
                    <div>
                      <h2 className="font-semibold text-md">
                        <span><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
                        Producto eliminado
                      </h2>
                    </div>
                  ),
                })
              }
            }}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
