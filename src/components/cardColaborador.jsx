import ButtonForm from "./buttonForm";
import useProyecto from "../hooks/useProyecto";
import { useParams } from "react-router-dom";

function CardColaborador({colaborador}){
    const {nombre,email,id}=colaborador;
    const {proyecto}=useParams()
    const {
        deleteColaborador
    }=useProyecto()

    const deleteColaboradorHandler= async ()=>{
        try {
            await deleteColaborador(proyecto,id)
        } catch (error) {
            console.log(error)
        }
    }

    return (
            <div className="w-full border-2 flex flex-row justify-between items-center shadow px-5 py-3 rounded-md hover:scale-105 hover:shadow-lg">
                <div>
                    <div className="flex flex-row my-2">
                        <p className="italic font-semibold">Nombre:&nbsp;&nbsp;</p>
                        <p>{`${nombre}`}</p>
                    </div>
                    <div className="flex flex-row my-2">
                        <p className="italic font-semibold">Email:&nbsp;&nbsp;</p>
                        <p>{`${email}`}</p>
                    </div>

                </div>

                <ButtonForm
                    type='button'
                    value='Eliminar'
                    callback={deleteColaboradorHandler}
                    color='bg-red-500'
                />
            </div>
    )
}

export default CardColaborador;