import { useState, useEffect } from "react";
import useSWR from "swr";
import { fetcher } from "../../hooks/Fetcher";
import useCompraVenta from "../../hooks/useCompraVenta";
import InputError from "../InputError";
export default function ModalPrestamo({isEditing = false}) {
    const { handleCloseModalPrestamo, createData, updateData, prestamo, cliente, handleSetUrl} = useCompraVenta();
    useEffect(() => {
        if (cliente && cliente.id) {
            handleSetUrl(`api/prestamos?cliente_id=${cliente.id}&pagePActive=1&pagePPrevious=1`);
        }
    }, [cliente, handleSetUrl]);
    //llamamos la url de la api
    const {data:productosPrestammoData, error:productosPrestammoDataError} = useSWR(
        `api/productosPrestamo?cliente_id=${cliente.id}`, fetcher
    );
    // use availablePetsData en the component
    let availableProducts = productosPrestammoData ? productosPrestammoData : [];
    //manejamos un objeto el cual iremos mapeando con los datos que vayamos a editar cff
    const [formData, setFormData] = useState({
        fecha: '',
        valor_prestado: '',
        cuotas: '',
        porcentaje: '',
        producto_id: '',
        cliente_id : cliente.id
    });
    const [errors, setErrors] = useState([]);
    //para verificar si ha sido modificado la info del cliente
    const [isModified, setIsModified] = useState(false);
    useEffect(() => {
        if(prestamo && isEditing){
            setFormData({
                fecha: prestamo.fecha || '',
                valor_prestado: prestamo.valor_prestado || '',
                cuotas: prestamo.cuotas || '',
                producto_id: prestamo.producto_id || '',
                cliente_id: cliente.id || ''
            });
            setIsModified(false); // Reset the modified state
        }
    }, [prestamo, isEditing]);
    //detectar cambios
    const handleChange = (e) => {
        //destructurin a name y vaule de e.target
        const { name, value } = e.target;
        setFormData((prevData) => {
            const newData = { ...prevData, [name]: value };
            setIsModified(true);
            return newData;//se retornara los cambios hechos a formData
        });
    };
    const handleSubmit = async (e) => {
        //prevenir accion por default
        e.preventDefault();

        if(isEditing){
            //objeto vacio el cual iremos mapeando
            const updatedData = {};
            //iteramos a formData
            for (const key in formData) {
                //validamos que la info de formData[key] sea diferente a la info del cliente[key] sus valores
                if (formData[key] !== cliente[key]) {
                    //insertamos la nueva info en updateData[key]
                    updatedData[key] = formData[key];
                }
            }

            const success = await updateData({
                ...updatedData,//enviamos la info que hemos cambiado solamente
                setErrors,
                urlAx : `api/prestamos/${prestamo.id}`
            });
            if(success){
                //cerrar modal
                handleCloseModalPrestamo()
            }
        } else {
            const success = await createData({
                ...formData,
                setErrors,
                urlAx: 'api/prestamos'
            });
            if(success){
                //cerrar modal
                handleCloseModalPrestamo()
            }
        }
    };
    return (
        <>
            <div className="flex justify-end">
                <button
                    onClick={handleCloseModalPrestamo}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
            </div>
            <h1 className="text-center text-4xl font-black">{isEditing ? "Cambiar Datos" : "Crear Prestamo"}</h1>
            <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 m-auto">
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-2 gap-4"
                >
                    <div className="flex flex-col">
                        <label 
                            className="text-slate-800 text-2xl" 
                            htmlFor="fecha"
                        >Fecha:</label>
                        <input
                            type="date"
                            id="fecha"
                            name="fecha"
                            value={formData.fecha}
                            placeholder="Nombre del Producto"
                            onChange={handleChange}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                        />
                        <InputError messages={errors.fecha} className="mt-2" />
                    </div>
                    <div className="flex flex-col">
                        <label 
                            className="text-slate-800 text-2xl" 
                            htmlFor="valor_prestado"
                        >Valor a prestar:</label>
                        <input
                            type="text"
                            id="valor_prestado"
                            name="valor_prestado"
                            value={formData.valor_prestado}
                            placeholder="Digita el valor a prestar..."
                            onChange={handleChange}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                        />
                        <InputError messages={errors.valor_prestado} className="mt-2" />
                    </div>
                    <div className="flex flex-col">
                        <label 
                            className="text-slate-800 text-2xl" 
                            htmlFor="cuotas"
                        >Cuotas:</label>
                        <select 
                            name="cuotas" 
                            id="cuotas"
                            value={formData.cuotas}
                            onChange={handleChange}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                        >
                            <option>--Seleccione las cuotas--</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <InputError messages={errors.cuotas} className="mt-2" />
                    </div>
                    <div className="flex flex-col">
                        <label 
                            className="text-slate-800 text-2xl" 
                            htmlFor="porcentaje"
                        >Porcentaje:</label>
                        <select 
                            name="porcentaje" 
                            id="porcentaje"
                            value={formData.porcentaje}
                            onChange={handleChange}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                        >
                            <option>--Seleccione el porcentaje de interes--</option>
                            <option value="7">7</option>
                        </select>
                        <InputError messages={errors.porcentaje} className="mt-2" />
                    </div>
                    <div className="flex flex-col">
                        <label 
                            className="text-slate-800 text-2xl" 
                            htmlFor="producto_id"
                        >Producto:</label>
                        <select 
                            name="producto_id" 
                            id="producto_id"
                            value={formData.producto_id}
                            onChange={handleChange}
                            className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                        >
                            <option>--Seleccione un Producto del cliente--</option>
                            {availableProducts.map(producto => (
                                <option 
                                    key={producto.id} 
                                    value={producto.id}
                                >{producto.nombre}</option>
                            ))}
                        </select>
                        <InputError messages={errors.producto_id} className="mt-2" />
                    </div>
                    <input
                        type="submit"
                        value={ isEditing ? 'Guardar Cambios' : 'Crear Prestamo'}
                        className={`bg-sky-600 hover:bg-sky-700 border rounded-xl text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer ${!isModified && isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!isModified && isEditing}
                    />
                </form>
            </div>
        </>
    )
}
