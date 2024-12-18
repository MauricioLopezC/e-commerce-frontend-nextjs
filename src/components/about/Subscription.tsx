import { Button } from "../ui/button"
import { Input } from "../ui/input"

function SubscriptionSection() {

  return (
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
  )
}

export default SubscriptionSection
