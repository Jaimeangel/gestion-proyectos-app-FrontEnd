import InputForm from "../components/inputForm";
import ButtonForm from "../components/buttonForm";
import Alert from "../components/alert";

import { useState } from "react";
import { Link } from "react-router-dom";

//Hook
import useProyecto from '../hooks/useProyecto'

//Img
import doneImg from '../assets/undraw_done_re_oak4.svg'

import AlertImage from "../components/alertImage";

function CrearProyecto() {
  //Data project
  const [nameProyecto,setNameProyecto]=useState('')
  const [date,setDate]=useState('')
  const [cliente,setCliente]=useState('')
  const [description,setDescription]=useState('')

  //Alert
  const {
    alert,
    showAlert,
    submitProyect
  }=useProyecto()

  //Msg 
  const [submit,setSubmit]=useState(false)

  const handleSubmit= async (e)=>{
    e.preventDefault()

    if([nameProyecto,date,cliente,description].includes('')){
      showAlert({
        msg:'Todos los campos son obligatorios',
        error:true
      })
      return
    }

    await submitProyect(
      {
        nombre:nameProyecto,
        fechaEntrega:date,
        cliente,
        descripcion:description
      }
    )

    setNameProyecto('')
    setDate('')
    setCliente('')
    setDescription('')

    setSubmit(true)

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
              <form onSubmit={handleSubmit} className="w-4/5">
                {alert.msg.length!==0 && <Alert alert={alert}/>}
                <InputForm
                  name='Nombre del proyecto'
                  typeInput='text'
                  callback={setNameProyecto}
                  value={nameProyecto}
                />
                <InputForm
                  name='Nombre del cliente'
                  typeInput='text'
                  callback={setCliente}
                  value={cliente}
                />
                <div className='flex flex-col gap-1 items-left mt-3'>
                  <label className='text-lg font-bold tracking-wider italic'>Descripcion del proyecto</label>
                  <textarea
                    value={description}
                    onChange={(e)=>setDescription(e.target.value)}
                    className="w-full outline-none bg-gray-50 cursor-pointer border rounded-xl px-6 py-2 border-black"
                  ></textarea>
                </div>
                <InputForm
                  name='Fecha de entrega'
                  typeInput='date'
                  callback={setDate}
                  value={date}
                />
                <ButtonForm
                  type='submit' 
                  value='CREAR PROYECTO'
                  width='full'
                />
              </form>
            )
        }
      </div>
    </div>
  )
}

export default CrearProyecto;
