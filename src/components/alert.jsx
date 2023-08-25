function Alert({alert}){
    const {msg,error}=alert;
    console.log(msg)
    console.log(error)
    return (
        <div className={`${error ?'bg-red-200 border border-red-600':'bg-blue-300 border border-blue-500'} w-full rounded font-bold text-lg text-center mt-3 px-4`}>
            <p className="italic tracking-wider">{msg}</p>
        </div>
    )
}

export default Alert;
