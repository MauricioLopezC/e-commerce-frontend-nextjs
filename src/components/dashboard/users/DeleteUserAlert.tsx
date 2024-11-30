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
import { deleteUser } from "@/lib/actions/user.actions";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon } from "lucide-react";


export interface AlertDialogProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: number | null;
}

function DeleteUserAlert({ isOpen, setIsOpen, userId }: AlertDialogProps) {
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
              if (userId) {
                const { user: deletedUser, error } = await deleteUser(userId)
                console.log(deletedUser, error)
                console.log(userId)

                toast({
                  description: (
                    <div>
                      <h2 className="font-semibold text-md">
                        <span><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
                        Usuario eliminado
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

export default DeleteUserAlert;
