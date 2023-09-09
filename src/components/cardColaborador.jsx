function CardColaborador({colaborador}){
    return (
            <div className="w-full border-2 shadow px-5 py-3 rounded-md hover:scale-105 hover:shadow-lg">
                <div className="flex flex-row my-2">
                    <p className="italic font-semibold">Nombre del proyecto:&nbsp;&nbsp;</p>
                    <p>{`${colaborador.nombre}`}</p>
                </div>
                <div className="flex flex-row my-2">
                    <p className="italic font-semibold">Nombre del cliente:&nbsp;&nbsp;</p>
                    <p>{`${colaborador.email}`}</p>
                </div>
            </div>
    )
}

export default CardColaborador;