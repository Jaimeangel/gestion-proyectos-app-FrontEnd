import { useEffect,useState } from "react";

function HandleStatus({data,alert,cargando,children}) {    
    //Alerta
    const [errNet,setErrNet]=useState({msg:'',error:false})
    const [alertImg,setAlertImg]=useState({msg:'',error:false})
        
    //Cargando
    const [load,setLoad]=useState(true)
    
    //No content
    const [noContent,setNoContent]=useState(false)
    
    useEffect(()=>{
        if(Object.keys(data).length !==0 || alert.err===true){
            console.log('Dejamos de cargar')
            setLoad(false)
        }
        
        if(cargando===false && Object.keys(data).length===0){
            console.log('no hay proyectos creados')
            setLoad(false)
            setNoContent(true)
        }
    },[alert,data])
    
    useEffect(()=>{
        if(alert.err){
            if(!alert.msg.response){
                setErrNet({
                    msg:alert.msg.message,
                    error:true
                })
            }else{
                setAlertImg({
                    msg:alert.msg.response?.data.msg,
                    error:true
                })
            }
        }
    },[alert])


    return <>{children(load,alert,errNet,alertImg,noContent,data)}</>;
}

export default HandleStatus;
