import { useState } from "react"
import Alert from "../components/alert";
import axios from "axios";

function RecoverPassword() {

    const [email,setEmail]=useState('')
    const [alert,setAlert]=useState({msg:'',error:false})

    const handleSubmit= async (e)=>  {
        e.preventDefault()

        if([email].includes('')){
            setAlert({
                msg:'Todos los campos son obligatorios',
                error:true
            })
            return
        }

        try {
            const userRegister = await axios.post('http://localhost:4000/api/usuarios/recover-password',{
                email
            })
            setAlert({
                msg:'Revisa tu correo y confirma tu cuenta',
                error:false
            })
        }catch(error) {
            console.log(error)
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
        }


    }

    return (
        <div className='w-full px-5'>
            <div className='w-full'>

                <h2 className='text-center font-bold text-2xl uppercase'>Recupera tu constraseña</h2>

                {alert.msg.length!==0 && <Alert alert={alert}/>}

                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-1 items-left mt-3'>
                        <label className='text-lg'>Ingresa tu email de registro</label>
                        <input
                            onChange={(e)=>setEmail(e.target.value)} 
                            type="text"
                            className='border rounded-2xl px-3 py-2 border-black'
                        />
                    </div>
                    <input 
                        type="submit" 
                        value="Registrar"
                        className='w-full uppercase bg-yellow-400 px-3 py-2 rounded-2xl border border-black mt-5 font-bold'
                    ></input>
                </form>

            </div>
        </div>
    )
}

export default RecoverPassword
