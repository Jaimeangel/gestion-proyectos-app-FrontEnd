import { useEffect,useState } from "react";
import { useParams , Link} from "react-router-dom"
import axios from "axios";
import Alert from "../components/alert.jsx";

function RecoverPasswordToken() {

  const [alert,setAlert]=useState({msg:'',error:false})
  const [newPassword,setNewPassword]=useState('')
  const [valid,setValid]=useState(false)

  const params=useParams()
  const {token}=params;

  useEffect(()=>{
    const verify = async ()=>{
      try {
        const verifyToken = await axios(`http://localhost:4000/api/usuarios/recover-password/${token}`)
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
  },[])

  const handleSubmit= async (e)=>{
    e.preventDefault()
            
    try {
      const changePassword = await axios.post(`http://localhost:4000/api/usuarios/recover-password/${token}`,{
        password:newPassword
      })
      setAlert({
        msg:'Su contraseña ha sido cambiado exitosamente',
        error:false
      })
    } catch (error) {
      console.log(error)
      setAlert({
        msg:error.response?.data.msg || error.message,
        error:true
      })
    }
  }

  return (
    <div className='w-full px-5'>
    <div className='w-full'>

        <h2 className='text-center font-bold text-2xl uppercase'>Cambia tu contraseña</h2>

        {alert.msg.length!==0 && <Alert alert={alert}/>}

        {
          valid && (
            <form onSubmit={handleSubmit}>
                <div className='flex flex-col gap-1 items-left mt-3'>
                    <label className='text-lg'>Ingresa tu nueva contraseña</label>
                    <input
                        onChange={(e)=>setNewPassword(e.target.value)} 
                        type="password"
                        className='border rounded-2xl px-3 py-2 border-black'
                    />
                </div>
                <input 
                    type="submit" 
                    value="Registrar"
                    className='w-full uppercase bg-yellow-400 px-3 py-2 rounded-2xl border border-black mt-5 font-bold'
                ></input>
            </form>
          )
        }

    </div>
</div>
  )
}

export default RecoverPasswordToken
