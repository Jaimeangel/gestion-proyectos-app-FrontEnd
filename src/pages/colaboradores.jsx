import useProyecto from "../hooks/useProyecto";
import { useEffect,useState } from "react";
import { useParams} from "react-router-dom";
import ModalCreateColaborador from "../components/modalCreateColaborador";
import CardColaborador from '../components/cardColaborador'
import useAdmin from "../hooks/useAdmin";
import AlertImage from "../components/alertImage";

//Img
import NoTareas from '../assets/undraw_os_upgrade_re_r0qa.svg'

function Colaboradores() {
    const {proyecto}=useParams()
    const isAdmin=useAdmin()
    const {
        proyectoId,
        getProyectById,
        getColaboradorByProyecto,
        colaboradoresByProyecto
    }=useProyecto()

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

    useEffect(()=>{
        const colaboradoresByProyecto= async ()=>{
            try {
                await getColaboradorByProyecto(proyecto)
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
        colaboradoresByProyecto()
    },[])


    return (
        <div className="w-full flex flex-col">
            <h1 className="text-3xl font-bold italic mt-5">{`Colaboradores proyecto: ${proyectoId.nombre}`}</h1>
            <div>
                {
                    isAdmin && (
                        <ModalCreateColaborador
                            value={'Agregar nuevo colaborador'}
                        />
                    )
                }

                <div
                    className="w-[60rem] mx-auto bg-white py-5 mt-5 rounded-lg shadow border grid grid-cols-1 gap-7 px-7"
                >
                    {
                        colaboradoresByProyecto.length === 0 && (
                            <AlertImage
                                msg='Aun no hay colaboradores'
                                imgAlert={NoTareas}
                            />
                        )
                    }
                    {
                        colaboradoresByProyecto.map(data=>(
                            <CardColaborador
                                colaborador={data}
                                key={data.id}
                            />
                        ))
                    }
                </div>  
            </div>
        </div>
    )
}

export default Colaboradores;
