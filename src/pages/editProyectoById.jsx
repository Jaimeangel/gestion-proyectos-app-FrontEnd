import { useState,useEffect } from "react";
import { useParams,Link } from "react-router-dom";

//Hooks
import useProyecto from "../hooks/useProyecto";
//Components
import ButtonForm from "../components/buttonForm";
import FormData from "../components/formData";
import AlertImage from "../components/alertImage";
import Alerts from "../components/alerts";
//Img
import doneImg from '../assets/undraw_done_re_oak4.svg'


function EditProyectoById() {
    const [edit,setEdit]=useState(false)
    const [dataEdit,setDataEdit]=useState({})
    const [errAlert,setErrAlert]=useState({msg:'',err:false})
    
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
                    setErrAlert({
                        msg:error.message,
                        err:true
                    })
                }
            }
            getProyect()
        }
    },[])

    useEffect(()=>{
        if(Object.keys(proyectoId).length !==0){
            setDataEdit({
                nombre:proyectoId.nombre,
                fechaEntrega:proyectoId.fechaEntrega,
                cliente:proyectoId.cliente,
                descripcion:proyectoId.descripcion
            })
        }

    },[proyectoId])

    const handleSubmitEditProyect= async (nombre,fecha,cliente,descrip)=>{
        try {
            await updateProyectById(
                {
                    nombre:nombre,
                    fechaEntrega:fecha,
                    cliente,
                    descripcion:descrip
                },
                proyecto
            )
            setEdit(true)
        }catch(error){
            console.log(error)
            showAlert({
                msg:error.message,
                error:true
            })
        }
    }
    
    return (
        <div>
            <h1 className="text-3xl font-bold italic tracking-wide">Editar un proyecto</h1>
            <h3 className="text-xl font-normal">A continuacion encontraras el formulario para editar tus propios proyectos</h3>

            {
                errAlert.err && <Alerts errorThrow={errAlert}/>
            }
            
            {
                !errAlert.err && 
                (
                    <div className="w-[40rem] mx-auto bg-white flex flex-col items-center py-5 mt-5 rounded-lg shadow-md border">
                        {
                            edit && !errAlert.err &&
                            (
                                <AlertImage
                                        imgAlert={doneImg}
                                        wdth='4/6'
                                        msg={'Su proyecto fue editado con exito'}
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
                                            <Link
                                                to={`/proyectos/${proyecto}`}
                                            >
                                                <ButtonForm
                                                    type='button' 
                                                    value='Ver proyecto actual'
                                                    width='1/2'
                                                />
                                            </Link>
                                        </div>
                                </AlertImage>
                            ) 
        
                        }
                        {
                            !edit && !errAlert.err &&
                            (
                                <FormData
                                    handlerForm={handleSubmitEditProyect}
                                    alert={alert}
                                    showAlert={showAlert}
                                    dataEdit={dataEdit}
                                    type='edit'
                                />
                            )
                        }
                    </div>
                )
            }

        </div>
    )
}

export default EditProyectoById;
