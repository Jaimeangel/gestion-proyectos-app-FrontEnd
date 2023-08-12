import { useState ,useEffect} from "react";
import { useParams, Link } from "react-router-dom";

import formatDate from "../helpers/formatDate";

import useProyecto from '../hooks/useProyecto'

import ButtonForm from '../components/buttonForm'

import Spinner from '../components/spinner'


import deleteProyectImg from '../assets/undraw_throw_away_re_x60k.svg'

import HandleStatus from "../components/handleStatus";

import Alerts from "../components/alerts";

import AlertImage from "../components/alertImage";

function ProyectoById() {
    const {proyecto}=useParams()
    const {
        getProyectById,
        deleteProyectById,
        proyectoId
    }=useProyecto()

    const [errAlert,setErrAlert]=useState({msg:'',err:false})
    const [loading,setLoading]=useState(true)
    const [deleteById,setDeleteById]=useState(false)

    useEffect(()=>{
        const proyectById= async ()=>{
            try {
                await getProyectById(proyecto)
                setLoading(false)
            }catch(error) {
                setErrAlert({
                    msg:error,
                    err:true
                })
                setLoading(false) 
            }
        }
        proyectById()
    },[])

    const deleteProyect= async ()=>{
        try {
            await deleteProyectById(proyecto) 
            setDeleteById(true)
        } catch (error) {
            console.log(error)   
        }
    }
  
    return (
        <HandleStatus
            data={proyectoId}
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
                            data && !load && !deleteById && !err.err &&
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
                                            callback={deleteProyect}
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
                        {
                            deleteById && !err.err &&
                            (
                                <AlertImage
                                    imgAlert={deleteProyectImg}
                                    wdth='4/6'
                                    msg={'Su proyecto fue eliminado con exito'}
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
                                    </div>
                                </AlertImage>
                            )
                        }
                    </>
                )
            }

        </HandleStatus>
/*         <div>
            {
                cargando 
                    ? 
                        <div className="flex justify-center">
                            <Spinner/>
                        </div>
                    :
                        !deleteById 
                            ?
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
                                                callback={deleteProyect}
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
                            :
                                (
                                    alert.err===true
                                    ?
                                        (
                                            <div  className="w-[30rem] mx-auto bg-white py-5 mt-5 rounded-lg shadow border">
                                                {alertImg.msg?.length!==0 && <AlertImage msgError={alertImg.msg}/>}
                                                {errNet.msg?.length!==0 && <ErrorNetwork msgError={errNet.msg}/>}
                                            </div>
                                        ) 
                                    :
                                        (
                                            <div className="w-full flex flex-col items-center">
                                                <img 
                                                    src={deleteProyectImg} 
                                                    alt="imagen de confirmacion"
                                                    className="w-3/6" 
                                                />
                                                <div className="w-full flex flex-col items-center mt-5">
                                                    <h1 className="font-bold italic text-3xl">{`Su proyecto fue eliminado con exito`}</h1>
                                                </div>
                            
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
                                                </div>
                                            </div>
                                        )
                                )
            }
        </div> */
    )
}

export default ProyectoById;
