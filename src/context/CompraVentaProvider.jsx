import { createContext, useState, useEffect } from "react";
import {toast} from "react-toastify";
import clienteAxios from "../lib/axios";
import useSWR, {mutate} from "swr";
import { fetcher } from "../hooks/Fetcher";
//Un contexto es un objeto que React utiliza para pasar datos a través del árbol de componentes sin tener que pasar props en cada nivel intermedio.
const CompraVentaContext = createContext();

const CompraVentaProvider = ({children}) => {
    const [cliente, setCliente] = useState({});
    const [producto, setProducto] = useState({});
    const [prestamo, setPrestamo] = useState({});
    const [cuotasP, setCuotasP] = useState([]);
    //Modals
    const [modalCliente, setModalCliente] = useState({isOpen: false});
    const [modalProducto, setModalProducto] = useState({isOpen: false, isEditing: false});
    const [modalPrestamo, setModalPrestamo] = useState({isOpen: false, isEditing: false});
    const [url, setUrl] = useState('');//para almacenar la url a la que haremos el llamado para refrescar los datos

    //llamamos la url de la api
    const {data:pagoCuotasData, error:pagoCuotasDataError} = useSWR('/api/pagoCuota', fetcher);
    useEffect(() => {
        if (pagoCuotasData && pagoCuotasData.data) {
          setCuotasP(pagoCuotasData.data);
        }
    }, [pagoCuotasData]);

    useEffect(() => {
        if (cuotasP.length > 0) {
          const interval = setInterval(() => {
            toast('Cuotas pendientes!');
          }, 10000); // 10000 ms = 10 segundos
    
          // Limpiar el intervalo cuando cuotasP esté vacío
          return () => clearInterval(interval);
        }
      }, [cuotasP]);

    const createData = async ({setErrors, urlAx, ...props}) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token){
            try {
                const {data} = await clienteAxios.post(urlAx, {...props},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                //vaciar el arreglo de errores
                setErrors([]);
                //url por si no es creado por medio de modal
                if(url) {
                    await mutate(url);
                    setUrl('');
                }
                //añadimos la notificacion de exito
                toast.success(data.message)
                return true;
            } catch (error) {
                setErrors(error.response.data.errors)
            }
        }
    }

    const updateData = async ({ setErrors, urlAx, ...props}) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token){
            try {
                const {data} = await clienteAxios.patch(urlAx, {...props},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }   
                });
                //vaciar el arreglo de errores                   
                setErrors([])
                await mutate(url);
                setUrl('');
                //añadimos la notificacion de exito
                toast.success(data.message)
                return true
            } catch (error) {
                setErrors(error.response.data.errors);
            }
        }
    }

    const deleteData = async ({urlAx, urlD}) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token) {
            try {
                const {data} = await clienteAxios.delete(urlAx, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                await mutate(urlD);
                toast.success(data.message);
            } catch (error) {
                console.log(error)
            }
        }
    }

    const pagoCuota = async ({urlD, ...props}) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token){
            try {
                const {data} = await clienteAxios.post(`/api/pagoCuota`, {...props}, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                await mutate(urlD);
                setUrl('');
                toast.success(data.message);
            } catch (error) {
                console.log(error);
            }  
        }
    }
    //handle to set cliente
    const handleSetCliente = cliente => {
        setCliente(cliente);
    }
    //handle to set Producto
    const handleSetProducto = producto => {
        setProducto(producto);
    }
    const handleSetPrestamo = prestamo => {
        setPrestamo(prestamo);
    }
    //handle to open
    const handleClickModalCliente = () => {
        setModalCliente({ isOpen: true });
    }
    //handle to close
    const handleCloseModalCliente = () => {
        setModalCliente({ isOpen: false });
        setUrl('');
    }

    //handle to open
    const handleClickModalProducto = (isEditing) => {
        setModalProducto({ isOpen: true, isEditing });
    }
    //handle to close
    const handleCloseModalProducto = () => {
        setModalProducto({ isOpen: false, isEditing: false });
        setUrl('');
    }

    //handle to open
    const handleClickModalPrestamo = (isEditing) => {
        setModalPrestamo({ isOpen: true, isEditing });
    }
    //handle to close
    const handleCloseModalPrestamo = () => {
        setModalPrestamo({ isOpen: false, isEditing: false });
        setUrl('');
    }

    const handleSetUrl = url => {
        setUrl(url);
    }

    return (
        <CompraVentaContext.Provider 
            value={{
                createData,
                updateData,
                deleteData,
                pagoCuota,
                handleSetCliente,
                handleSetProducto,
                handleSetPrestamo,
                producto,
                cliente,
                prestamo,
                handleClickModalCliente,
                handleCloseModalCliente,
                handleClickModalProducto,
                handleCloseModalProducto,
                handleClickModalPrestamo,
                handleCloseModalPrestamo,
                modalCliente,
                modalProducto,
                modalPrestamo,
                handleSetUrl,
                cuotasP
            }}>{/* Prop value: Este es el valor que se va a pasar a través del contexto. generalmente aquí es donde se ponen los datos y funciones que quieres compartir con otros componentes. */}
            {/* CompraVentaContext.Provider provee el valor del contexto a todos los componentes hijos que están envueltos por él. Cualquier componente que esté dentro de CompraVentaProvider tendrá acceso al contexto CompraVentaContext. */}
            {children}{/* representa los componentes hijos que serán envueltos por el CompraVentaProvider. En React, children es una prop especial que se usa para representar los nodos hijos de un componente. */}
        </CompraVentaContext.Provider>
    );
}
export {
    CompraVentaProvider
}
export default CompraVentaContext