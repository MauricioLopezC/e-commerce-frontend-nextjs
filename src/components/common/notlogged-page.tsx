import Link from "next/link"

function NotLoggedPage() {
  return (
    <section className='container mx-auto min-h-[70vh]'>
      <div className='flex justify-center mt-16 space-x-2 items-center'>
        <h1 className=" text-xl font bond">Inicia sesion para continuar</h1>
        <Link href='/auth/login' className="text-sky-500">INICIAR SESION</Link>
      </div>
    </section>
  )
}

export default NotLoggedPage
