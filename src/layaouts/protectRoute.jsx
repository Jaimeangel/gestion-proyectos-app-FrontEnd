import { useEffect,useState } from "react";

import useAuth from "../hooks/useAuth";

//Components
import AlertImage from "../components/alertImage.jsx";
import Spinner from "../components/spinner";
import MainLayaout from "./mainLayaout";
import Alerts from "../components/alerts";

function ProtectRoute() {
    //Hooks
    const {auth,alert}=useAuth()

    //Cargando
    const [load,setLoad]=useState(true)

    //Alerta
    const [alertAuth,setAlertAuth]=useState({msg:'',err:false})

    
    useEffect(()=>{
        if(Object.keys(auth).length !==0 || alert.err===true){
          setLoad(false)
        }

        if(alert.err && Object.keys(auth).length ===0){
            if(alert.msg){
                setAlertAuth({
                    msg:alert.msg,
                    err:true
                })
            }
        }
    },[alert,auth])

    return (
        <div className="w-full">
            {
                load 
                    ? 
                        (
                            <Spinner/>
                        )
                    :
                        (
                            alert.err
                                ?
                                    (
                                        <Alerts
                                            errorThrow={alertAuth}
                                        />
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
