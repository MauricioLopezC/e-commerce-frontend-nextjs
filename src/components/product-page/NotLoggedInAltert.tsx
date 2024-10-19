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
            Debes iniciar sesion o registrarte para agreagar productos al carrito
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={() => {
            router.push('/auth/login')
          }}>
            Iniciar Sesion
          </AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
