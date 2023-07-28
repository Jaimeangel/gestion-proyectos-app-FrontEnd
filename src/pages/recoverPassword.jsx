import { useState } from "react"
import axios from "axios";
import imageConfirm from '../assets/undraw_online_stats_0g94.svg'


import Alert from "../components/alert";
import InputForm from "../components/inputForm";
import ButtonForm from "../components/buttonForm";

function RecoverPassword() {

    //User data
    const [email,setEmail]=useState('')
    //Alerts
    const [alert,setAlert]=useState({msg:'',error:false})
    //Validate
    const [end,setEnd]=useState(false)

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
            setEnd(true)
        }catch(error) {
            console.log(error)
            setAlert({
                msg:error.response.data.msg,
                error:true
            })
        }


    }

    return (
        <div className='w-[28rem] px-5 py-10 shadow-lg rounded-2xl'>
            {
                end ? 
                (
                    <div className="w-full flex flex-col items-center">
                        <img 
                            src={imageConfirm} 
                            alt="imagen de confirmacion"
                            className="w-5/6" 
                        />
                        <div className="w-full flex flex-col items-center mt-5">
                            <h1 className="font-bold italic text-3xl">{`¡Listo! Revisa tu correo`}</h1>
                            <p className="text-justify font-semibold text-xl mt-4">Por favor revisa tu buzon de correo y sigue las instruciones enviadas. El correo fue enviado a:</p>
                            <p className="font-semibold text-lg italic tracking-wider mt-2">{`${email}`}</p>
                        </div>
                    </div>       
                ):
                (
                    <div className='w-full'>

                        <h2 className='text-center font-bold text-2xl'>¿No recuerdas tu contraseña?</h2>
                        <p className="text-center text-black text-md italic mt-1">¡No te preocupes! Ingresa tu email y te ayudaremos</p>
        
                        {alert.msg.length!==0 && <Alert alert={alert}/>}
        
                        <form onSubmit={handleSubmit}>
                            <InputForm
                                callback={setEmail}
                                typeInput='text'
                                name='Ingresa tu email de registro'
                                phder='tucorreo@dominio.com'
                            />
                            <ButtonForm
                                type='submit' 
                                value='Solicitar'
                                width='full'
                            />
                        </form>
    
                    </div>
                )
            }

        </div>
    )
}

export default RecoverPassword
