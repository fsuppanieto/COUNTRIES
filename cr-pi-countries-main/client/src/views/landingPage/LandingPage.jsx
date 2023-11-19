import React from "react";
import { Link } from "react-router-dom";
import backgroundImg from "../../utils/mapaPintadoEfecto.jpg";

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="background-image">
        {/* Utiliza la imagen de fondo importada */}
        <img src={backgroundImg} alt="Background" />
      </div>
      <div className="welcome-message">
        <h1>Bienvenido a mi Proyecto</h1>
        <p>Explora el mundo de los países</p>
        <Link to="/home">Home Page</Link>
      </div>
    </div>
  );
}

export default LandingPage;
