import { useEffect,useState } from "react";

function HandleStatus({data,err,cargando,children}) {    
    //Alerta
    const [errNet,setErrNet]=useState({msg:'',err:false})
        
    //Cargando
    const [load,setLoad]=useState(true)
    
    //No content
    const [noContent,setNoContent]=useState(false)
    
    useEffect(()=>{
        if(Object.keys(data).length !==0 || err.err===true){
            setLoad(false)
        }
        
        if(cargando===false && Object.keys(data).length===0){
            setLoad(false)
            setNoContent(true)
        }

        if(err.err){
            setErrNet({
                msg:err.msg,
                err:true
            })
        }
    },[err,cargando])

    return <>{children(load,err,errNet,noContent,data)}</>;
}

export default HandleStatus;
