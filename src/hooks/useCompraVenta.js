import { useContext } from "react";
import CompraVentaContext from "../context/CompraVentaProvider";
//creamos un handle para usar el contexto en cualquiera de nuestros componentes de la apliacion
const useCompraVenta = () =>{
    return useContext(CompraVentaContext);
}
export default useCompraVenta;