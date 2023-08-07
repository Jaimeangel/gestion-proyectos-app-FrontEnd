import { useState } from "react";

import axios from "axios";

//Svgs
import leftArrow from '../assets/left-arrow-svgrepo-com.svg'
import imageConfirm from '../assets/undraw_online_stats_0g94.svg'

//Componentes
import Alert from "../../components/alert";
import InputForm from "../../components/inputForm";
import ButtonForm from "../../components/buttonForm";

function Register() {

    //Pasos del formulario de registro
    const steps=[1,2]
    const [step,setStep]=useState(steps[0])
    const [end,setEnd]=useState(false)

    //Datos usuario
    const [nombre,setNombre]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [rptPassword,setRptPassword]=useState('')

    //Alerta
    const [alert,setAlert]=useState({msg:'',error:false})

    const handleSubmit= async (e)=>  {
        e.preventDefault()

        if(step===1){
            if([email,nombre].includes('')){
                setAlert({
                    msg:'Todos los campos son obligatorios',
                    error:true
                })
                return
            }
            setStep(2)
        }else if(step===2){
            if([password,rptPassword].includes('')){
                setAlert({
                    msg:'Todos los campos son obligatorios',
                    error:true
                })
                return
            }
    
            if(password !== rptPassword){
                setAlert({
                    msg:'Las contraseñas no coinciden',
                    error:true
                })
                setPassword('')
                setRptPassword('')
                return
            }

            
            try {
                const userRegister = await axios.post('http://localhost:4000/api/usuarios',{
                    nombre,
                    email,
                    password
                })
                setEnd(true)
            }catch(error) {
                console.log(error)
                setAlert({
                    msg:error.response?.data.msg || error.message,
                    error:true
                })
            } 
        }
    }

    const userInterfaceByStep=()=>{
        switch (step) {
            case 1:
                return (
                    <>
                        <InputForm
                            value={nombre}
                            callback={setNombre}
                            typeInput='text'
                            phder='Tu nombre'
                            name='Nombre'
                        />
                        <InputForm
                            value={email}
                            callback={setEmail}
                            typeInput='text'
                            phder='tucorreo@dominio.com'
                            name='Email'
                        />
                        <ButtonForm
                            type='submit' 
                            value='Siguiente'
                            width='1/2'
                        />
                    </>
                )
            case 2:
                return (
                    <>
                        <InputForm
                            value={password}
                            callback={setPassword}
                            typeInput='password'
                            name='Contraseña'
                            phder='password'
                        />
                        <InputForm
                            value={rptPassword}
                            callback={setRptPassword}
                            typeInput='password'
                            name='Repetir contraseña'
                            phder='repetir password'
                        />
                        <ButtonForm
                            type='submit' 
                            value='Registrate'
                            width='full'
                        />
                    </>
                )
            default:
                <h1>Opps,algo salio mal</h1>
                break;
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
                            <h1 className="font-bold italic text-3xl">{`¡Listo ${nombre}! Revisa tu correo`}</h1>
                            <p className="text-justify font-semibold text-xl mt-4">Por favor revisa tu buzon de correo y sigue las instruciones enviadas. El correo fue enviado a:</p>
                            <p className="font-semibold text-lg italic tracking-wider mt-2">{`${email}`}</p>
                        </div>
                    </div>
                ):
                (
                    <div className='w-full'>

                        <h2 className='text-center font-bold text-2xl'>Crea una cuenta</h2>
                        <p className="text-center text-black text-md italic mt-1">Ingresa tus datos para crear una cuenta</p>
        
                        {alert.msg.length!==0 && <Alert alert={alert}/>}
        
                        <div className="flex flex-row gap-4 mt-2">
                            {
                                step !==1 && (
                                    <button
                                        onClick={()=>setStep(value=>value-1)} 
                                        className="w-[1.5rem]"><img src={leftArrow} alt="" 
                                    /></button>   
                                )
                            }
                            <h2 className='text-left font-semibold text-xl'>{`Paso ${step} de ${steps.length}`}</h2>
                        </div>
        
                        <form onSubmit={handleSubmit} className="flex flex-col">
                            {
                                step === 1 && userInterfaceByStep()
                            }
                            {
                                step === 2 && userInterfaceByStep()
                            }
        
                        </form>
    
                    </div>
                )
            }
        </div>
    )
}

export default Register;