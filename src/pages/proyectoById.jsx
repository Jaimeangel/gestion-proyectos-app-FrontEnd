import { useState ,useEffect} from "react";
import { useParams, Link } from "react-router-dom";

import formatDate from "../helpers/formatDate";

import useProyecto from '../hooks/useProyecto'

import ButtonForm from '../components/buttonForm'


function ProyectoById() {
    const [cargando,setCargando]=useState(true)
    const [data,setData]=useState({})

    const {proyecto}=useParams()
    const {getProyectById}=useProyecto()

    useEffect(()=>{
        const getProyect= async ()=>{
            try {
                const data = await getProyectById(proyecto)
                setData(data)
                setCargando(false)
            } catch (error) {
                console.log(error)
                setCargando(false)
            }
        }
        getProyect()
    },[])
  
    return (
        <div>
            {
                cargando ? <h1>Cargando</h1> :
                    (
                        <div className="w-full px-7">
                            <div className="flex flex-row gap-5">
                                <Link
                                    to={`/proyectos/edit/${proyecto}`}
                                >
                                    <ButtonForm
                                        type='button'
                                        value='Editar'
                                    />
                                </Link>
                                <ButtonForm
                                    type='button'
                                    value='Eliminar'
                                />
                            </div>
                            <div 
                                className="w-[60rem] mx-auto bg-white py-5 mt-5 rounded-lg shadow border px-7"
                            >   
                                <div className="flex flex-row justify-between items-center mb-4">
                                    <h1 className="text-4xl font-bold italic">{data.nombre}</h1>
                                    <h4 className="text-xl italic font-medium text-center">{`Fecha de creación:  ${formatDate(data.createdAt)}`}</h4>
                                </div>
                                <div className="flex flex-row justify-between items-center my-5">
                                    <h2 className="text-3xl italic font-semibold">{data.cliente}</h2>
                                    <h4 className="text-xl italic font-medium text-center">{`Fecha de entrega: ${formatDate(data.fechaEntrega)}`}</h4>
                                </div>
                                <p className="text-xl italic font-normal mt-5">{data.descripcion}</p>
                            </div>
                        </div>
                    )
            }
        </div>
    )
}

export default ProyectoById;
