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
        <div className='w-full px-5 py-10 shadow-lg rounded-2xl'>
                {alert.msg.length!==0 && <AlertImage msgError={alert.msg}/>}

                {errNet.msg.length!==0 && <ErrorNetwork msgError={errNet.msg}/>}

                {
                    valid && (
                        <div className="w-full flex flex-col items-center">
                            <img 
                                src={pasoCompleto} 
                                alt="imagen de confirmacion"
                                className="w-3/6" 
                            />
                            <div className="w-full flex flex-col items-center mt-5">
                                <h1 className="font-bold italic text-3xl text-justify">{`¡Felicidades ${user}! has confirmado tu cuenta`}</h1>
                                <p className="text-justify font-semibold text-xl mt-4">Ahora ya puedes ingresar a tu cuenta</p>
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
