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
import { AlertDialogProps } from "./NoStockAlert";
import { useRouter } from "next/navigation";

export function NotLoggedInAlertDialog({ isOpen, setIsOpen }: AlertDialogProps) {
  const router = useRouter()
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>No permitido</AlertDialogTitle>
          <AlertDialogDescription>
            Debes iniciar sesión o registrarte
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => {
            router.push('/auth/login')
          }}>
            Iniciar Sesion
          </AlertDialogAction>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
