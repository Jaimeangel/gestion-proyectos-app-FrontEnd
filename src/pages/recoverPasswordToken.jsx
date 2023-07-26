import { useEffect,useState } from "react";
import { useParams , Link} from "react-router-dom"
import axios from "axios";
import Alert from "../components/alert.jsx";
import AlertImage from "../components/alertImage.jsx";
import ErrorNetwork from "../components/errorNetwork.jsx";

import confirmedPasswordChange from '../assets/undraw_confirm_re_69me.svg'

function RecoverPasswordToken() {
  //Alerta
  const [alert,setAlert]=useState({msg:'',error:false})
  const [errNet,setErrNet]=useState({msg:'',error:false})
  const [alertImg,setAlertImg]=useState({msg:'',error:false})
  //User data
  const [newPassword,setNewPassword]=useState('')
  const [rptPassword,setRptPassword]=useState('')
  //Validate
  const [valid,setValid]=useState(false)
  const [ok,setOk]=useState(false)
  
  //URL token
  const params=useParams()
  const {token}=params;

  useEffect(()=>{
    const verify = async ()=>{
      try {
        const verifyToken = await axios(`http://localhost:4000/api/usuarios/recover-password/${token}`)
        setValid(true)
      } catch (error) {
        console.log(error)

        if(!error.response){
          setErrNet({
              msg:error.message,
              error:true
          })
        }else{
            setAlertImg({
              msg:error.response?.data.msg,
              error:true
            })
        }
      }
    }
    verify()
  },[])

  const handleSubmit= async (e)=>{
    e.preventDefault()

    if([newPassword,rptPassword].includes('')){
        setAlert({
            msg:'Todos los campos son obligatorios',
            error:true
        })
        return
    }

    if(newPassword !== rptPassword){
        setAlert({
            msg:'Las contraseñas no coinciden',
            error:true
        })
        return
    }
            
    try {
      const changePassword = await axios.post(`http://localhost:4000/api/usuarios/recover-password/${token}`,{
        password:newPassword
      })
      setValid(false)
      setOk(true)
    } catch (error) {
      console.log(error)

      if(!error.response){
        setErrNet({
            msg:error.message,
            error:true
        })
      }else{
          setAlertImg({
            msg:error.response?.data.msg,
            error:true
          })
      }
    }
  }

  return (
    <div className='w-[28rem] px-5 py-10 shadow-lg rounded-2xl'>
      {alertImg.msg.length!==0 && <AlertImage msgError={alertImg.msg}/>}
      {errNet.msg.length!==0 && <ErrorNetwork msgError={errNet.msg}/>}

      {
        valid && (
          <div className='w-full'>

              <h2 className='text-center font-bold text-2xl'>Restablecer contraseña</h2>
              <p className="text-center text-black text-md italic mt-1">Ingresa tu nueva contraseña</p>

              {alert.msg.length!==0 && <Alert alert={alert}/>}

              <form onSubmit={handleSubmit}>

                <div className='flex flex-col gap-1 items-left mt-3'>
                  <label className='text-lg font-bold tracking-wider italic'>Contraseña</label>
                  <input
                    onChange={(e)=>setNewPassword(e.target.value)}  
                    type="password"
                    className='bg-gray-50 cursor-pointer border rounded-2xl px-6 py-2 border-black'
                  />
                </div>

                <div className='flex flex-col gap-1 items-left mt-3'>
                  <label className='text-lg font-bold tracking-wider italic'>Repetir Contraseña</label>
                  <input
                    onChange={(e)=>setRptPassword(e.target.value)}  
                    type="password"
                    className='bg-gray-50 cursor-pointer border rounded-2xl px-6 py-2 border-black'
                  />
                </div>

                <input 
                    type="submit" 
                    value="Restablecer"
                    className='w-full tracking-wider cursor-pointer uppercase bg-yellow-400 px-3 py-2 rounded-2xl border border-black mt-5 font-bold'
                ></input>
              </form>

          </div>
        )
      }

      {
        ok && (
          <div className="w-full flex flex-col items-center">
            <img 
                src={confirmedPasswordChange} 
                alt="imagen de confirmacion"
                className="w-5/6" 
            />
            <div className="w-full flex flex-col items-center mt-5">
                <h1 className="font-bold italic text-3xl text-center">{`Su contraseña a sido cambiado exitosamente`}</h1>
            </div>
          </div>
        )
      }
  </div>
  )
}

export default RecoverPasswordToken
