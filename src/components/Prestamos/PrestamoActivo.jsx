import { Link } from 'react-router-dom';
import {formatearDinero} from '../../helpers/index';
import Swal from 'sweetalert2';
export default function PrestamoActivo({prestamo, handleModal, handleSetP, urlP, handleUrl, deleteD}) {
    const {id, fecha, valor_prestado, cuotas, porcentaje, total, producto: {nombre}} = prestamo;
    const {handleClickModalPrestamo} = handleModal;
    const {handleSetPrestamo} = handleSetP;
    const {url} = urlP;
    const {handleSetUrl} = handleUrl;
    const {deleteData} = deleteD;
    //handle para prestamos
    const capturarPrestamo = () => {
        handleSetPrestamo(prestamo);
    }
    //handle para editar
    const handleEdit = () => {
    //usamos sweet alert
    Swal.fire({
        title: "Estas seguro?",
        text: "Se Modificara el prestamo y todo lo relacionado a el",
        icon: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Editar"
        }).then((result) => {
            if (result.isConfirmed) {
                handleSetPrestamo(prestamo);//colocar el prestamo seleccionado y su info en el hook
                handleClickModalPrestamo(true);//abrir modal isEditing
                handleSetUrl(url);//mandamos url para el mutate(), para llamar manual cuando se edite info
            }
        });
    };
    //handle para eliminar
    const handleDelete = () => {
        //usamos sweet alert
        Swal.fire({
        title: "Estas seguro?",
        text: "Se eliminara el prestamo y todo lo relacionado a el",
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
                    <Link
                        to={'/infoPrestamo'}
                        onClick={capturarPrestamo}
                    >
                        <button
                            className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
                        >Ver mas Info</button>
                    </Link>
                    <button
                        onDoubleClick={handleEdit}
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
