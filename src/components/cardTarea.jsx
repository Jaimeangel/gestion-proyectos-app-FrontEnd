import ButtonForm from "./buttonForm";
import formatDate from "../helpers/formatDate";
import useProyecto from "../hooks/useProyecto";
import { useState } from "react";
import ModalTareas from "./modalTareas";
import Alert from "./alert";
import ModalDeleteTarea from "./modalDeleteTarea";


function CardTarea({tarea}){

    const {deleteTareaById,updateTareaById}=useProyecto()

    const [alert,setAlert]=useState({msg:'',error:false})

    const deleteTarea= async ()=>{
        try {
            await deleteTareaById(tarea._id)
        } catch (err) {
            console.log(err.message)
            setAlert({
                msg:err.message,
                error:true
            })   
        }
    }

    const handlerEditTarea= async (data)=>{
        const {
            nameTarea,
            description,
            date,
            prioridad
        }=data;

        if([nameTarea,description,date,prioridad].includes('')){
            setAlertFormTarea(
                {
                    msg:'Todos los campos son obligatorios',
                    error:true
                }
            )
            setTimeout(() => {
                setAlertFormTarea(
                    {
                        msg:''
                    }
                )
            }, 2000);
            return
        }

        try {
            const dataTarea={
                nombre:nameTarea,
                descripcion:description,
                fechaEntrega:date,
                prioridad
            }
            await updateTareaById(dataTarea,tarea._id)            
        } catch (err) {
            setAlert(
                {
                    msg:err.message,
                    error:true
                }
            )
        }
    }

    return (
        <div className="w-full flex flex-row flex-wrap items-start border-2 shadow px-5 py-3 rounded-md hover:scale-105 hover:shadow-lg">
            <div className="w-7/12">
                <p className="text-2xl font-bold uppercase">{tarea.nombre}</p>
                <p className="text-lg font-semibold text-align italic">{tarea.descripcion}</p>
                <p className="text-lg font-semibold">{`Fecha de entrega: ${formatDate(tarea.fechaEntrega)}`}</p>
                <p className="text-lg font-semibold">{`Prioridad: ${tarea.prioridad}`}</p>
            </div>
            <div className="w-5/12 flex flex-row justify-center items-start gap-2">
                <ModalTareas
                    value='Editar'
                    alert={alert}
                    handleForm={handlerEditTarea}
                    data={tarea}
                    type='edit'
                    color='bg-lime-400'
                />
                <ModalDeleteTarea
                    value='Eliminar'
                    color='bg-red-500'
                    callDelete={deleteTarea}
                />
                <ButtonForm
                    type='button'
                    value='Completar'
                />
            </div>
            <div>
                {alert.msg.length!==0 && <Alert alert={alert}/>}
            </div>
        </div>
    )
}

export default CardTarea;
