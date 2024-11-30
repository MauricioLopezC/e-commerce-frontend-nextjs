'use client'
import { logOut } from "@/lib/actions/auth.actions";

function LogOutButton() {
  return (
    <div className="flex justify-center items-center mt-6">
      <button
        className="px-6 py-2 bg-black text-white rounded-md"
        onClick={async () => {
          await logOut()
        }}
      >
        CERRAR SESION
      </button>
    </div>
  )
}

export default LogOutButton
