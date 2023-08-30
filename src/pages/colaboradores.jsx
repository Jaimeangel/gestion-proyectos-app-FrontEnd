import { useEffect,useState } from "react";
import { useParams} from "react-router-dom";

import InputForm from "../components/inputForm";
import ButtonForm from "../components/buttonForm";

import useProyecto from "../hooks/useProyecto";

function Colaboradores() {
    const {proyecto}=useParams()
    const {proyectoId,getProyectById,getColaborador}=useProyecto()

    const [email,setEmail]=useState('')
    const [colaborador,setColaborador]=useState({})

    useEffect(()=>{
        if(Object.keys(proyectoId).length ===0){
            const proyectById= async ()=>{
                try {
                    await getProyectById(proyecto)
                   /*  setLoading(false) */
                }catch(error) {
                    console.log(error)
/*                     setErrAlert({
                        msg:error.message,
                        err:true
                    })
                    setLoading(false)  */
                }
            }
            proyectById()
        }
    },[])

    const handleSubmit= async (e)=>{
        e.preventDefault()
        try {
            const data= await getColaborador(proyecto,{email})
            setColaborador(data)
        } catch (error) {
            console.log(error)
        }
        
    }

    return (
        <div className="w-full flex flex-col">
            <h1 className="text-3xl font-bold italic mt-5">{`Colaboradores proyecto: ${proyectoId.nombre}`}</h1>
            <form 
                className="w-[30rem] mx-auto px-5 pt-5 pb-8 mt-5 rounded-lg shadow-md border"
                onSubmit={handleSubmit}
            >
                <InputForm
                    name='Correo colaborador'
                    typeInput='email'
                    callback={setEmail}
                    value={email}
                />
                <ButtonForm
                    type='submit' 
                    value='Buscar colaborador'
                    width='full'
                />
            </form>
            
            { Object.keys(colaborador).length!==0 &&
                (
                    <div
                        className="w-[30rem] flex flex-row items-center justify-between mx-auto px-5 pt-5 pb-8 mt-5 rounded-lg shadow-md border"
                    >
                        <p className="text-xl font-semibold italic">{colaborador.nombre}</p>
                        <ButtonForm
                            value='Agregar'
                            type='button'
                        />
                    </div>

                )
            }

        </div>
    )
}

export default Colaboradores;
