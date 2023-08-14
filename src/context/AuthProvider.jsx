import { useState, createContext, useEffect } from "react"
import { redirect } from "react-router-dom"
import axios from 'axios'

const AuthContext=createContext()

function AuthProvider({children}) {

    const [alert,setAlert]=useState({msg:'',err:false})
    const [auth,setAuth]=useState('')

    useEffect(()=>{
        const authUser= async ()=>{
            const token=localStorage.getItem('tks')
    
            if(!token){
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
                setAlert({
                    msg:'',
                    err:false
                })
            }catch(error) {
                console.log(error)
                setAlert({
                    msg:error,
                    err:true
                })
            }
        }

        authUser()


    },[])

    return (
        <AuthContext.Provider
            value={{
                setAuth,
                auth,
                alert 
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
