import { formatearDinero } from "../../helpers";
import useCompraVenta from "../../hooks/useCompraVenta";
export default function PagoCuotas({cuota, pagoCuotaPrestamo}) {
  const { prestamo } = useCompraVenta();
  let prestamo_id = prestamo.id;
  const {id, numero_cuota, fecha_pago, monto_pago, pagado} = cuota;
  const { pagoCuota } = pagoCuotaPrestamo;

  const pagarCuota = () => {
    pagoCuota({prestamo_id, cuota_id: id, urlD: `api/prestamos/${prestamo_id}`});
  }
  return (
    <>
      <tr>
        <td className="text-left py-2 px-4 border-b">{numero_cuota}</td>
        <td className="text-left py-2 px-4 border-b">{fecha_pago}</td>
        <td className="text-left py-2 px-4 border-b">{formatearDinero(monto_pago)}</td>
        <td className="text-left py-2 px-4 border-b">
          {pagado == 0 ?
            <button
              onDoubleClick={pagarCuota}
              className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
            >Pagar Cuota</button> :
            <p><span className="text-xl font-black text-green-700">Pagado</span></p>}
        </td>
      </tr>
    </>
  )
}
