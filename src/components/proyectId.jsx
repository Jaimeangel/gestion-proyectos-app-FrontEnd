import { Link ,useParams} from "react-router-dom"
//Components
import ButtonForm from "./buttonForm"
import Alert from "./alert"
import ModalTareas from "./modalTareas"
import CardTarea from "./cardTarea"
import AlertImage from "./alertImage"
//Helpers
import formatDate from "../helpers/formatDate"
//Hooks
import useAdmin from "../hooks/useAdmin"
//Img
import NoTareas from '../assets/undraw_os_upgrade_re_r0qa.svg'

function ProyectId({url,callbackDelete,data,alert,alertFormTarea,callbackHandleCreateTarea,tareas}) {

    const {proyecto}=useParams()
    const isAdmin=useAdmin()
    
    return (
        <div className="w-full px-7">
            {alert.msg.length!==0 && <Alert alert={alert}/>}

            <div>
                <div className="flex flex-row gap-5">
                    {
                        isAdmin && (
                            <>
                                <Link
                                    to={`/proyectos/edit/${url}`}
                                >
                                    <ButtonForm
                                        type='button'
                                        value='Editar'
                                        color='bg-lime-400'
                                    />
                                </Link>
                                <ButtonForm
                                    type='button'
                                    value='Eliminar'
                                    callback={callbackDelete}
                                    color='bg-red-500'
                                />
                            </>
                            
                        )
                    }

                    <Link
                        to={`/colaboradores/${proyecto}`}
                    >
                        <ButtonForm
                            type='button'
                            value='Colaboradores'
                        />
                    </Link>
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
            
            <div>
                {
                    isAdmin && (
                        <div className="flex flex-row gap-5">
                            <ModalTareas
                                value={'Agregar nueva tarea'}
                                alert={alertFormTarea}
                                handleForm={callbackHandleCreateTarea}
                            />
                        </div>
                    )
                }
                <h1 className="text-3xl font-bold italic mt-5">Tareas del proyecto</h1>
                <div 
                    className="w-[60rem] mx-auto bg-white py-5 mt-5 rounded-lg shadow border grid grid-cols-1 px-7 gap-4"
                >
                    {
                        tareas.length === 0 && (
                            <AlertImage
                                msg='Aun no hay tareas creadas'
                                imgAlert={NoTareas}
                                wdth='1/2'
                            />
                        )
                    }
                    {
                        tareas?.map( tarea =>(
                            <CardTarea
                                tarea={tarea}
                                key={tarea._id}
                            />
                        ))
                    }   
                </div>
            </div>
        </div>
    )
}

export default ProyectId;
