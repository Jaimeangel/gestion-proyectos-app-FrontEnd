function ValidateErrors(errorCode) {
    let value=errorCode.response.status
    if(!errorCode.response.status){
        value=errorCode.code
    }
    const errors={
        404: errorCode?.response?.data?.msg || "Parece que hubo un problema con la solicitud que enviaste",
        401: errorCode?.response?.data?.msg || "Lo siento, pero parece que no tienes permisos para acceder a esta página",
        404: errorCode?.response?.data?.msg || "Parece que la página que estás buscando no se encuentra por aquí",
        501: errorCode?.response?.data?.msg || " ¡Algo salió mal en nuestro lado! Estamos experimentando dificultades técnicas, intentelo mas tarde",
        "ERR_NETWORK":" ¡Algo salió mal en nuestro lado! Estamos experimentando dificultades técnicas, intentelo mas tarde",
        "ERR_BAD_REQUEST":"Parece que hubo un problema con la solicitud que enviaste"
    }
    return errors[value]
}

export default ValidateErrors;
