import { createContext, useState } from "react";
import {toast} from "react-toastify";
import clienteAxios from "../lib/axios";
import {mutate} from "swr";
//Un contexto es un objeto que React utiliza para pasar datos a través del árbol de componentes sin tener que pasar props en cada nivel intermedio.
const CompraVentaContext = createContext();

const CompraVentaProvider = ({children}) => {
    const [cliente, setCliente] = useState({});
    const [modalCliente, setModalCliente] = useState({isOpen: false});
    const [url, setUrl] = useState('');//para almacenar la url a la que haremos el llamado para refrescar los datos

    const createCliente = async ({setErrors, ...props}) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token){
            try {
                const {data} = await clienteAxios.post('api/clientes', {...props},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                //vaciar el arreglo de errores
                setErrors([])
                //añadimos la notificacion de exito
                toast.success(data.message)
                return true;
            } catch (error) {
                setErrors(error.response.data.errors)
            }
        }
    }

    const updateCliente = async ({id, setErrors, ...props}) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token){
            try {
                const {data} = await clienteAxios.patch(`api/clientes/${id}`,{...props},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }   
                });
                //vaciar el arreglo de errores                   
                setErrors([])
                await mutate(url);
                handleCloseModalCliente();
                setUrl('');
                //añadimos la notificacion de exito
                toast.success(data.message)
            } catch (error) {
                setErrors(error.response.data.errors);
            }
        }
    }

    const deleteCliente = async (id, urlD) => {
        const token = localStorage.getItem('AUTH_TOKEN');
        if(token) {
            try {
                const {data} = await clienteAxios.delete(`api/clientes/${id}`, {
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
    //handle to set cliente
    const handleSetCliente = cliente => {
        setCliente(cliente);
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

    const handleSetUrl = url => {
        setUrl(url);
    }

    return (
        <CompraVentaContext.Provider 
            value={{
                createCliente,
                updateCliente,
                deleteCliente,
                handleSetCliente,
                cliente,
                handleClickModalCliente,
                handleCloseModalCliente,
                modalCliente,
                handleSetUrl
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