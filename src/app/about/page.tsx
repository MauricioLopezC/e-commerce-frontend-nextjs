import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"

function AboutPage() {
  return (
    <main className="container mx-auto mb-16 px-4">
      <h1 className="font-bold text-2xl my-8">SOBRE NOSOTROS</h1>
      <div className="grid gap-8 md:grid-cols-2 md:grid-flow-col">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 md:col-start-2">
          <Image
            src='/about-image2.jpg'
            fill
            className="object-cover"
            alt={`product-image`}
            priority
          />
        </div>
        <div className="md:col-start-1 md:self-center">
          <p>
            Bievendios a APRIL productos de todo precio.
          </p>
          <p>
            Vendemos ropa para todas las edades, Hombres Mujeres y niños. Precios acesibles y de buena calidad, tambien tenemos jugetes, pelotas, bazar y mucho mas!
          </p>
          <p>
            Tambien te puedes pasar por nuestro local en Mariano Saravia 1666 B. floresta.
          </p>
          <Button className="w-full max-w-md my-4">MAS</Button>
        </div>
      </div>

      <h1 className="font-bold text-2xl my-8">SUSCRIPCIÓN</h1>
      <div className="grid gap-8 md:grid-cols-2 md:grid-flow-col">
        <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100 ">
          <Image
            src='/about-image1.jpg'
            fill
            className="object-cover"
            alt={`product-image`}
            priority
          />
        </div>
        <div className="md:self-center md:max-w-sm md:mx-auto space-y-3">
          <h3 className="font-bold text-xl py-4">MANTENTE CONECTADO</h3>
          <p>
            Suscríbete a nuestra newsletter y sé el primero en recibir las últimas novedades y ofertas exclusivas
          </p>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="email" placeholder="Email" />
            <Button type="submit">Subscribe</Button>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AboutPage
