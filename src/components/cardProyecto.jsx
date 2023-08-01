function CardProyecto({proyecto}){
    const {nombre,cliente,fechaEntrega}=proyecto;
    const date = new Date(fechaEntrega);
    const dateFormat = date.toISOString().substring(0, 10);
    return (
        <div className="w-full shadow px-5 py-3 rounded-md hover:scale-105 hover:shadow-lg">
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
    )
}

export default CardProyecto;
