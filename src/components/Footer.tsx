import { Facebook, Instagram, Twitter } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="hidden lg:block max-w-44">
            <h1 className="font-bold text-lg mb-2">MartinaML</h1>
            <p className="text-sm text-primary-foreground/70">
              Tu tienda de moda favorita con las mejores tendencias para toda la
              familia.
            </p>
          </div>

          <div>
            <h1 className="font-bold text-sm mb-3">Categorías</h1>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground/70 hover:underline cursor-pointer transition-colors">
                Mujer
              </li>
              <li className="text-sm text-primary-foreground/70 hover:underline cursor-pointer transition-colors">
                Hombre
              </li>
              <li className="text-sm text-primary-foreground/70 hover:underline cursor-pointer transition-colors">
                Zapatillas
              </li>
            </ul>
          </div>

          <div>
            <h1 className="font-bold text-sm mb-3">Información</h1>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground/70 hover:underline cursor-pointer transition-colors">
                About
              </li>
              <li className="text-sm text-primary-foreground/70 hover:underline cursor-pointer transition-colors">
                Privacidad y Política
              </li>
              <li className="text-sm text-primary-foreground/70 hover:underline cursor-pointer transition-colors">
                Términos de uso
              </li>
              <li className="text-sm text-primary-foreground/70 hover:underline cursor-pointer transition-colors">
                Delivery y Devoluciones
              </li>
            </ul>
          </div>

          <div>
            <h1 className="font-bold text-sm mb-3">Otros</h1>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground/70 hover:underline cursor-pointer transition-colors">
                FAQ
              </li>
              <li className="text-sm text-primary-foreground/70 hover:underline cursor-pointer transition-colors">
                Servicio al cliente
              </li>
            </ul>
          </div>

          <div>
            <h1 className="font-bold text-sm mb-3">Contactos</h1>
            <ul className="space-y-2">
              <li className="text-sm text-primary-foreground/70">
                +54 3875850811
              </li>
              <li className="text-sm text-primary-foreground/70">
                mauroagustin.lopez.456@gmail.com
              </li>
              <li className="text-sm text-primary-foreground/70">
                Mon. - Fri. 9AM-6PM
              </li>
            </ul>

            <div className="hidden lg:flex lg:gap-3 mt-4">
              <Instagram className="w-5 h-5 hover:scale-110 transition-all cursor-pointer" />
              <Facebook className="w-5 h-5 hover:scale-110 transition-all cursor-pointer" />
              <Twitter className="w-5 h-5 hover:scale-110 transition-all cursor-pointer" />
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-primary-foreground/20" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">
            2024 MartinaML. Todos los derechos reservados.
          </p>
          <div className="flex lg:hidden gap-3">
            <Instagram className="w-5 h-5 hover:scale-110 transition-all cursor-pointer" />
            <Facebook className="w-5 h-5 hover:scale-110 transition-all cursor-pointer" />
            <Twitter className="w-5 h-5 hover:scale-110 transition-all cursor-pointer" />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
