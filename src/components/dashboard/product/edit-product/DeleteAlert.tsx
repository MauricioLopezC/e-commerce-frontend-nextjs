import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { deleteProductSku2 } from '@/lib/actions/product-skus.actions';
import { Dispatch, SetStateAction } from 'react';
import { toast } from 'sonner';
import { TrashIcon } from 'lucide-react';

interface DeleteAlertProps {
  productId: number;
  productSkuId: number;
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
}

function DeleteAlert({
  productId,
  productSkuId,
  dialogOpen,
  setDialogOpen,
}: DeleteAlertProps) {
  return (
    <AlertDialog
      defaultOpen={false}
      open={dialogOpen}
      onOpenChange={setDialogOpen}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro de eliminar?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              const res = await deleteProductSku2(productId, productSkuId);
              console.log(res);
              toast.success('Variante eliminada');
            }}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlert;
