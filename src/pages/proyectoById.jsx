import { useState ,useEffect} from "react";
import { useParams, Link } from "react-router-dom";
//Hooks
import useProyecto from '../hooks/useProyecto'
//Componenents
import ButtonForm from '../components/buttonForm'
import Spinner from '../components/spinner'
import HandleStatus from "../components/handleStatus";
import Alerts from "../components/alerts";
import AlertImage from "../components/alertImage";
import ProyectId from "../components/proyectId";
//Images
import deleteProyectImg from '../assets/undraw_throw_away_re_x60k.svg'


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
                                <ProyectId
                                    url={proyecto}
                                    callbackDelete={deleteProyect}
                                    data={data}
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
