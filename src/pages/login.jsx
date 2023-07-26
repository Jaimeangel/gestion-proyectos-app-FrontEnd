import { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Alert from "../components/alert";


function Login() {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [alert,setAlert]=useState({msg:'',error:false})

    const handleSubmit= async (e)=>  {
        e.preventDefault()

        if([email,password].includes('')){
            setAlert({
                msg:'Todos los campos son obligatorios',
                error:true
            })
            return
        }

        try {
            const loginUser = await axios.post('http://localhost:4000/api/usuarios/login',{
                email,
                password
            })
            setAlert({
                msg:'Ingreso exitoso',
                error:false
            })
        }catch(error) {
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
        }


    }

    return (
        <div className='w-full px-5 py-10 shadow-lg rounded-2xl'>
            <div className='w-full'>

                <h2 className='text-center font-bold text-2xl'>Acceder a su cuenta</h2>
                <p className="text-center text-black text-md italic mt-1">Accede a tu cuenta con tu email que usaste para registrarte</p>

                {alert.msg.length!==0 && <Alert alert={alert}/>}

                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1 items-left mt-3'>
                        <label className='text-lg font-bold tracking-wider italic'>Email</label>
                        <input
                            onChange={(e)=>setEmail(e.target.value)} 
                            type="text"
                            placeholder="tucorreo@dominio.com"
                            className='placeholder:text-gray-500 placeholder:italic placeholder:text-lg tracking-wider bg-gray-50 cursor-pointer border rounded-2xl px-6 py-2 border-black'
                        />
                    </div>
                    <div className='flex flex-col gap-1 items-left mt-3'>
                        <label className='text-lg font-bold tracking-wider italic'>Contraseña</label>
                        <input
                            onChange={(e)=>setPassword(e.target.value)}  
                            type="password"
                            className='bg-gray-50 cursor-pointer border rounded-2xl px-6 py-2 border-black'
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Iniciar sesion"
                        className='w-full tracking-wider cursor-pointer uppercase bg-yellow-400 px-3 py-2 rounded-2xl border border-black mt-5 font-bold'
                    ></input>
                </form>

                <div className="text-center mt-5">
                    <Link
                        to={'/register'}
                    >
                        <p className="underline">¿Aun no tienes cuenta? Registrate aqui</p>
                    </Link>
                    <Link
                        to={'/recover-password'}
                    >
                        <p className="underline">Olvide mi contraseña</p>
                    </Link>
                </div>

            </div>
        </div>
    )
}

export default Login;
