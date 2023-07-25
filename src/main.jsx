import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {RouterProvider,createBrowserRouter} from 'react-router-dom'

import Authenticate from './layaouts/authenticate.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register'
import RecoverPassword from './pages/recoverPassword'
import RecoverPasswordToken from './pages/recoverPasswordToken'
import ConfirmationToken from './pages/confirmationToken'

const router=createBrowserRouter([
  {
    path:'/',
    element:<Authenticate/>,
    children:[
      {
        path:'login',
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
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider
      router={router}
    />
  </React.StrictMode>,
)
