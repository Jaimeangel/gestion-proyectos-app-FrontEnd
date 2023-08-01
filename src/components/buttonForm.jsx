function ButtonForm({value,width,type,callback}) {
  return (
    <input
        onClick={callback} 
        type={type}
        value={value}
        className={`w-${width} tracking-wider cursor-pointer uppercase bg-yellow-400 px-3 py-2 rounded border border-black mt-5 font-bold`}
    />
  )
}

export default ButtonForm;
