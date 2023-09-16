import useProyecto from '../hooks/useProyecto'
import useAuth from '../hooks/useAuth'

const useAdmin=()=>{
    const {proyectoId}=useProyecto()
    const {auth}=useAuth()
        
    return proyectoId.creador === auth._id
}

export default useAdmin;

