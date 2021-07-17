import React from "react";

export default function Saludar(props) {
    const{ userInfo, saludarFn } = props;
    const{nombre = "Anonimo", edad }=userInfo;
    
    console.log(props); //Visualizar Componentes en ConsoleLog Navegador
    console.log(userInfo);

    return (
        <div>
            <button onClick={() => saludarFn(nombre,edad)}>SALUDAR</button>
        </div>
    );

}