import React from 'react'

import AlertImage from './alertImage';
import ErrorNetwork from './errorNetwork'

function Alerts({errServer,errNet}) {
  return (
    <div  className="w-[30rem] mx-auto bg-white py-5 mt-5 rounded-lg shadow border">
        {errServer.error && <AlertImage msgError={errServer.msg} width='2/6'/>}
        {errNet.error && <ErrorNetwork msgError={errNet.msg}/>}
    </div>
  )
}

export default Alerts;
