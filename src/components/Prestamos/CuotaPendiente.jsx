import { formatearDinero } from "../../helpers";
export default function CuotaPendiente({cuotaP}) {
    const { prestamo_id: { cliente_id: { cedula, nombre, apellido, telefono } }, fecha_pago, monto_pago } = cuotaP;
    return (
        <>
            <tr>
                <td className="text-left py-2 px-4 border-b">{cedula || 'N/A'}</td>
                <td className="text-left py-2 px-4 border-b">{nombre + ' ' + apellido || 'N/A'}</td>
                <td className="text-left py-2 px-4 border-b">{telefono || 'N/A'}</td>
                <td className="text-left py-2 px-4 border-b">{fecha_pago || 'N/A'}</td>
                <td className="text-left py-2 px-4 border-b">{formatearDinero(monto_pago) || 'N/A'}</td>
                <td className="text-left py-2 px-4 border-b">
                    <button
                        className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
                    >Recordar</button>
                </td>
            </tr>       
        </>
    )
}
