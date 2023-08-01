import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {RouterProvider,createBrowserRouter} from 'react-router-dom'

//Autenticacion
import Authenticate from './layaouts/authenticate.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register'
import RecoverPassword from './pages/recoverPassword'
import RecoverPasswordToken from './pages/recoverPasswordToken'
import ConfirmationToken from './pages/confirmationToken'

//Proyectos
import ProtectRoute from './layaouts/protectRoute'
import Proyectos from './pages/proyectos'
import CrearProyecto from './pages/crearProyecto'

//Contexts
import AuthProvider from './context/AuthProvider'
import ProyectoProvider from './context/ProyectoProvider'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Authenticate/>,
    children:[
      {
        index:true,
        element:<Login/>
      },
      {
        path:'register',
        element:<Register/>
      },
      {
        path:'recover-password',
        element:<RecoverPassword/>
      },
      {
        path:'recover-password/:token',
        element:<RecoverPasswordToken/>
      },
      {
        path:'confirmation/:token',
        element:<ConfirmationToken/>
      }
    ]
  },
  {
    path:'/proyectos',
    element:<ProtectRoute/>,
    children:[
      {
        index:true,
        element:<Proyectos/>
      },
      {
        path:'crear-proyecto',
        element:<CrearProyecto/>
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <ProyectoProvider>
      <RouterProvider
        router={router}
      />
    </ProyectoProvider>
  </AuthProvider>
)
