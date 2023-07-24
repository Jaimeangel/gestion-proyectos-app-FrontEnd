import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {RouterProvider,createBrowserRouter} from 'react-router-dom'

import Authenticate from './layaouts/authenticate.jsx'
import Login from './pages/login.jsx'
import Register from './pages/register'
import RecoverPassword from './pages/recoverPassword'

const router=createBrowserRouter([
  {
    path:'/login',
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
