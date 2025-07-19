
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, Upload } from "lucide-react"
import { useState } from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { uploadImage } from "@/lib/actions/image.actions"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { z } from '@/lib/zod/es-zod'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/hooks/use-toast"


const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

const formSchema = z.object({
  productSkuId: z.coerce.number().int().positive(),
  image: z
    .instanceof(File, { message: "Debes seleccionar una imagen válida." })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file?.type), 'Solo se admiten los formatos .jpg, .jpeg, .png y .webp.')
    .refine((file) => file?.size <= MAX_FILE_SIZE, 'El tamaño máximo de la imagen es 5 MB.')
})

export default function UploadImageDialog({ skus, productId }: { skus: number[], productId: number }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: undefined,
      productSkuId: 0,
    }
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    setIsLoading(true)
    const imageData = new FormData()
    imageData.append('productId', productId.toString())
    imageData.append('file', values.image)
    imageData.append('productSkuId', values.productSkuId.toString())
    const { imageData: createdImageData } = await uploadImage(imageData)
    if (!createdImageData) {
      toast({
        variant: "destructive",
        title: "¡Vaya! Algo salió mal.",
        description: "Hubo un problema al subir la imagen, intente nuevamente mas tarde",
      })
      setIsLoading(false)
      return
    }
    toast({
      variant: "default",
      title: "Imagen subida correctamente",
      description: "Ahora puede ver la nueva imagen del producto",
    })
    setIsLoading(false)
  }

  return (
    <Dialog onOpenChange={() => {
      setIsLoading(false)
    }}>
      <DialogTrigger asChild>
        <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
          <Upload className="h-4 w-4 text-muted-foreground" />
          <span className="sr-only">Upload</span>
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]" aria-description="upload image" aria-describedby="upload">
        <DialogHeader>
          <DialogTitle>Subir Imagen</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productSkuId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sku de la variación</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value.toString()}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select sku of variation" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {skus.map((sku, idx) => (
                        <SelectItem value={sku.toString()} key={idx}>{sku}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormLabel>Imágenes</FormLabel>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      placeholder="img"
                      type='file'
                      accept="image/*"
                      onChange={(event) => {
                        onChange(event.target.files && event.target.files[0])
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {isLoading ?
              <Button disabled>
                <Loader2 className="animate-spin" />
                Subiendo
              </Button>
              : <Button type="submit">Guardar</Button>
            }
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
