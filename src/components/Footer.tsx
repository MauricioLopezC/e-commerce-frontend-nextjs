import { Facebook, Instagram, Twitter } from "lucide-react"

function Footer() {
  return (
    <footer className="w-full bg-[#333232] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 content-center text-white px-8 py-16  gap-y-6 ">
      <div className="hidden lg:inline max-w-44">
        <h1 className="font-bold">April</h1>
        <p className=" text-xs lg:inline">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          neque ea rerum sunt id distinctio, deleniti ut incidunt ipsa quasi,
        </p>
      </div>
      <div>
        <h1 className="font-bold">Category</h1>
        <ul className="text-xs">
          <li>Mujer</li>
          <li>Hombre</li>
          <li>Zapatillas</li>
        </ul>
      </div>
      <div>
        <h1 className="font-bold">Información</h1>
        <ul className="text-xs">
          <li>About</li>
          <li>Privacidad y Política</li>
          <li>Términos de uso</li>
          <li>Delivery & Devoluciones</li>
        </ul>
      </div>

      <div>
        <h1 className="font-bold">Otros</h1>
        <ul className="text-xs">
          <li>FAQ</li>
          <li>Servicio al cliente</li>
        </ul>
      </div>

      <div>
        <h1 className="font-bold">Contactos</h1>
        <ul className="text-xs">
          <li>+54 3875850811</li>
          <li>mauroagustin.lopez.456@gmail.com</li>
          <li>Mon. - Fri. 9AM-6PM</li>
        </ul>

        <ul className="hidden lg:flex lg:gap-1">
          <li>
            <Instagram className="w-6 h-6" />
          </li>
          <li>
            <Facebook className="w-6 h-6" />
          </li>
          <li>
            <Twitter className="w-6 h-6" />
          </li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
