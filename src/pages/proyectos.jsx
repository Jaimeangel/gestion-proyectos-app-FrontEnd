import CardProyecto from "../components/cardProyecto";

import { Link } from "react-router-dom";

import useProyecto from "../hooks/useProyecto";


import emptyProyects from '../assets/undraw_empty_re_opql.svg'


function Proyectos() {
  const {proyectos}=useProyecto();

  return (
    <div>
      <h1 className="text-3xl font-bold italic tracking-wide">Tus proyectos</h1>
      <h3 className="text-xl font-normal">Tus proyectos los encontraras aqui</h3>

      <div 
        className="w-[60rem] mx-auto bg-white py-5 mt-5 rounded-lg shadow border grid grid-cols-2 gap-7 px-7"
      >
        {
          proyectos?.map( proyecto =>{
            return <CardProyecto
              proyecto={proyecto}
              key={proyecto._id}
            />
          })
        }

      </div>
    </div>
  )
}

export default Proyectos;
