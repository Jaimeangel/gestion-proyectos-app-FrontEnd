import useProyecto from "../hooks/useProyecto";

function Proyectos() {
  const {test}=useProyecto();
  console.log(test)
  return (
    <h1>Aqui se listan todos los proyectos</h1>
  )
}

export default Proyectos;
