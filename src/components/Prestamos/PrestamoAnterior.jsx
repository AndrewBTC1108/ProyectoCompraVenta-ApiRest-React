import {formatearDinero} from '../../helpers/index';
import Swal from 'sweetalert2';
export default function PrestamoAnterior({prestamo, urlP, handleUrl, deleteD}) {
    const {id, fecha, valor_prestado, cuotas, porcentaje, total, producto:{nombre}} = prestamo;
    const {url} = urlP;
    const {handleSetUrl} = handleUrl;
    const {deleteData} = deleteD;

    //handle para prestamos
    const capturarPrestamo = () => {
        handleSetPrestamo(prestamo);
    }
    //handle para eliminar
    const handleDelete = () => {
        //usamos sweet alert
        Swal.fire({
        title: "Estas seguro?",
        text: "Se eliminara el prestamo y todo su historial",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Eliminar!"
        }).then((result) => {
            if (result.isConfirmed) {
                deleteData({
                urlAx: `api/prestamos/${id}`, 
                urlD: url
                });//borrar prestamo, pasamos id y url, de esta manera no me dio error de retraso en tiempo
            }
        });
    }
    return (
        <>
            <tr>
                <td className="text-left py-2 px-4 border-b">{fecha}</td>
                <td className="text-left py-2 px-4 border-b">{formatearDinero(valor_prestado)}</td>
                <td className="text-left py-2 px-4 border-b">{cuotas}</td>
                <td className="text-left py-2 px-4 border-b">{porcentaje}%</td>
                <td className="text-left py-2 px-4 border-b">{nombre}</td>
                <td className="text-left py-2 px-4 border-b">{formatearDinero(total)}</td>
                <td className="text-left py-2 px-4 border-b flex gap-2">
                    <button
                        className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
                    >Ver mas Info</button>
                    <button
                        onDoubleClick={handleDelete}
                        className="bg-red-500 hover:bg-red-800 text-white px-2 py-1 rounded"
                    >Eliminar</button>
                </td>
            </tr>    
        </>
    )
}
