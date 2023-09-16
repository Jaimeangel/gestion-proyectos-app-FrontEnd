import { Link } from "react-router-dom";
import formatDate from "../helpers/formatDate";
import useAuth from '../hooks/useAuth'

function CardProyecto({proyecto}){
    const {
        nombre,
        cliente,
        fechaEntrega,
        _id,
        creador
    }=proyecto;
    const {auth}=useAuth();
    const dateFormat = formatDate(fechaEntrega);

    return (
        <Link
            to={`${_id}`}
        >
            <div className="w-full border-2 shadow px-5 py-3 rounded-md hover:scale-105 hover:shadow-lg">
                {
                    auth._id !== creador && (
                        <div className='bg-green-400 border border-green-600 w-40 rounded font-bold text-lg text-center text-black mt-3 px-4'>
                            <p className="italic tracking-wider">Colaborador</p>
                        </div>
                    )
                }
                <div className="flex flex-row my-2">
                    <p className="italic font-semibold">Nombre del proyecto:&nbsp;&nbsp;</p>
                    <p>{`${nombre}`}</p>
                </div>
                <div className="flex flex-row my-2">
                    <p className="italic font-semibold">Nombre del cliente:&nbsp;&nbsp;</p>
                    <p>{`${cliente}`}</p>
                </div>
                <div className="flex flex-row my-2">
                    <p className="italic font-semibold">Fecha de entrega:&nbsp;&nbsp;</p>
                    <p>{dateFormat}</p>
                </div>
            </div>
        </Link>
    )
}

export default CardProyecto;
