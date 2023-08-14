import { useEffect,useState } from "react";

import useAuth from "../hooks/useAuth";

//Alert components
import AlertImage from "../components/alertImage.jsx";
import ErrorNetwork from "../components/errorNetwork.jsx";

//Components
import Spinner from "../components/spinner";
import MainLayaout from "./mainLayaout";

function ProtectRoute() {
    //Hooks
    const {auth,alert}=useAuth()

    //Cargando
    const [load,setLoad]=useState(true)

    //Alerta
    const [errNet,setErrNet]=useState({msg:'',error:false})
    const [alertImg,setAlertImg]=useState({msg:'',error:false})

    
    useEffect(()=>{
        if(Object.keys(auth).length !==0 || alert.err===true){
          setLoad(false)
        }
    },[alert,auth])

    useEffect(()=>{
        if(alert.err && Object.keys(auth).length ===0){
          if(!alert.msg.response){
            console.log(alert.msg)
            setErrNet({
                msg:alert.msg.message,
                error:true
            })
            
          }else{
            console.log('aqui')
            console.log(alert.msg)
            setAlertImg({
                msg:alert.msg.message,
                error:true
            })
          }
        }
    },[alert])


    return (
        <div className="w-full">
            {
                load 
                    ? 
                        (
                            <div className="flex justify-center">
                                <Spinner/>
                            </div>
                        )
                    :
                        (
                            alert.err===true 
                                ?
                                    (
                                        <>
                                            <div  className="w-[30rem] mx-auto bg-white py-5 mt-5 rounded-lg shadow border">
                                                {alertImg.msg?.length!==0 && <AlertImage msgError={alertImg.msg}/>}
                                                {errNet.msg?.length!==0 && <ErrorNetwork msgError={errNet.msg}/>}
                                            </div>
                                        </>
                                    )
                                :
                                    (
                                        <MainLayaout/>   
                                    ) 
                        ) 
            }
        </div>
    )
}

export default ProtectRoute;
