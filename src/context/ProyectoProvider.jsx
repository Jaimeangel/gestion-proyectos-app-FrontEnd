import { createContext , useState, useEffect} from "react";
import axios from "axios";
import ValidateErrors from "../helpers/validateErrors";
//Socket
import { io } from "socket.io-client";
let socket;

const ProyectoContext=createContext()

function ProyectoProvider({children}) {
    const [alert,setAlert]=useState({msg:'',err:false})
    const [proyectos,setProyectos]=useState([])
    const [proyectoId,setProyectoId]=useState({})
    const [cargando,setCargando]=useState(true)

    const [tareas,setTareas]=useState([])
    const [colaboradoresByProyecto,setColaboradoresByProyecto]=useState([])

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

    useEffect(()=>{
        socket = io('http://localhost:4000')
    },[])

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
        setProyectoId({})
        
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

            //socket.io
            socket.emit('new-task',data)
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const getTareasByProyect= async (id)=>{
        setTareas([])
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

    const deleteTareaById= async (id)=>{
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data}= await axios.delete(`http://localhost:4000/api/tareas/${id}`,config)
            const newTareasUpdate = tareas.filter((tarea) => (tarea._id !== id ));
            setTareas(newTareasUpdate)

            //socket.io
            socket.emit('delete-task',data)
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const updateTareaById = async (dataUpdate,id)=>{
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data}= await axios.put(`http://localhost:4000/api/tareas/${id}`,dataUpdate,config)
            const newTareasUpdate = tareas.map((tarea) => (tarea._id === data._id ? data : tarea));
            setTareas(newTareasUpdate)

            //socket.io
            socket.emit('update-task',data)
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }

    }
    
    const getColaborador = async (proyecto,dataEmail)=>{
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data}= await axios.post(`http://localhost:4000/api/proyectos/check-colaboradores/${proyecto}`,dataEmail,config)
            return data
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const addColaborador = async (proyecto,dataColaborador)=>{
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data}= await axios.post(`http://localhost:4000/api/proyectos/colaboradores/${proyecto}`,dataColaborador,config)
            setColaboradoresByProyecto([...colaboradoresByProyecto,data])
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const getColaboradorByProyecto = async (proyecto)=>{
        setColaboradoresByProyecto([])
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data}= await axios.get(`http://localhost:4000/api/proyectos/colaboradores/${proyecto}`,config)
            setColaboradoresByProyecto(data)
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const deleteColaborador = async (proyecto,id)=>{
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data}= await axios.delete(`http://localhost:4000/api/proyectos/colaboradores/${proyecto}/${id}`,config)
            const newColaboradoresUpdate = colaboradoresByProyecto.filter((colaborador) => (colaborador.id !== id ));
            setColaboradoresByProyecto(newColaboradoresUpdate)
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    const changeStateTarea = async (id)=>{
        const token=localStorage.getItem('tks')

        if(!token) return

        const config={
            headers:{
                'Content-Type':'application/json',
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await axios.post(`http://localhost:4000/api/tareas/estado/${id}`,{},config)
            const newTareasUpdate = tareas.map((tarea) => (tarea._id === id ? data : tarea));
            setTareas(newTareasUpdate)
        } catch (error) {
            console.log(error)
            const errMsg= ValidateErrors(error)
            throw new Error(errMsg);
        }
    }

    //socket.io
    const submitTareaSocketIO = (tarea)=>{
        setTareas([...tareas,tarea])
    }
    
    const deleteTareaSocketIO = (tareaDelete)=>{
        const newTareasUpdate = tareas.filter((tarea) => (tarea._id !== tareaDelete._id ));
        setTareas(newTareasUpdate)
    }

    const updateTareaSocketIO = (tareaUpdate)=>{
        const newTareasUpdate = tareas.map((tarea) => (tarea._id === tareaUpdate._id ? tareaUpdate : tarea));
        setTareas(newTareasUpdate)
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
                tareas,
                deleteTareaById,
                updateTareaById,
                getColaborador,
                addColaborador,
                getColaboradorByProyecto,
                colaboradoresByProyecto,
                deleteColaborador,
                changeStateTarea,
                submitTareaSocketIO,
                deleteTareaSocketIO,
                updateTareaSocketIO
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
