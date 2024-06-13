import { useState, useEffect } from "react";
import useCompraVenta from "../../hooks/useCompraVenta";
import InputError from "../InputError";
export default function ModalProducto({isEditing = false}) {
    const { handleCloseModalProducto, createData, updateData, producto, cliente, handleSetUrl} = useCompraVenta();
    handleSetUrl(`api/productos?page=${1}&search=${""}&cliente_id=${cliente.id}`);
    //manejamos un objeto el cual iremos mapeando con los datos que vayamos a editar cff
    const [formData, setFormData] = useState({
        nombre: '',
        tipo: '',
        observaciones: '',
        cliente_id : cliente.id
    });
    const [errors, setErrors] = useState([]);
    //para verificar si ha sido modificado la info del cliente
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        if(producto && isEditing){
            setFormData({
                nombre: producto.nombre || '',
                tipo: producto.tipo || '',
                observaciones: producto.observaciones || '',
                cliente_id: cliente.id || ''
            });
            setIsModified(false); // Reset the modified state
        }
    }, [producto, isEditing]);
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
                urlAx : `api/productos/${producto.id}`
            });
            if(success){
                //cerrar modal
                handleCloseModalProducto()
            }
        } else {
            const success = await createData({
                ...formData,
                setErrors,
                urlAx: 'api/productos'
            });
            if(success){
                //cerrar modal
                handleCloseModalProducto()
            }
        }
    };
    return (
        <>
            <div className="flex justify-end">
                <button
                    onClick={handleCloseModalProducto}
                >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                </button>
            </div>
            <h1 className="text-center text-4xl font-black">{isEditing ? "Cambiar Datos" : "Crear Producto"}</h1>
            <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 m-auto">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 gap-4"
            >
                <div className="flex flex-col">
                    <label className="text-slate-800 text-2xl" htmlFor="nombre">
                    Nombre:
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        placeholder="Nombre del Producto"
                        onChange={handleChange}
                        className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                    />
                    <InputError messages={errors.nombre} className="mt-2" />
                </div>
                <div className="flex flex-col">
                    <label className="text-slate-800 text-2xl" htmlFor="tipo">
                    Tipo:
                    </label>
                    <select 
                        name="tipo" 
                        id="tipo"
                        value={formData.tipo}
                        onChange={handleChange}
                        className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                    >
                        <option>--Seleccione el tipo--</option>
                        <option value="joya">joya</option>
                        <option value="vehiculo">vehiculo</option>
                        <option value="electrodomestico">electrodomestico</option>
                    </select>
                    <InputError messages={errors.tipo} className="mt-2" />
                </div>
                <div className="flex flex-col">
                    <label className="text-slate-800 text-2xl" htmlFor="observaciones">
                    Observaciones:
                    </label>
                    <input
                        type="text"
                        id="observaciones"
                        name="observaciones"
                        value={formData.observaciones}
                        onChange={handleChange}
                        placeholder="observaciones..."
                        className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                    />
                    <InputError messages={errors.observaciones} className="mt-2" />
                </div>
                <input
                    type="submit"
                    value={ isEditing ? 'Guardar Cambios' : 'Crear Producto'}
                    className={`bg-sky-600 hover:bg-sky-700 border rounded-xl text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer ${!isModified && isEditing ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!isModified && isEditing}
                />
            </form>
            </div>
        </>
    )
}
