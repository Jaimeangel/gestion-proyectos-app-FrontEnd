function Alert({alert}){
    const {msg,error}=alert;
    return (
        <div className={`${error ?'bg-red-300 border border-red-500':'bg-blue-300 border border-blue-500'} w-full rounded-lg font-bold text-lg text-center mt-3`}>
            <p>{msg}</p>
        </div>
    )
}

export default Alert;
