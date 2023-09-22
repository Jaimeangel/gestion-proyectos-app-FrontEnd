import { useState ,useEffect} from "react";
import { useParams, Link } from "react-router-dom";
//Hooks
import useProyecto from '../hooks/useProyecto'
import useAdmin from "../hooks/useAdmin";
//Componenents
import ButtonForm from '../components/buttonForm'
import Spinner from '../components/spinner'
import HandleStatus from "../components/handleStatus";
import Alerts from "../components/alerts";
import AlertImage from "../components/alertImage";
import ProyectId from "../components/proyectId";
//Images
import deleteProyectImg from '../assets/undraw_throw_away_re_x60k.svg'
//Socket
import { io } from "socket.io-client";
let socket;

function ProyectoById() {
    const {proyecto}=useParams()
    const {
        getProyectById,
        deleteProyectById,
        proyectoId,
        showAlert,
        alert,
        getTareasByProyect,
        submitTarea,
        tareas
    }=useProyecto()

    const isAdmin=useAdmin()

    const [alertFormTarea,setAlertFormTarea]=useState({msg:'',error:false})
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
                    msg:error.message,
                    err:true
                })
                setLoading(false) 
            }
        }
        proyectById()

        const tareas= async ()=>{
            try {
              await getTareasByProyect(proyecto)
            } catch (error) {
              console.log(error)
              setErrAlert({
                msg:error.message,
                err:true
              })

            }
        }
        tareas()

    },[])

    useEffect(()=>{
        socket = io('http://localhost:4000')
        socket.emit("open-project-id",proyecto)
    },[])

    useEffect(()=>{
        socket.on('respuesta',(persona)=>{
            console.log('dentro de: ',persona)
        })
    })

    const deleteProyect= async ()=>{
        try {
            await deleteProyectById(proyecto) 
            setDeleteById(true)
        } catch (error) {
            console.log(error)
            showAlert({
                msg:error.message,
                error:true
            })   
        }
    }

    const handleCreateTarea= async (data)=>{
        const {
            nameTarea,
            description,
            date,
            prioridad,
            colaborador
        }=data;

        if([nameTarea,description,date,prioridad,colaborador].includes('')){
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
                prioridad,
                proyecto:proyecto,
                colaborador
            }
            await submitTarea(dataTarea)            
        } catch (err) {
            showAlert(
                {
                    msg:err.message,
                    error:true
                }
            )
        }
    }

    return (
        <HandleStatus
            data={proyectoId}
            err={errAlert}
            cargando={loading}
        >
            {
                (load,err,errNet,noContent,data) => (
                    <>
                        {
                            load && <Spinner/>
                        }
                        {
                           err.err && <Alerts errorThrow={errNet}/>
                        }
                        {
                            data && !load && !deleteById && !err.err &&
                            (
                                <ProyectId
                                    url={proyecto}
                                    callbackDelete={deleteProyect}
                                    data={data}
                                    alert={alert}
                                    alertFormTarea={alertFormTarea}
                                    callbackHandleCreateTarea={handleCreateTarea}
                                    tareas={tareas}
                                    isAdmin={isAdmin}
                                />
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
    )
}

export default ProyectoById;
