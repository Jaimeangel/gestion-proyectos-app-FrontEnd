function ButtonForm({value,width,type,callback,color,noMargin=false}) {
  const bgColor=color || 'bg-yellow-400'
  return (
    <input
        onClick={callback} 
        type={type}
        value={value}
        className={`w-${width} tracking-wider cursor-pointer uppercase ${bgColor} px-3 py-2 rounded border border-black ${noMargin?'mt-0':'mt-5'} font-bold`}
    />
  )
}

export default ButtonForm;
