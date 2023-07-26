import deniedAccees from '../assets/undraw_access_denied_re_awnf.svg'

function AlertImage({msgError}) {
  return (
    <div className="w-full flex flex-col sm:flex-row items-center">
      <div className="w-full sm:w-1/2 flex justify-center">
        <img 
            src={deniedAccees} 
            alt="imagen de confirmacion"
            className="max-w-[16rem]" 
        />
      </div>
      <div className="max-w-[22rem] sm:w-1/2 mt-5 flex flex-col items-center">
          <h1 className="font-bold italic text-3xl">Opps, algo salio mal</h1>
          <p className="text-justify font-semibold text-xl mt-4">{msgError}</p>
      </div>
    </div>
  )
}

export default AlertImage
