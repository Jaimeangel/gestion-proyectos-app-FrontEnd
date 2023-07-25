import { Outlet } from "react-router-dom";

function Authenticate(){
  return (
    <div className='w-full h-screen bg-white'>
        <div className="max-w-md pt-16 mx-auto flex flex-row justify-center">
            <Outlet/>
        </div>
    </div>
  )
}

export default Authenticate;
