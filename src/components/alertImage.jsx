import deniedAccees from '../assets/undraw_access_denied_re_awnf.svg'

function AlertImage({msgError,imgAlert,msg,width,children}) {
  return (
    <div className="w-full flex flex-col  items-center">
        <img 
            src={imgAlert || deniedAccees} 
            alt="imagen de confirmacion"
            className={`w-${width}`}
        />
      <div className="max-w-[22rem] sm:w-1/2 mt-5 flex flex-col items-center">
          <h1 className="font-bold italic text-3xl">Opps, algo salio mal</h1>
          <h1 className="font-bold italic text-2xl">{msg}</h1>
          <p className="text-justify font-semibold text-xl mt-4">{msgError}</p>
      </div>
      {children}
    </div>
  )
}

export default AlertImage
