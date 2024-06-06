import { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import useSWR from "swr";
import { fetcher } from "../../hooks/Fetcher";
import Cliente from "../../components/Cliente";
import useCompraVenta from "../../hooks/useCompraVenta";

export default function ClientesRegistrados() {
  const {handleSetCliente, handleClickModalCliente, deleteCliente, handleSetUrl} = useCompraVenta();
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUrl, setCurrentUrl] = useState(`api/clientes?page=${page}&search=${searchTerm}`);

  //usamos hook useEffect para control de cambios en page o searchTerm
  useEffect(() => {
    setCurrentUrl(`api/clientes?page=${page}&search=${searchTerm}`);
  }, [page, searchTerm]);

  //llamamos la url de la api
  const {data:clientesData, error:clientesDataError} = useSWR(
    currentUrl, fetcher
  );

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= clientesData.last_page) {
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
      <h1 className="mb-4 text-center text-4xl font-black py-10">Clientes Registrados</h1>

      <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 w-4/5 m-auto">
        <div className='mb-4 flex flex-col text-center'>
          <label
              className="text-slate-800 text-xl font-normal"
              htmlFor="search"
          >Busca por nombre o cedula</label>
          <input 
              id='search'
              className="m-auto mt-2 w-96 p-3 bg-gray-50" 
              type="text" 
              value={searchTerm} 
              onChange={handleSearchChange}
              placeholder="Buscar usuarios..." 
          />
        </div>
        <div className='overflow-auto'>
          <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
            <thead>
              <tr>
                  <th className="text-left py-2 px-4 border-b">Cedula</th>
                  <th className="text-left py-2 px-4 border-b">Nombre</th>
                  <th className="text-left py-2 px-4 border-b">Apellido</th>
                  <th className="text-left py-2 px-4 border-b">Telefono</th>
                  <th className="text-left py-2 px-4 border-b">Direccion</th>
                  <th className="text-left py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            {!clientesData ? (
                <tbody>
                    <tr>
                        <td colSpan={6} className='text-center'>
                            <Spinner/>
                        </td>
                    </tr>
                </tbody>
            ): (
                <tbody>
                    {clientesData.data.map(clienteData => (
                       //6 props para el componente Cliente
                        <Cliente
                            key={clienteData.id}
                            cliente={clienteData}
                            handleCliente={{handleSetCliente}}
                            handelModal={{handleClickModalCliente}}
                            deleteCli={{deleteCliente}}
                            urlP={{currentUrl}}
                            handleUrl={{handleSetUrl}}
                        />
                    ))}
                </tbody>
            )}
          </table>
        </div>
        {clientesData && (
          <div className="my-1 flex justify-center space-x-2">
            <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className={`px-4 py-2 border rounded ${page === 1 ? 'bg-gray-300 text-white' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
            >
                Anterior
            </button>
            {/* Esto crea un array de números de página desde 1 hasta usersData.last_page y luego mapea cada número de página a un botón*/}
            {Array.from({ length: clientesData.last_page }, (_, i) => i + 1).map(pageNumber => {
                // Solo muestra los números de página si están cerca del número de página actual, o si son el primer o último número de página
                if (pageNumber === 1 || pageNumber === clientesData.last_page || (pageNumber >= page - 1 && pageNumber <= page + 1)) {
                    //al ser una iteracion el pageNumber representa los numeros de las paginas a las que se puede dar click
                    return (
                        <button
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            disabled={pageNumber === page}
                            className={`px-4 py-2 border rounded ${pageNumber === page ? 'bg-blue-500 text-white' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
                        >
                            {pageNumber}
                        </button>
                    );
                }
            })}
            <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === clientesData.last_page}
                className={`px-4 py-2 border rounded ${page === clientesData.last_page ? 'bg-gray-300 text-white' : 'bg-white text-blue-500 hover:bg-blue-500 hover:text-white'}`}
            >
                Siguiente
            </button>
          </div>
        )}

      </div>
    </>
  )
}