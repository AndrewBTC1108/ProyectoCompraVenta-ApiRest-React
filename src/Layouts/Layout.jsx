import ReactModal from "react-modal";
import Navigate from "../components/Navigate";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { customStylesModal } from "../helpers/index";
import ModalCliente from "../components/Modals/ModalCliente";
import ModalProducto from "../components/Modals/ModalProducto";
import useCompraVenta from "../hooks/useCompraVenta";
//hojas de estilo css
import "react-toastify/dist/ReactToastify.css"

ReactModal.setAppElement('#root')

export default function Layout() {
  useAuth({middleware:'auth'});
  const { modalCliente, modalProducto } = useCompraVenta();
  const { customStyles } = customStylesModal()
    
  return (
    <>
      <header className="p-4 border-b bg-white shadow">
        <div className="container mx-auto flex flex-col gap-2 justify-between items-center md:flex-row">
          <a className="text-3xl font-black">
              Compraventa
          </a>
          <Navigate />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      <footer className="mt-10 text-center p-5 text-gray-500 font-bold uppercase">
          Compraventa - Todos los derechos reservados.
      </footer>

      <ReactModal isOpen={modalCliente.isOpen} style={customStyles}>
        <ModalCliente />
      </ReactModal>

      <ReactModal isOpen={modalProducto.isOpen} style={customStyles}>
        <ModalProducto 
          isEditing={modalProducto.isEditing} 
        />
      </ReactModal>

      <ToastContainer />
    </>
  )
}
