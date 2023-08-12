import { createContext , useState, useEffect} from "react";
import axios from "axios";

const ProyectoContext=createContext()

function ProyectoProvider({children}) {
    const [alert,setAlert]=useState({msg:'',err:false})
    const [proyectos,setProyectos]=useState([])
    const [proyectoId,setProyectoId]=useState({})
    const [cargando,setCargando]=useState(true)

    const getProyectos= async ()=>{
        
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }


        try {
            const {data} = await axios('http://localhost:4000/api/proyectos',config)
            setProyectos(data)
        } catch (error) {
            console.log(error)
            throw new Error(error);
        }
    }

    const showAlert=(alerta)=>{
        setAlert(alerta)
        setTimeout(() => {
            setAlert({msg:'',error:false})
        }, 2100);
    }

    const submitProyect= async (dataProyect)=>{

        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data}= await axios.post('http://localhost:4000/api/proyectos',dataProyect,config)
            setProyectos([...proyectos,data])
        } catch (error) {
            console.log(error)
            setAlert({
                msg:error,
                err:true
            })
        }
    }

    const getProyectById= async (id)=>{
        
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try{
            const {data}= await axios(`http://localhost:4000/api/proyectos/${id}`,config)
            setProyectoId(data)
        }catch(error) {
            console.log(error)
            throw new Error(error.response.data.msg);
        }
    }

    const updateProyectById= async (dataUpdate,id)=>{
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data}= await axios.put(`http://localhost:4000/api/proyectos/${id}`,dataUpdate,config)
            const newProyectosUpdate = proyectos.map((proyecto) => (proyecto._id === data._id ? data : proyecto));
            setProyectos(newProyectosUpdate)
        } catch (error) {
            console.log(error)
            setAlert({
                msg:error,
                err:true
            })
        }
    }

    const deleteProyectById = async (id)=>{
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data}= await axios.delete(`http://localhost:4000/api/proyectos/${id}`,config)
            console.log(data)
            const newProyectosUpdate = proyectos.filter((proyecto) => (proyecto._id !== id ));
            setProyectos(newProyectosUpdate)
        } catch (error) {
            console.log(error)
            setAlert({
                msg:error,
                err:true
            })
        }
    }

    return (
        <ProyectoContext.Provider
            value={{
                alert,
                showAlert,
                submitProyect,
                proyectos,
                getProyectById,
                proyectoId,
                updateProyectById,
                setProyectoId,
                deleteProyectById,
                cargando,
                getProyectos
            }}
        >
            {children}
        </ProyectoContext.Provider>
    )
}

export {
    ProyectoContext
}

export default ProyectoProvider;
