import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Dispatch } from "react";
import { z } from '@/lib/zod/es-zod'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { createCategory } from "@/lib/actions/category.actions";
import { useToast } from "@/hooks/use-toast";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(2).max(100)
})

interface CreateCategoryDialogProps {
  isOpen: boolean;
  setIsOpen: Dispatch<boolean>
}



export function CreateCategoryDialog({ isOpen, setIsOpen }: CreateCategoryDialogProps) {
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: ''
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    const { category } = await createCategory(values)
    if (category) {
      toast({
        description: (
          <div>
            <h2 className="font-semibold text-md">
              <span><CheckCircleIcon className="h-6 w-6 mr-2 text-green-500 inline" /></span>
              Categoría creada
            </h2>
          </div>
        ),
      })
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear Categoría</DialogTitle>
          <DialogDescription>
            Agrega una  nueva categoría si no encuentras la que buscas
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4" id="create-category">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input placeholder="ingresa nombre..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descripción</FormLabel>
                  <FormControl>
                    <Input placeholder="ingresa desc" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button type="submit" form="create-category">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
