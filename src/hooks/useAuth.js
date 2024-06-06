import { useEffect } from "react";
import useSWR from 'swr' //Hook de SWR (stale-while-revalidate) para realizar solicitudes de datos con caché automática.
import { useNavigate} from "react-router-dom"; //Hook de React Router para navegar entre rutas.
import { fetchUser } from "./authService";
import clienteAxios from "../lib/axios";

//funcion arrow
//hook que se exporta, toma 2 argumentos como props, middleware y url
export const useAuth = ({middleware, redirectIfAuthenticated}) => {
    //tomamos token
    let token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate() //para enviar al usuario a cualquier url

    //licitamos el usuario autentiado actual
    const { data: user, error, mutate } = useSWR(
        token ? '/api/user' : null,
        () => fetchUser(token),
        {
            shouldRetryOnError: false,
        }
    );

    const csrf = async () => {
        await clienteAxios.get('/sanctum/csrf-cookie');
    };

    const login = async ({setErrors, ...props}) => {
        await csrf()

        setErrors([])

        try {
            await mutate()//forzar a que haga la accion de lvalidacion mas rapido
            const { data } = await clienteAxios.post('/api/login', props) //para obtener el token
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrors([])//reiniciar el arreglo de errores
            token = localStorage.getItem('AUTH_TOKEN')
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data.errors)
        }
    }

    const logout = async () => {
        await csrf()
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined)
            window.location.pathname = '/auth/login'
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    useEffect(() => {
        if (middleware === 'guest' && redirectIfAuthenticated && user){
            navigate(redirectIfAuthenticated)
        }
        if (middleware === 'auth' && !user) {
            navigate('/auth/login');
        }
                
    },[user, error]);

    return {
        login,
        logout
    }
}