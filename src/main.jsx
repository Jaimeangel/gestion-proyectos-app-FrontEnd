import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {RouterProvider,createBrowserRouter} from 'react-router-dom'

//Autenticacion
import Authenticate from './layaouts/authenticate.jsx'
import Login from './pages/Authentication/login.jsx'
import Register from './pages/Authentication/register'
import RecoverPassword from './pages/Authentication/recoverPassword'
import RecoverPasswordToken from './pages/Authentication/recoverPasswordToken'
import ConfirmationToken from './pages/Authentication/confirmationToken'

//Proyectos
import ProtectRoute from './layaouts/protectRoute'
import Proyectos from './pages/proyectos'
import CrearProyecto from './pages/crearProyecto'
import ProyectoById from './pages/proyectoById'
import EditProyectoById from './pages/editProyectoById'

//Colaboradores
import Colaboradores from './pages/colaboradores'

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
      },
      {
        path:':proyecto',
        element:<ProyectoById/>
      },
      {
        path:'edit/:proyecto',
        element:<EditProyectoById/>
      }
    ]
  },
  {
    path:'/colaboradores',
    element:<ProtectRoute/>,
    children:[
      {
        index:true,
        element:<Proyectos/>
      },
      {
        path:':proyecto',
        element:<Colaboradores/>
      },
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
