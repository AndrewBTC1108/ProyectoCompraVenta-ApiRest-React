import { Outlet } from "react-router-dom"
export default function AuthLayout() {
  return (
    <>
      <main className='max-w-3xl m-auto mt-10 md:mt-28 items-center'>
          <div className='p-10 w-full'>
              <Outlet/>
          </div>
      </main>

      <footer className="mt-10 text-center p-5 text-gray-500 font-bold uppercase">
        Compraventa - Todos los derechos reservados.
      </footer>
    </>
  )
}
