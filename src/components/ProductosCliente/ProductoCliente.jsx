import Swal from 'sweetalert2'
export default function ProductoCliente({producto, handleProducto, handleModalPro, deletePro, urlP, handleUrl}) {
    const {id, nombre, tipo, observaciones} = producto;
    const { handleSetProducto } = handleProducto;
    const { handleClickModalProducto } = handleModalPro;
    const { deleteData } = deletePro;
    const {currentUrl} = urlP;//url de los datos para refrescarlos cuando se haga una accion sea editar o eliminar
    const {handleSetUrl} = handleUrl;

    const handleEdit = () => {
        handleSetProducto(producto)
        handleClickModalProducto(true)//isEditing
        handleSetUrl(currentUrl)
    }
    //handle para eliminar
    const handleDelete = () => {
        //usamos sweet alert
        Swal.fire({
            title: "Estas seguro?",
            text: "Se eliminara el producto y todo lo relacionado a el",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData({
                    urlAx: `api/productos/${id}`, 
                    urlD: currentUrl
                });//borrar cliente, pasamos id y url, de esta manera no me dio error de retraso en tiempo
            }
        });
    }
  return (
    <>
        <tr>
            <td className="text-left py-2 px-4 border-b">{nombre}</td>
            <td className="text-left py-2 px-4 border-b">{tipo}</td>
            <td className="text-left py-2 px-4 border-b">{observaciones}</td>
            <td className="text-left py-2 px-4 border-b flex gap-2">
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
