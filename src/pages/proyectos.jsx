import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
//Hooks
import useProyecto from "../hooks/useProyecto";
//Componente
import HandleStatus from "../components/handleStatus";
import CardProyecto from "../components/cardProyecto";
import ButtonForm from "../components/buttonForm.jsx";
import AlertImage from "../components/alertImage.jsx";
import Alerts from "../components/alerts";
import Spinner from "../components/spinner";
//Images
import emptyImagen from '../assets/undraw_empty_re_opql.svg'

function Proyectos() {
  const {
    proyectos,
    getProyectos
  }=useProyecto();

  const [errAlert,setErrAlert]=useState({msg:'',err:false})
  const [loading,setLoading]=useState(true)

  useEffect(()=>{
    const proyectos= async ()=>{
      try {
        await getProyectos()
        setLoading(false)
      } catch (error) {
        setErrAlert({
          msg:error,
          err:true
        })
        setLoading(false) 
      }
    }
    proyectos()
  },[])

  return (
    <div>
      <h1 className="text-3xl font-bold italic tracking-wide">Tus proyectos</h1>
      <h3 className="text-xl font-normal">Tus proyectos los encontraras aqui</h3>
      
      <HandleStatus
        data={proyectos}
        err={errAlert}
        cargando={loading}
      >
        {
          (load,err,errNet,errServer,noContent,data) => (

            <>
                {
                  load && <Spinner/>
                }
                {
                  err.err && <Alerts errServer={errServer} errNet={errNet}/>
                }
                {
                  noContent &&
                  (
                    <AlertImage
                      imgAlert={emptyImagen}
                      wdth='3/6'
                      msg={'No hay proyectos creados aún'}
                    >
                      <div className="w-full flex flex-row justify-center gap-5">
                        <Link
                          to={'/proyectos/crear-proyecto'}
                        >
                          <ButtonForm
                              type='button' 
                              value='Crea un proyecto'
                              width='1/2'
                          />
                        </Link>
                      </div>
                    </AlertImage>
                  )
                }
                {
                  !noContent && !load &&
                  (
                    <div 
                      className="w-[60rem] mx-auto bg-white py-5 mt-5 rounded-lg shadow border grid grid-cols-2 gap-7 px-7"
                    >
                      {
                        data?.map( proyecto =>(
                          <CardProyecto
                            proyecto={proyecto}
                            key={proyecto._id}
                          />
                        ))
                      }
                    </div>
                  )
                }
            </>
          )
        }

      </HandleStatus>

    </div>
  )
}

export default Proyectos;
