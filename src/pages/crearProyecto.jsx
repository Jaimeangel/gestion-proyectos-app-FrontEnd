import { useState } from "react";
import { Link } from "react-router-dom";
//Hook
import useProyecto from '../hooks/useProyecto'
//Components
import ButtonForm from "../components/buttonForm";
import AlertImage from "../components/alertImage";
import FormData from "../components/formData";
//Img
import doneImg from '../assets/undraw_done_re_oak4.svg'

function CrearProyecto() {
  const {
    alert,
    showAlert,
    submitProyect
  }=useProyecto()
  
  const [submit,setSubmit]=useState(false)

  const handleSubmitNewProyect= async (nombre,fecha,cliente,descrip)=>{
    try {
      await submitProyect(
        {
          nombre:nombre,
          fechaEntrega:fecha,
          cliente,
          descripcion:descrip
        }
      )
      setSubmit(true)
    } catch (error) {
      console.log(error)
      showAlert({
        msg:error.message,
        error:true
      })
    }

  }

  const reset=()=>{
    setSubmit(false)
  }

  return (
    <div>
      <h1 className="text-3xl font-bold italic tracking-wide">Crear un proyecto</h1>
      <h3 className="text-xl font-normal">A continuacion encontraras el formulario para crear tus propios proyectos</h3>

      <div className="w-[40rem] mx-auto bg-white flex flex-col items-center py-5 mt-5 rounded-lg shadow-md border">
        {
          submit 
            ? 
            (
              <AlertImage
                imgAlert={doneImg}
                wdth='4/6'
                msg={'Su proyecto fue creado con exito'}
              >
                <div className="w-full flex flex-row justify-center gap-5">
                  <Link
                    to={'/proyectos'}
                  >
                    <ButtonForm
                      type='button' 
                      value='Ver proyectos'
                      width='1/2'
                    />
                  </Link>
                  <ButtonForm
                    type='button' 
                    value='Nuevo proyecto'
                    width='1/2'
                    callback={reset}
                  />
                </div>
              </AlertImage>
            )
            :
            (
              <FormData
                handlerForm={handleSubmitNewProyect}
                alert={alert}
                showAlert={showAlert}
              />
            )
        }
      </div>
    </div>
  )
}

export default CrearProyecto;
