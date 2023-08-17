import { useEffect, useState } from "react";
//Components
import InputForm from "./inputForm";
import Alert from "./alert";
import ButtonForm from "./buttonForm";
//Helpers
import formatDate from "../helpers/formatDate";

function FormData({handlerForm,alert,showAlert,dataEdit={},type}) {  
    const [nameProyecto,setNameProyecto]=useState('')
    const [date,setDate]=useState('')
    const [cliente,setCliente]=useState('')
    const [description,setDescription]=useState('')

    const handleValidate= async (e)=>{
        e.preventDefault()

        if([nameProyecto,date,cliente,description].includes('')){
          showAlert({
            msg:'Todos los campos son obligatorios',
            error:true
          })
          return
        }

        try{
            await handlerForm(nameProyecto,date,cliente,description)
            setNameProyecto('')
            setDate('')
            setCliente('')
            setDescription('')
        }catch(error){
            console.log(error)
            showAlert({
                msg:error,
                error:true
            })
        }
    }

    useEffect(()=>{
        if(Object.keys(dataEdit).length !==0){
            setNameProyecto(dataEdit.nombre)
            setDate(formatDate(dataEdit.fechaEntrega))
            setCliente(dataEdit.cliente)
            setDescription(dataEdit.descripcion)
        }
    },[dataEdit])

    return (
        <form onSubmit={handleValidate} className="w-4/5">
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
                value={`${type === 'edit' ? 'Editar proyecto':'Crear proyecto'}`}
                width='full'
            />
        </form>
    )
}

export default FormData;
