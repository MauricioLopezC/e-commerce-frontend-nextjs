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
import { banUser, unBanUser } from "@/lib/actions/user.actions";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon, UserCheckIcon, UserRoundX } from "lucide-react";


export interface AlertDialogProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  userId: number | null;
}

function UnBanUserAlert({ isOpen, setIsOpen, userId }: AlertDialogProps) {
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
                const { user, error } = await unBanUser(userId)
                if (user) {
                  toast({
                    description: (
                      <div>
                        <h2 className="font-semibold text-md">
                          <span><UserCheckIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
                          Usuario desbloqueado!
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

export default UnBanUserAlert;
