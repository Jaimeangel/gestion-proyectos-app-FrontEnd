import useAuth from "../hooks/useAuth";
import { Outlet, Navigate } from "react-router-dom";

function ProtectRoute() {

    const {auth,cargando}=useAuth()

    if(cargando) return

    return (
        <div>
            {auth._id ? <Outlet/> : <Navigate to={'/login'}/>}
        </div>
    )
}

export default ProtectRoute;
