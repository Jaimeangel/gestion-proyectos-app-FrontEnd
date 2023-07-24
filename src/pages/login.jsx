import { useState } from "react";
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
        <div className='w-full px-5'>
            <div className='w-full'>

                <h2 className='text-center font-bold text-2xl uppercase'>Ingresa sesion</h2>

                {alert.msg.length!==0 && <Alert alert={alert}/>}

                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1 items-left mt-3'>
                        <label className='text-lg'>Email</label>
                        <input
                            onChange={(e)=>setEmail(e.target.value)} 
                            type="text"
                            className='border rounded-2xl px-3 py-2 border-black'
                        />
                    </div>
                    <div className='flex flex-col gap-1 items-left mt-3'>
                        <label className='text-lg'>Contraseña</label>
                        <input
                            onChange={(e)=>setPassword(e.target.value)}  
                            type="password"
                            className='border rounded-2xl px-3 py-2 border-black'
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Ingresar"
                        className='w-full uppercase bg-yellow-400 px-3 py-2 rounded-2xl border border-black mt-5 font-bold'
                    ></input>
                </form>

            </div>
        </div>
    )
}

export default Login;
