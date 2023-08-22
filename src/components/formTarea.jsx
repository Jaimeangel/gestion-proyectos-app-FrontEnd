import { useState } from "react"
//Components
import InputForm from "./inputForm"
import ButtonForm from "./buttonForm"
import Alert from "./alert"

const PRIORIDADES=["Baja","Media","Alta"]

function FormTarea({type,alert,handleForm,close}) {
    //Data
    const [nameTarea,setNameTarea]=useState('')
    const [description,setDescription]=useState('')
    const [date,setDate]=useState('')
    const [prioridad,setPrioridad]=useState('')

    const handler=(e)=>{
        e.preventDefault()
        handleForm({nameTarea,description,date,prioridad})
        close()
    }

    return (
        <form onSubmit={handler} className="w-5/5">
            {alert.msg.length!==0 && <Alert alert={alert}/>}
            <InputForm
                name='Nombre tarea'
                typeInput='text'
                callback={setNameTarea}
                value={nameTarea}
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
            <div className='flex flex-col gap-1 items-left mt-3'>
                <label className='text-lg font-bold tracking-wider italic'>Prioridad</label>
                <select
                    value={prioridad}
                    onChange={(e)=>setPrioridad(e.target.value)}
                    className="w-full outline-none bg-gray-50 cursor-pointer border rounded-xl px-6 py-2 border-black"
                >
                    <option value=''>Elige una opcion</option>
                    {
                        PRIORIDADES.map((opcion,index)=>{
                            return <option key={index} value={opcion}>{opcion}</option>
                        })
                    }
                </select>
            </div>
            <ButtonForm
                type='submit' 
                value={`${type === 'edit' ? 'Editar tarea':'Crear tarea'}`}
                width='full'
            />
        </form>
    )
}

export default FormTarea;
