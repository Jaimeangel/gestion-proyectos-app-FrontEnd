import { useState , useEffect} from "react"
import { useParams , Link} from "react-router-dom"
import axios from "axios";
import Alert from "../components/alert.jsx";



function ConfirmationToken() {
    const [alert,setAlert]=useState({msg:'',error:false})
    const [valid,setValid]=useState(false)

    const params=useParams()
    const {token}=params;

    useEffect(()=>{
        const verify = async ()=>{
            try {
              const verifyToken = await axios(`http://localhost:4000/api/usuarios/confirmation/${token}`)
              setValid(true)
            } catch (error) {
              console.log(error)
              setAlert({
                msg:error.response?.data.msg || error.message,
                error:true
              })
            }
        }
        
        verify()
    })

    return (
        <div className='w-full px-5'>
            <div className='w-full'>

                <h2 className='text-center font-bold text-2xl uppercase'>Ya has confirmado tu cuenta</h2>

                {alert.msg.length!==0 && <Alert alert={alert}/>}
                
                {
                    valid && (
                        <div>
                            <h1>Ya puedes ingresar a tu cuenta</h1>
                            <Link
                                to={'/login'}
                            >
                                <p className="underline">Inicia sesion</p>
                            </Link>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default ConfirmationToken;
