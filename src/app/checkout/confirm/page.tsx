import { Button } from '@/components/ui/button'
import { PartyPopperIcon } from 'lucide-react'
import Link from 'next/link'

function ConfirmPage() {
  return (
    <section className='min-h-[70vh] container mx-auto flex flex-col items-center'>
      <div className='flex items-center justify-center mt-16 space-x-2'>
        <h1 className='font-bold text-xl'>Compra confirmada, muchas gracias por su compra!</h1>
        <PartyPopperIcon className='w-6 h-6' />
      </div>
      <h2 className='font-bold text-lg'>Revise su correo electronico</h2>
      <h2 className='font-bold text-lg'>También puede ver su historial</h2>
      <Link href={'/products'}>
        <Button className='mt-4'>
          Seguir comprando
        </Button>
      </Link>

      <Link href={'/orders'}>
        <Button className='mt-4'>
          Historial
        </Button>
      </Link>

    </section>
  )

}

export default ConfirmPage
