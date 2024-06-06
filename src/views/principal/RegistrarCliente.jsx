import useCompraVenta from "../../hooks/useCompraVenta";
import InputError from "../../components/InputError";
import { useState } from "react";
export default function RegistrarCliente() {
  const { createCliente } = useCompraVenta();//use the context
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion_residencia, setDireccion_residencia] = useState('');
  const [errors, setErrors] = useState([]);

  const handleCreateCliente = async (e) => {
    e.preventDefault();
    const success = await createCliente({
      cedula,
      nombre,
      apellido,
      telefono,
      direccion_residencia,
      setErrors
    });
    if(success){
      setCedula('');
      setNombre('');
      setApellido('');
      setTelefono('');
      setDireccion_residencia('');
    }
  }

  return (
    <>
      <h1 className="mb-4 text-center text-4xl font-black py-10">Registrar Cliente</h1>

      <div className="bg-gray-300 shadow-md rounded-md mt-10 px-5 py-10 w-4/6 m-auto">
        <form
          onSubmit={handleCreateCliente}
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
              value={cedula}
              placeholder="Cedula del cliente"
              onChange={e => setCedula(e.target.value)}
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
              value={nombre}
              placeholder="Nombre del cliente"
              onChange={e => setNombre(e.target.value)}
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
              value={apellido}
              placeholder="Apellido del cliente"
              onChange={e => setApellido(e.target.value)}
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
              value={telefono}
              placeholder="Telefono del cliente"
              onChange={e => setTelefono(e.target.value)}
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
              value={direccion_residencia}
              onChange={e => setDireccion_residencia(e.target.value)}
              placeholder="Direccion de residencia"
              className="mt-2 w-full p-3 bg-gray-100 border border-black rounded-lg"
            />
            <InputError messages={errors.direccion_residencia} className="mt-2" />
          </div>
          <input
            type="submit"
            value="Registrar"
            className="bg-sky-600 hover:bg-sky-700 boder rounded-xl text-white w-full mt-5 p-3
            uppercase font-bold cursor-pointer"
          />
        </form>
    </div>
    </>
  )
}
