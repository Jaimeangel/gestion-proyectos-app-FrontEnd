import deniedAccees from '../assets/undraw_access_denied_re_awnf.svg'

function AlertImage({msgError}) {
  return (
    <div className="w-full flex flex-col items-center">
      <img 
          src={deniedAccees} 
          alt="imagen de confirmacion"
          className="w-5/6" 
      />
      <div className="w-full flex flex-col items-center mt-5">
          <h1 className="font-bold italic text-3xl">Opps, algo salio mal</h1>
          <p className="text-justify font-semibold text-xl mt-4">{msgError}</p>
      </div>
    </div>
  )
}

export default AlertImage
