import React,{useState,useEffect} from "react";
import logo from './logo.svg';
import './App.css';
import Saludar from "./components/Saludar";


function App() {

  //const userName = "Eduardo Jauregui";
  //const edad = "26 años";
  const [stateCar,setStateCar]=useState(false);
  const [contar,setContar]=useState(0);

  useEffect(() => {
    console.log("Total: "+contar);
  },[contar]);

  
  const user = { //Objeto credo
    nombre: "Eduardo",
    edad: 26,
    color: "Azul",
  }

  const saludarFn = (nombre,edad) => {
    console.log("Hola "+ nombre +" tiene "+ edad +" años.");
    console.log(`Hola ${nombre}, tiene ${edad} años`);
  }

  const encenderApagar  = () =>{
    setContar(contar+1);
    setStateCar(!stateCar);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/*<Saludar name="Eduardo Jauregui" edad="18"/>*/}
        {/*<Saludar name={userName} edad={edad} />*/} 
        {/*<Saludar userInfo={user} saludarFn={saludarFn}/>*/} 
        <h3>El coche esta: {stateCar ? "Encendido":"Apagado"} </h3>
        <h3>#Clicks {contar}</h3>
        <button onClick={encenderApagar}>Encender</button> 
      </header>
    </div>
  );
}

export default App;


