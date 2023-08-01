import { createContext , useState} from "react";
import axios from "axios";

const ProyectoContext=createContext()

function ProyectoProvider({children}) {
    const [alert,setAlert]=useState({msg:'',error:false})

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
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <ProyectoContext.Provider
            value={{
                alert,
                showAlert,
                submitProyect
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
