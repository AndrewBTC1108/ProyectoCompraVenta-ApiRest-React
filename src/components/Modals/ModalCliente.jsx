import { useState, useEffect } from "react";
import useCompraVenta from "../../hooks/useCompraVenta"
import InputError from "../InputError";
export default function ModalCliente() {
    const { handleCloseModalCliente, cliente, updateData} = useCompraVenta();
    //manejamos un objeto el cual iremos mapeando con los datos que vayamos a editar cff
    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        apellido: '',
        telefono: '',
        direccion_residencia: ''
    });
    const [errors, setErrors] = useState([]);
    //para verificar si ha sido modificado la info del cliente
    const [isModified, setIsModified] = useState(false);

    useEffect(() => {
        setFormData({
            cedula: cliente.cedula || '',
            nombre: cliente.nombre || '',
            apellido: cliente.apellido || '',
            telefono: cliente.telefono || '',
            direccion_residencia: cliente.direccion_residencia || ''
        });
        setIsModified(false); // Reset the modified state
    }, [cliente]);

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
            urlAx : `api/clientes/${cliente.id}`
        });
        if(success){
            handleCloseModalCliente()
        }
    };
  return (
    <>
        <div className="flex justify-end">
            <button
                onClick={handleCloseModalCliente}
            >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            </button>
        </div>
        <h1 className="text-center text-4xl font-black">Editar informacion del cliente</h1>
        <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 m-auto">
            <form
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-4"
            >
                <div className="flex flex-col">
                    <label className="text-slate-800 text-2xl" htmlFor="cedula">
                    Cedula:
                    </label>
                    <input
                    type="text"
                    id="cedula"
                    name="cedula"
                    maxLength={10}
                    value={formData.cedula}
                    placeholder="Cedula del cliente"
                    onChange={handleChange}
                    className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                    />
                    <InputError messages={errors.cedula} className="mt-2" />
                </div>
                <div className="flex flex-col">
                    <label className="text-slate-800 text-2xl" htmlFor="nombre">
                    Nombre:
                    </label>
                    <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    placeholder="Nombre del cliente"
                    onChange={handleChange}
                    className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                    />
                    <InputError messages={errors.nombre} className="mt-2" />
                </div>
                <div className="flex flex-col">
                    <label className="text-slate-800 text-2xl" htmlFor="apellido">
                    Apellido:
                    </label>
                    <input
                    type="text"
                    id="apellido"
                    name="apellido"
                    value={formData.apellido}
                    placeholder="Apellido del cliente"
                    onChange={handleChange}
                    className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                    />
                    <InputError messages={errors.apellido} className="mt-2" />
                </div>
                <div className="flex flex-col">
                    <label className="text-slate-800 text-2xl" htmlFor="telefono">
                    Telefono:
                    </label>
                    <input
                    type="text"
                    id="telefono"
                    name="telefono"
                    maxLength={10}
                    value={formData.telefono}
                    placeholder="Telefono del cliente"
                    onChange={handleChange}
                    className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                    />
                    <InputError messages={errors.telefono} className="mt-2" />
                </div>
                <div className="flex flex-col">
                    <label className="text-slate-800 text-2xl" htmlFor="direccion_residencia">
                    Direccion:
                    </label>
                    <input
                    type="text"
                    id="direccion_residencia"
                    name="direccion_residencia"
                    value={formData.direccion_residencia}
                    onChange={handleChange}
                    placeholder="Direccion de residencia"
                    className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
                    />
                    <InputError messages={errors.direccion_residencia} className="mt-2" />
                </div>
                <input
                    type="submit"
                    value="Editar"
                    className={`bg-sky-600 hover:bg-sky-700 border rounded-xl text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer ${!isModified ? 'opacity-50 cursor-not-allowed' : ''}`}
                    disabled={!isModified}
                />
            </form>
        </div>
    </>
  )
}