import { useState , useEffect} from "react"
import { useParams , Link} from "react-router-dom"
import axios from "axios";
import AlertImage from "../components/alertImage.jsx";
import ErrorNetwork from "../components/errorNetwork.jsx";

import pasoCompleto from '../assets/undraw_completed_03xt.svg'


function ConfirmationToken() {
    //datos usuario
    const [user,setUser]=useState('')

    //Validacion
    const [valid,setValid]=useState(false)
    
    //Errors
    const [errNet,setErrNet]=useState({msg:'',error:false})
    const [alert,setAlert]=useState({msg:'',error:false})

    //Get URL Token
    const params=useParams()
    const {token}=params;

    useEffect(()=>{
        const verify = async ()=>{
            try {
              const {data} = await axios(`http://localhost:4000/api/usuarios/confirmation/${token}`)
              setUser(data.nombre)
              setValid(true)
            } catch (error) {
              console.log(error)

              if(!error.response){
                setErrNet({
                    msg:error.message,
                    error:true
                })
              }else{
                  setAlert({
                    msg:error.response?.data.msg,
                    error:true
                  })
              }
            }
        }
        
        if(valid===false){
            verify()
        }
    },[])

    return (
        <div className='w-[48rem] px-5 py-10 shadow-lg rounded-2xl flex justify-center'>
                {alert.msg.length!==0 && <AlertImage msgError={alert.msg}/>}

                {errNet.msg.length!==0 && <ErrorNetwork msgError={errNet.msg}/>}

                {
                    valid && (
                        <div className="w-full flex flex-col sm:flex-row items-center">
                            <div className="w-full sm:w-1/2 flex justify-center">
                                <img 
                                    src={pasoCompleto} 
                                    alt="imagen de confirmacion"
                                    className="max-w-[16rem]" 
                                />
                            </div>
                            <div className="max-w-[22rem] sm:w-1/2 mt-5 flex flex-col items-center">
                                <h1 className="font-bold italic text-3xl text-center">{`¡Felicidades ${user}!`}</h1>
                                <h2 className="font-bold italic text-2xl text-justify">{`has confirmado tu cuenta exitosamente`}</h2>
                                <p className="text-justify font-semibold text-xl mt-4">Puedes ingresar ahora haciendo click en el boton de abajo</p>
                                <Link
                                    to={'/login'}
                                    className="w-full"
                                >
                                    <input 
                                        type="button" 
                                        value="Iniciar sesion"
                                        className='w-full cursor-pointer uppercase bg-yellow-400 px-3 py-2 rounded-lg border border-black mt-5 font-bold'
                                    ></input>
                                </Link>
                            </div>
                        </div>
                    )
                }
        </div>
    )
}

export default ConfirmationToken;
