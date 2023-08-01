import Nav from '../components/Nav.jsx'
import SideBar from '../components/sideBar.jsx';

import { Outlet } from 'react-router-dom';

function MainLayaout() {
  return (
    <div className='w-full'>

      <Nav/>

      <div className='w-full h-screen flex flex-row bg-slate-50'>

        <SideBar/>
        
        <div className='w-4/5 shadow px-10 py-10 overflow-scroll bg-white'>
          <Outlet/>
        </div>

      </div>

    </div>
  )
}

export default MainLayaout;