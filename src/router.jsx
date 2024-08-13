import { createBrowserRouter } from "react-router-dom"
import AuthLayout from "./Layouts/AuthLayout";
import Layout from "./Layouts/Layout";//users
import Login from "./views/auth/Login";
import Recodatorios from "./views/principal/Recodatorios";
import RegistrarCliente from "./views/principal/RegistrarCliente"
import ClientesRegistrados from "./views/principal/ClientesRegistrados";
import Inicio from "./views/principal/Inicio"
import Prestamos from "./views/prestamos/Prestamos";
import CrearProducto from "./views/productosCliente/CrearProducto";
import InfoPrestamo from "./views/prestamos/InfoPrestamo";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element:<Inicio />
            },
            {
                path: '/registrarCliente',
                element: <RegistrarCliente/>
            },
            {
                path: '/recordatorios',
                element: <Recodatorios />
            },
            {
                path: '/clientesRegistrados',
                element: <ClientesRegistrados />
            },
            {
                path: '/prestamo',
                element: <Prestamos />
            },
            {
                path: '/infoPrestamo',
                element: <InfoPrestamo />
            },
            {
                path: '/crearProducto',
                element: <CrearProducto/>
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            }
        ]
    },
]);

export default router;