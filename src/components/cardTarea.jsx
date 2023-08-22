import ButtonForm from "./buttonForm";
import formatDate from "../helpers/formatDate";

function CardTarea({tarea}){
  return (
    <div className="w-full flex flex-row items-start border-2 shadow px-5 py-3 rounded-md hover:scale-105 hover:shadow-lg">
        <div className="w-7/12">
            <p className="text-2xl font-bold uppercase">{tarea.nombre}</p>
            <p className="text-lg font-semibold text-align italic">{tarea.descripcion}</p>
            <p className="text-lg font-semibold">{`Fecha de entrega: ${formatDate(tarea.fechaEntrega)}`}</p>
            <p className="text-lg font-semibold">{`Prioridad: ${tarea.prioridad}`}</p>
        </div>
        <div className="w-5/12 flex flex-row justify-center gap-2">
            <ButtonForm
                type='button'
                value='Editar'
                color='bg-lime-400'
                noMargin={true}
            />
            <ButtonForm
                type='button'
                value='Eliminar'
                color='bg-red-500'
                noMargin={true}
            />
            <ButtonForm
                type='button'
                value='Completar'
                noMargin={true}
            />
        </div>
    </div>
  )
}

export default CardTarea;
