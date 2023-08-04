import { useEffect,useState } from "react";
//Alert components
import AlertImage from "../components/alertImage.jsx";
import ErrorNetwork from "../components/errorNetwork.jsx";
//Components
import CardProyecto from "../components/cardProyecto";
import Spinner from "../components/spinner";
//Hooks
import useProyecto from "../hooks/useProyecto";


function Proyectos() {
  const {proyectos,alert}=useProyecto();

    //Alerta
    const [errNet,setErrNet]=useState({msg:'',error:false})
    const [alertImg,setAlertImg]=useState({msg:'',error:false})
    
    //Cargando
    const [load,setLoad]=useState(true)

    useEffect(()=>{
      if(Object.keys(proyectos).length !==0 || alert.err===true){
        setLoad(false)
      }
    },[alert,proyectos])

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


  return (
    <div>
      <h1 className="text-3xl font-bold italic tracking-wide">Tus proyectos</h1>
      <h3 className="text-xl font-normal">Tus proyectos los encontraras aqui</h3>

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
              <div  className="w-[30rem] mx-auto bg-white py-5 mt-5 rounded-lg shadow border">
                {alertImg.msg.length!==0 && <AlertImage msgError={alertImg.msg}/>}
                {errNet.msg.length!==0 && <ErrorNetwork msgError={errNet.msg}/>}
              </div>
            )
          :
            (
              <div 
                className="w-[60rem] mx-auto bg-white py-5 mt-5 rounded-lg shadow border grid grid-cols-2 gap-7 px-7"
              >
                {
                  proyectos?.map( proyecto =>{
                    return <CardProyecto
                      proyecto={proyecto}
                      key={proyecto._id}
                    />
                  })
                }
              </div>
            )
        )
      }
    </div>
  )
}

export default Proyectos;
