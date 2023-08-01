import useAuth from "../hooks/useAuth";
import MainLayaout from "./mainLayaout";
import { Navigate } from "react-router-dom";

function ProtectRoute() {

    const {auth,cargando}=useAuth()

    if(cargando) return

    return (
        <div>
            {auth._id ? <MainLayaout/> : <Navigate to={'/'}/>}
        </div>
    )
}

export default ProtectRoute;
