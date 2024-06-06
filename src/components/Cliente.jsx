import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
export default function Cliente({cliente, handleCliente, handelModal, deleteCli, urlP, handleUrl }) {
    const {id, cedula, nombre, apellido, telefono, direccion_residencia} = cliente;
    const { handleSetCliente } = handleCliente;
    const { handleClickModalCliente } = handelModal;
    const { deleteCliente } = deleteCli;
    const {currentUrl} = urlP;//url de los datos para refrescarlos cuando se haga una accion sea editar o eliminar
    const {handleSetUrl} = handleUrl;

    //handle apra editar
    const handleEdit = () => {
      handleSetCliente(cliente);//colocar el clinente seleccionado y su info en el hook
      handleClickModalCliente();//abrir modal
      handleSetUrl(currentUrl);//mandamos url para el mutate(), para llamar manual cuando se edite info
    };
    //handle para eliminar
    const handleDelete = () => {
      //usamos sweet alert
      Swal.fire({
        title: "Estas seguro?",
        text: "Se eliminara el cliente y todo lo relacionado a el",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar!"
      }).then((result) => {
        if (result.isConfirmed) {
          deleteCliente(id, currentUrl);//borrar cliente, pasamos id y url, de esta manera no me dio error de retraso en tiempo
        }
      });
    }

  return (
    <>
        <tr>
            <td className="text-left py-2 px-4 border-b">{cedula}</td>
            <td className="text-left py-2 px-4 border-b">{nombre}</td>
            <td className="text-left py-2 px-4 border-b">{apellido}</td>
            <td className="text-left py-2 px-4 border-b">{telefono}</td>
            <td className="text-left py-2 px-4 border-b">{direccion_residencia}</td>
            <td className="text-left py-2 px-4 border-b flex gap-2">
            <Link>
                <button
                    className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
                >Prestamo</button>
              </Link>
              <button
                  onClick={handleEdit}
                  className="bg-customColor hover:bg-customColorShadow text-white px-2 py-1 rounded"
              >Editar</button>
              <button
                  onDoubleClick={handleDelete}
                  className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded"
              >Eliminar</button>
            </td>
        </tr>
    </>
  )
}
