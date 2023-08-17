import { Link } from "react-router-dom"
//Components
import ButtonForm from "./buttonForm"
import Alert from "./alert"
//Helpers
import formatDate from "../helpers/formatDate"

function ProyectId({url,callbackDelete,data,alert}) {
  return (
    <div className="w-full px-7">
        {alert.msg.length!==0 && <Alert alert={alert}/>}
        <div className="flex flex-row gap-5">
            <Link
                to={`/proyectos/edit/${url}`}
            >
                <ButtonForm
                    type='button'
                    value='Editar'
                />
            </Link>
            <ButtonForm
                type='button'
                value='Eliminar'
                callback={callbackDelete}
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

export default ProyectId;
