import InputError from '../../components/InputError'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth';

export default function Login() {
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState([]);
    
    const {login} = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/'
    });

    const submitForm = async e => {
        e.preventDefault()
        login({
            password,
            setErrors
        });
    }
  return (
    <>
      <h1 className="text-4xl font-black">Compraventa</h1>

      <div className="bg-gray-300 rounded-lg shadow-xl mt-10 px-5 py-10">
          <form
            onSubmit={submitForm}
            noValidate
          >

            <div className="mb-4">
                  <label
                      className="text-slate-800" 
                      htmlFor="password"
                  >Password</label>
                  <input 
                      type="password" 
                      id="password"
                      value={password}
                      className="mt-2 w-full p-3 bg-gray-50 border border-black"
                      onChange={e => setPassword(e.target.value)}
                      name="password"
                      placeholder="Password de ingreso" 
                  />
                  <InputError messages={errors.password} className="mt-2" />
              </div>
              <input 
                  type="submit"
                  value="Entrar"
                  className="bg-sky-600 hover:bg-sky-700 transition-colors uppercase font-bold p-3 cursor-pointer"
              />
          </form>
      </div>
  </>
  )
}
