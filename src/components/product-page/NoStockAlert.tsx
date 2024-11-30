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
import { Dispatch, SetStateAction } from "react";

export interface AlertDialogProps {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export function NoStockAlertDialog({ isOpen, setIsOpen }: AlertDialogProps) {
  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>No hay stock suficiente</AlertDialogTitle>
          <AlertDialogDescription>
            Lo sentimos no hay stock suficiente para la cantidad seleccionada
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction>OK</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
