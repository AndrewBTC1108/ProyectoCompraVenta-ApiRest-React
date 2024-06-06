import React from 'react'
import { useEffect } from 'react';
import { useNavigate} from "react-router-dom";
import { Link } from 'react-router-dom'
import useCompraVenta from '../../hooks/useCompraVenta';
export default function Prestamos() {
    const {cliente, handleSetCliente} = useCompraVenta();
    //recomendado siempre usar Navigate con useEffect
    const navigate = useNavigate();
    useEffect(() => {
        if(!cliente) {
            navigate('/clientesRegistrados');
        }
    },[cliente]);
    
  return (
    <>
        <h1 className="mb-4 text-center text-4xl font-black my-5">{cliente.nombre} {cliente.apellido}</h1>
        <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 w-4/5 m-auto">
            <Link
                onClick={() => {handleSetCliente({})}}
                to={'/clientesRegistrados'}
            >
                <button
                    className="bg-sky-600 hover:bg-sky-700 text-white px-2 py-1 rounded"
                >Volver</button>
            </Link>
        </div>
    </>
  )
}
