import { useState,useEffect } from "react";
import useProyecto from "../hooks/useProyecto";

import { useParams } from "react-router-dom";

import InputForm from "../components/inputForm";
import ButtonForm from "../components/buttonForm";
import Alert from "../components/alert";

import formatDate from '../helpers/formatDate.js'

function EditProyectoById() {
    const [nameProyecto,setNameProyecto]=useState('')
    const [date,setDate]=useState('')
    const [cliente,setCliente]=useState('')
    const [description,setDescription]=useState('')
    
    const {proyecto}=useParams()

    const {
        proyectoId,
        getProyectById,
        alert,
        showAlert,
        updateProyectById
    }=useProyecto()

    useEffect(()=>{
        if(Object.keys(proyectoId).length ===0){
            const getProyect= async ()=>{
                try {
                    await getProyectById(proyecto)
                } catch (error) {
                    console.log(error)
                }
            }
            getProyect()
        }
    },[])

    useEffect(()=>{
        if(Object.keys(proyectoId).length !==0){
            setNameProyecto(proyectoId.nombre)
            setDate(formatDate(proyectoId.fechaEntrega))
            setCliente(proyectoId.cliente)
            setDescription(proyectoId.descripcion)
        }

    },[proyectoId])

    


    const handleSubmit= async (e)=>{
        e.preventDefault()

        if([nameProyecto,date,cliente,description].includes('')){
            showAlert({
              msg:'Todos los campos son obligatorios',
              error:true
            })
            return
        }

        await updateProyectById(
            {
              nombre:nameProyecto,
              fechaEntrega:date,
              cliente,
              descripcion:description
            },
            proyecto
        )
    }


    return (
        <div>
            <h1 className="text-3xl font-bold italic tracking-wide">Editar un proyecto</h1>
            <h3 className="text-xl font-normal">A continuacion encontraras el formulario para editar tus propios proyectos</h3>

            <div className="w-[40rem] mx-auto bg-white flex flex-col items-center py-5 mt-5 rounded-lg shadow-md border">
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
                        value='Editar proyecto'
                        width='full'
                    />
                </form>
            </div>
        </div>
    )
}

export default EditProyectoById;
