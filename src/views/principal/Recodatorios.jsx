import CuotaPendiente from "../../components/Prestamos/CuotaPendiente";
import useCompraVenta from "../../hooks/useCompraVenta";

export default function Recodatorios() {
  const { cuotasP } = useCompraVenta();
  return (
    <>
      <h1 className="mb-4 text-center text-4xl font-black py-10">Recodatorios</h1>
      <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 m-auto w-5/6">
        {cuotasP && cuotasP.length > 0 ? (
          <table className="bg-white m-auto shadow-md rounded-md mt-10 px-5 py-10 min-w-full">
            <thead>
              <tr>
                  <th className="text-left py-2 px-4 border-b">Cedula</th>
                  <th className="text-left py-2 px-4 border-b">Nombre</th>
                  <th className="text-left py-2 px-4 border-b">Telefono</th>
                  <th className="text-left py-2 px-4 border-b">Fecha a pagar</th>
                  <th className="text-left py-2 px-4 border-b">Valor</th>
                  <th className="text-left py-2 px-4 border-b">Notificar</th>
              </tr>
            </thead>
            <tbody>
              {cuotasP.map(cuota => (
                <CuotaPendiente 
                  key={cuota.id}
                  cuotaP={cuota}
                />
              ))}
            </tbody>
          </table>
        ) : (<p className="text-center text-xl">No hay recordatorios pendientes</p>)}
      </div>
    </>
  )
}
