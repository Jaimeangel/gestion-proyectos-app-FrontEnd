import React from 'react'
import ReactDOM from 'react-dom/client'
import Authenticate from './layaouts/authenticate.jsx'
import Login from './pages/login.jsx'
import './index.css'

import {RouterProvider,createBrowserRouter} from 'react-router-dom'

const router=createBrowserRouter([
  {
    path:'/login',
    element:<Authenticate/>,
    children:[
      {
        index:true,
        element:<Login/>
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
