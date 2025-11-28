import React from "react"; 
import "../styles/hero.css"; //Para importar los estilos del Hero

function Hero({ titulo, parrafos }) { //Recibe props
  return (
    <section className="hero">
      <div className="container">
        <h2>{titulo}</h2>
        {parrafos.map((texto, index) => (  //Recorre el array y devuelve un <p>
          <p key={index}>{texto}</p> //Le dice a React cuáles son los elementos dentro de una lista
        ))}
      </div>
    </section>
  );
}

export default Hero;
