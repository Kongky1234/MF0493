import React from "react";
import "./style.css";
import Header from "./components/Header";

function App() {

  const extraerDatosDeUsuario = () => {
		const datosRecuperar = JSON.parse(localStorage.getItem('datosUsuario'));
		if (datosRecuperar && datosRecuperar.token) {
			return datosRecuperar.token;
	  }
  };

const token = extraerDatosDeUsuario();
  return (
    <div className="container">
      <Header token={token}/>
    </div>
    
  );
}
  
export default App;
