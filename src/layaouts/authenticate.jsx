import { Outlet } from "react-router-dom";

function Authenticate(){
  return (
    <div className='w-full h-screen bg-white'>
        <div className="w-full pt-16 mx-auto flex flex-row justify-center">
            <Outlet/>
        </div>
    </div>
  )
}

export default Authenticate;
