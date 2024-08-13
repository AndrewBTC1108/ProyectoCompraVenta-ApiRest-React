import { Link } from "react-router-dom"
import { useEffect, useState } from 'react';
import useCompraVenta from "../../hooks/useCompraVenta"
import { useNavigate} from "react-router-dom";
import { formatearDinero } from "../../helpers";
import useSWR from "swr";
import { fetcher } from "../../hooks/Fetcher";
import PagoCuotas from "../../components/Prestamos/PagoCuotas";

export default function InfoPrestamo() {
  const { prestamo, pagoCuota } = useCompraVenta();
  const [url, setUrl] = useState('');
  //recomendado siempre usar Navigate con useEffect
  const navigate = useNavigate();
  useEffect(() => {
    if (!prestamo) {
        navigate('/prestamo');
    } else {
        const prestamo_id = prestamo.id;
        setUrl(`api/prestamos/${prestamo_id}`);
    }
  }, [prestamo, url]);
  //llamamos la url de la api
  const {data:prestamoData, error:prestamoDataError} = useSWR(url, fetcher);

  let cuotas = prestamoData ? prestamoData : [];
  return (
    <>
      <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 m-auto w-5/6">
        <Link
            to={'/prestamo'}
        >
            <button
                className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
            >Volver</button>
        </Link>

        <div className="flex flex-col items-start">
            <p className="pt-4"><span className="font-black">Producto: </span>{ prestamo.producto?.nombre || 'N/A' }</p>
            <p className="pt-4"><span className="font-black">Valor prestado: </span>{ formatearDinero(prestamo.valor_prestado) }</p>
            <p className="pt-4"><span className="font-black">Porcentaje interes: </span>{ prestamo.porcentaje }%</p>
            <p className="pt-4"><span className="font-black">Total: </span>{ formatearDinero(prestamo.total) }</p>
        </div>
        <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
          <thead>
            <tr>
                <th className="text-left py-2 px-4 border-b">Numero Cuota</th>
                <th className="text-left py-2 px-4 border-b">Fecha de pago</th>
                <th className="text-left py-2 px-4 border-b">Valor a pagar</th>
                <th className="text-left py-2 px-4 border-b">Pagado</th>
            </tr>
          </thead>
          <tbody>
            {cuotas.map(cuota => (
              <PagoCuotas 
                key={cuota.id}
                cuota={cuota}
                pagoCuotaPrestamo={{pagoCuota}}
              />
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
