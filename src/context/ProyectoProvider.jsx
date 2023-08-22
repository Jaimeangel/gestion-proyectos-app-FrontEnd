import { createContext , useState, useEffect} from "react";
import axios from "axios";
import ValidateErrors from "../helpers/validateErrors";

const ProyectoContext=createContext()

function ProyectoProvider({children}) {
    const [alert,setAlert]=useState({msg:'',err:false})
    const [proyectos,setProyectos]=useState([])
    const [proyectoId,setProyectoId]=useState({})
    const [cargando,setCargando]=useState(true)

    const [tareas,setTareas]=useState([])

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
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
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
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
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
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
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
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
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
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const submitTarea= async (dataTarea)=>{

        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.post('http://localhost:4000/api/tareas',dataTarea,config)
            setTareas([...tareas,data])
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const getTareasByProyect= async (id)=>{
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.get(`http://localhost:4000/api/tareas/${id}`,config)
            setTareas(data)
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
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
                getProyectos,
                submitTarea,
                getTareasByProyect,
                tareas
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
