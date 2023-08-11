import { useEffect,useState } from "react";

function HandleStatus({data,err,cargando,children}) {    
    //Alerta
    const [errNet,setErrNet]=useState({msg:'',error:false})
    const [errServer,setErrServer]=useState({msg:'',error:false})
        
    //Cargando
    const [load,setLoad]=useState(true)
    
    //No content
    const [noContent,setNoContent]=useState(false)
    
    useEffect(()=>{
        if(Object.keys(data).length !==0 || err.err===true){
            console.log('Dejamos de cargar')
            setLoad(false)
        }
        
        if(cargando===false && Object.keys(data).length===0){
            console.log('no hay proyectos creados')
            setLoad(false)
            setNoContent(true)
        }
    },[err,data])
    
    useEffect(()=>{
        if(err.err){
            if(!err.msg.response){
                setErrNet({
                    msg:err.msg.message,
                    error:true
                })
            }else{
                setErrServer({
                    msg:err.msg.response?.data.msg,
                    error:true
                })
            }
        }
    },[err])


    return <>{children(load,err,errNet,errServer,noContent,data)}</>;
}

export default HandleStatus;
