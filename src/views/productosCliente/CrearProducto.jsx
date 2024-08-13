import { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";
import useSWR from "swr";
import Spinner from "../../components/Spinner";
import { Link } from 'react-router-dom'
import { fetcher } from '../../hooks/Fetcher';
import useCompraVenta from '../../hooks/useCompraVenta';
import ProductoCliente from '../../components/ProductosCliente/ProductoCliente';
import Paginador from '../../components/Paginador';

export default function CrearProducto() {
  const {cliente, handleSetProducto, handleClickModalProducto, deleteData, handleSetUrl, handleSetCliente} = useCompraVenta();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [currentUrl, setCurrentUrl] = useState(`api/productos?page=${page}&search=${searchTerm}&cliente_id=${cliente.id}`);
  //recomendado siempre usar Navigate con useEffect
  const navigate = useNavigate();

  useEffect(() => {
      if(!cliente) {
          navigate('/clientesRegistrados');
      }
      setCurrentUrl(`api/productos?page=${page}&search=${searchTerm}&cliente_id=${cliente.id}`);
  },[cliente, page, searchTerm]);

  //llamamos la url de la api
  const {data:productosData, error:productosDataError} = useSWR(
    currentUrl, fetcher
  );

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= productosData.last_page) {
        //changes the value of page to newPage, which in turn causes the component to re-render with the new data page.
        setPage(newPage);
    }
  };

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
    setPage(1); // Resets the page to 1 when a new search is made
  };

  return (
    <>
      <h1 className="mb-4 text-center text-4xl font-black my-5">{cliente.nombre} {cliente.apellido}</h1>
      <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 w-4/5 m-auto">
          <Link
              onClick={() => {handleSetCliente({})}}
              to={'/clientesRegistrados'}
          >
              <button
                  className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
              >Volver</button>
          </Link>
          <div className='mb-4 flex flex-col text-center'>
            <label
                className="text-slate-800 text-xl font-normal"
                htmlFor="search"
            >Busca por nombre o tipo</label>
            <input 
                id='search'
                className="m-auto mt-2 w-96 p-3 bg-gray-50" 
                type="text" 
                value={searchTerm} 
                onChange={handleSearchChange}
                placeholder="Digita el nombre o el tipo" 
            />
          </div>
          <div className='overflow-auto'>
            <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
              <thead>
                <tr>
                    <th className="text-left py-2 px-4 border-b">Nombre</th>
                    <th className="text-left py-2 px-4 border-b">Tipo</th>
                    <th className="text-left py-2 px-4 border-b">Observaciones</th>
                    <th className="text-left py-2 px-4 border-b">Acciones</th>
                </tr>
              </thead>
            {!productosData ? (
                <tbody>
                    <tr>
                        <td colSpan={6} className='text-center'>
                            <Spinner/>
                        </td>
                    </tr>
                </tbody>
            ): (
                <tbody>
                    {productosData.data.map(productoData => (
                       //6 props para el componente Cliente
                        <ProductoCliente
                            key={productoData.id}
                            producto={productoData}
                            handleProducto={{handleSetProducto}}
                            handleModalPro={{handleClickModalProducto}}
                            deletePro={{deleteData}}
                            urlP={{currentUrl}}
                            handleUrl={{handleSetUrl}}
                        />
                    ))}
                </tbody>
            )}
            </table>
          </div>
          <div className='flex justify-center py-5'>
            <button
              onClick={() => {handleClickModalProducto(false)}}
              className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
            >Crear Producto</button>
          </div>
          {productosData && (
            <Paginador 
                totalPages={productosData.last_page} 
                currentPage={page} 
                onPageChange={handlePageChange} 
            />
          )}
      </div>
    </>
  )
}
