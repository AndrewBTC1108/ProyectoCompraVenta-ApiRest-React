import { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import Spinner from "../../components/Spinner";
import { fetcher } from '../../hooks/Fetcher';
import Paginador from '../../components/Paginador';
import useCompraVenta from '../../hooks/useCompraVenta';
import PrestamoActivo from '../../components/Prestamos/PrestamoActivo';
import PrestamoAnterior from '../../components/Prestamos/PrestamoAnterior';
export default function Prestamos() {
    const { cliente, handleSetCliente, handleSetUrl, handleClickModalPrestamo, handleSetPrestamo, deleteData } = useCompraVenta();
    const [pagePActive, setPagePActive] = useState(1);//para prestamos Activos
    const [pagePPrevious, setPagePPrevious] = useState(1);//para prestamos Activos
    const [url, setUrl] = useState(`api/prestamos?cliente_id=${cliente?.id}&pagePActive=${pagePActive}&pagePPrevious=${pagePPrevious}`);
    //recomendado siempre usar Navigate con useEffect
    const navigate = useNavigate();
    useEffect(() => {
        if (!cliente) {
            navigate('/clientesRegistrados');
        } else {
            setUrl(`api/prestamos?cliente_id=${cliente.id}&pagePActive=${pagePActive}&pagePPrevious=${pagePPrevious}`);
        }
    }, [cliente, pagePActive, pagePPrevious]);

    //llamamos la url de la api
    const {data:prestamosData, error:prestamosDataError} = useSWR(
        url, fetcher
    );

    const handlePagePAChange = newPage => {
        if (newPage >= 1 && newPage <= prestamosData.prestamosActivos.last_page) {
            //changes the value of page to newPage, which in turn causes the component to re-render with the new data page.
            setPagePActive(newPage);
        }
    };

    const handlePagePPVChange = newPage => {
        if (newPage >= 1 && newPage <= prestamosData.prestamosAnteriores.last_page) {
            //changes the value of page to newPage, which in turn causes the component to re-render with the new data page.
            setPagePPrevious(newPage);
        }
    };

    return (
    <>
        <h1 className="mb-4 text-center text-4xl font-black my-5">{cliente.nombre} {cliente.apellido}</h1>
        <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 m-auto">
            <Link
                onClick={() => {handleSetCliente({})}}
                to={'/clientesRegistrados'}
            >
                <button
                    className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
                >Volver</button>
            </Link>
            <div className='pb-10'>
                <h1 className="text-center text-4xl font-black my-5">Prestamos Activos</h1>
                <div className='overflow-auto'>
                    <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
                        <thead>
                            <tr>
                                <th className="text-left py-2 px-4 border-b">Fecha</th>
                                <th className="text-left py-2 px-4 border-b">Valor prestado</th>
                                <th className="text-left py-2 px-4 border-b">Cuotas</th>
                                <th className="text-left py-2 px-4 border-b">Porcentaje</th>
                                <th className="text-left py-2 px-4 border-b">Producto en prenda</th>
                                <th className="text-left py-2 px-4 border-b">Total</th>
                                <th className="text-left py-2 px-4 border-b">Acciones</th>
                            </tr>
                        </thead>
                        {!prestamosData ? (
                            <tbody>
                                <tr>
                                    <td colSpan={6} className='text-center'>
                                        <Spinner/>
                                    </td>
                                </tr>
                            </tbody>
                        ): (
                            <tbody>
                                {prestamosData.prestamosActivos.data.map(prestamoData => (
                                //6 props para el componente Cliente
                                    <PrestamoActivo
                                        key={prestamoData.id}
                                        prestamo={prestamoData}
                                        handleModal={{handleClickModalPrestamo}}
                                        handleSetP={{handleSetPrestamo}}
                                        urlP={{url}}
                                        handleUrl={{handleSetUrl}}
                                        deleteD={{deleteData}}
                                    />
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            {prestamosData && (
                <Paginador 
                    totalPages={prestamosData.prestamosActivos.last_page} 
                    currentPage={pagePActive} 
                    onPageChange={handlePagePAChange} 
                />
            )}
            <div className='pb-10'>
                <h1 className="text-center text-4xl font-black my-5">Prestamos Anteriores</h1>
                <div className='overflow-auto'>
                    <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
                        <thead>
                            <tr>
                                <th className="text-left py-2 px-4 border-b">Fecha</th>
                                <th className="text-left py-2 px-4 border-b">Valor prestado</th>
                                <th className="text-left py-2 px-4 border-b">Cuotas</th>
                                <th className="text-left py-2 px-4 border-b">Porcentaje</th>
                                <th className="text-left py-2 px-4 border-b">Producto en prenda</th>
                                <th className="text-left py-2 px-4 border-b">Total</th>
                                <th className="text-left py-2 px-4 border-b">Acciones</th>
                            </tr>
                        </thead>
                        {!prestamosData ? (
                            <tbody>
                                <tr>
                                    <td colSpan={6} className='text-center'>
                                        <Spinner/>
                                    </td>
                                </tr>
                            </tbody>
                        ): (
                            <tbody>
                                {prestamosData.prestamosAnteriores.data.map(prestamoData => (
                                //6 props para el componente Cliente
                                    <PrestamoAnterior
                                        key={prestamoData.id}
                                        prestamo={prestamoData}
                                        urlP={{url}}
                                        handleUrl={{handleSetUrl}}
                                        deleteD={{deleteData}}
                                    />
                                ))}
                            </tbody>
                        )}
                    </table>
                </div>
            </div>
            {prestamosData && (
                <Paginador 
                    totalPages={prestamosData.prestamosAnteriores.last_page} 
                    currentPage={pagePPrevious} 
                    onPageChange={handlePagePPVChange} 
                />
            )}
            <div className='flex justify-center py-5'>
                <button
                    onClick={() =>{handleClickModalPrestamo(false)}}
                    className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
                >Crear Prestamo</button>
            </div>
        </div>
    </>
    )
}
