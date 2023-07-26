import networkError from '../assets/undraw_bug_fixing_oc-7-a.svg'

function ErrorNetwork({msgError}) {
  return (
    <div className="w-full flex flex-col items-center">
      <img 
          src={networkError} 
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

export default ErrorNetwork;
