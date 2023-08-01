import LogOut from '../assets/log-out-svgrepo-com.svg'
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className='w-full flex flex-row px-7 py-4 justify-between items-center'>
        <h1 className='font-black text-3xl text-yellow-500 tracking-wider'>
            MSproject
        </h1>

        <input 
            type="text"
            placeholder='Busca tus proyectos'
            className='placeholder:text-gray-500 placeholder:italic placeholder:text-lg bg-gray-50 w-[20rem] h-[2.5rem] outline-none border border-gray-300 rounded px-5 tracking-wide' 
        />

        <div className='flex flex-row items-center gap-3 w-[12rem] justify-between'>
            <Link
                to={'/proyectos'}
            >
                <h1 className='font-black text-lg tracking-normal'>PROYECTOS</h1>
            </Link>
            <img 
                src={LogOut} 
                alt="Logout"
                className='w-[2.8rem]' 
            />
        </div>

    </div>
  )
}

export default Nav;
