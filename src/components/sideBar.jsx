import { Link } from "react-router-dom";

function SideBar() {
  return (
    <aside className='w-1/5 h-screen shadow px-7 py-5'>
        <h3 className='text-xl font-semibold'>Hola Jaime</h3>
        <Link
          to={'/proyectos/crear-proyecto'}
        >
          <button className='w-full bg-yellow-400 text-black text-lg tracking-wide font-semibold py-1 rounded border border-black mt-3'>Nuevo proyecto</button>
        </Link>
    </aside>
  )
}

export default SideBar;
