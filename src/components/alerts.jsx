import AlertImage from './alertImage';

function Alerts({errorThrow}) {
  return (
    <div  className="w-[30rem] mx-auto bg-white py-5 px-5 mt-5 rounded-lg shadow border">
        {errorThrow?.err && <AlertImage msgError={errorThrow.msg}/>}
    </div>
  )
}

export default Alerts;
