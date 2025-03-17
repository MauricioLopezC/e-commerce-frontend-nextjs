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
import { banUser } from "@/lib/actions/user.actions";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon, UserRoundX } from "lucide-react";


export interface AlertDialogProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: number | null;
}

function BanUserAlert({ isOpen, setIsOpen, userId }: AlertDialogProps) {
  const { toast } = useToast()
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás completamente seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Este acción se puede deshacer luego si asi deseas
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={async () => {
              if (userId) {
                const { user, error } = await banUser(userId)
                if (user) {
                  toast({
                    description: (
                      <div>
                        <h2 className="font-semibold text-md">
                          <span><UserRoundX className="h-6 w-6 mr-2 text-red-500 inline" /></span>
                          Usuario bloqueado!
                        </h2>
                      </div>
                    ),
                  })
                }
                if (error) {
                  toast({
                    description: (
                      <div>
                        <h2 className="font-semibold text-md">
                          <span><CheckCircleIcon className="h-6 w-6 mr-2 text-red-500 inline" /></span>
                          Error! intenta nuevamente
                        </h2>
                      </div>
                    ),
                  })
                }
              }
            }}>
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default BanUserAlert;
