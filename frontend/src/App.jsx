// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App



import { Registro } from './components/Registro';
import { Login } from './components/Login';
import { PublicacionMateriales } from './components/PublicarMaterial';
import { HomePage } from './components/HomePage';
import Inscripcion from './components/Inscripcion';
import React, { useState, useEffect } from 'react';
import {VistaMaterialesPublicados} from "./components/VistaMaterialesPublicados";



function App() {
  const [interfaz, setInterfaz] = useState('Login');
  const [userId, setUserId] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [idPublicacion, setIdPublicacion] = useState(null);
  const [userRol, setUserRol] = useState(null);
  const [data, setData] = useState([]);


  const cambiarInterfaz = (nuevaInterfaz) => {
    setInterfaz(nuevaInterfaz);
  };

  const handleLoginSuccess = (id, rol, usuario, data) => {
    setUserId(id);
    setUsuario(usuario);
    setUserRol(rol);
    console.log(id+" id"+usuario+" usuario"+rol+" rol");
    setData(data);
    if (rol === 'Beneficiario') { 
      cambiarInterfaz('HomePage');
    } else if (rol === 'Empresario'){
      cambiarInterfaz('PublicacionMateriales');
    }
  };

  const InscripcionDatos = (IdPubli) =>{
    setIdPublicacion(IdPubli);
    cambiarInterfaz('Inscripcion');
  }

  return (
    <>
      {interfaz === 'Login' && (
        <Login 
          onRegistro={() => cambiarInterfaz('Registro')} 
          onLoginSuccess={handleLoginSuccess} 
        />
      )}
      {interfaz === 'Registro' && (
        <Registro onLogin={() => cambiarInterfaz('Login')} />
      )}
      {interfaz === 'HomePage' && (
        <HomePage usuario={usuario} userId={userId} userRol={userRol} inscript={InscripcionDatos} cambiarInterfaz={cambiarInterfaz} data={data}/>
      )}
      {interfaz === 'PublicacionMateriales' && (

        <PublicacionMateriales usuario={usuario} userId={userId} cambiarInterfaz={cambiarInterfaz}/>
      )} 
      {interfaz === 'Inscripcion' && (
          <Inscripcion fk_idPublicacionDon={idPublicacion} userId={userId} cambiarInterfaz={cambiarInterfaz}/>
      )}
      {interfaz === 'ListaMateriales' && (
          <VistaMaterialesPublicados idEmpresa={userId} cambiarInterfaz={cambiarInterfaz}/>
      )}
    </>
  );
}

export default App;
