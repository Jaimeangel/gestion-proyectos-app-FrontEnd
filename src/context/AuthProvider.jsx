import { useState, createContext, useEffect } from "react"
import { redirect } from "react-router-dom"
import axios from 'axios'

const AuthContext=createContext()

function AuthProvider({children}) {


    const [auth,setAuth]=useState('')
    const [cargando,setCargando]=useState(true)

    useEffect(()=>{
        const authUser= async ()=>{
            const token=localStorage.getItem('tks')
    
            if(!token){
                setCargando(false)
                console.log('aqui no hay token')
                return
            }

            const config={
                headers:{
                    'Content-Type':'application/json',
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await axios('http://localhost:4000/api/usuarios/perfil',config)
                setAuth(data)
                setCargando(false)
                return redirect('/proyectos')
            } catch (error) {
                console.log(error)
                setCargando(false)
            }
        }

        authUser()


    },[])

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                cargando 
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthContext
}

export default AuthProvider;
