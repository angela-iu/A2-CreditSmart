import React from "react";
import "../styles/footer.css"; //Para importar los estilos específicos del footer.

//Declaración del componente
function Footer() { // El JSX dentro del return es lo que se va a mostrar en pantalla
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* Logo */}
        <div className="footer-logo">
          <img src="/img/CreditSmart_logo.png" alt="CreditSmart Logo" />
        </div>

        {/* Enlaces Rápidos */}
        <div className="footer-section">
          <h4>Enlaces Rápidos</h4>
          <ul className="footer-links">
            <li><a href="/">Inicio</a></li>
            <li><a href="/simulator">Simulador</a></li>
            <li><a href="/request">Solicitar</a></li>
          </ul>
        </div>

        {/* Contacto */}
        <div className="footer-section">
          <h4>Contacto</h4>
          <p>Email: <a href="mailto:creditsmart@gmail.com">creditsmart@gmail.com</a></p>
          <p>Tel: 311 324 6995</p>
          <p>Dirección: Cra 25 #64</p>
        </div>

        {/* Redes Sociales */}
        <div className="footer-section">
          <h4>Redes Sociales</h4>
          <ul className="footer-social">
            <li>
              <a href="https://www.facebook.com/">
                <img src="/img/facebook.png" alt="Logo_Facebook" className="social-icon" /> Facebook
              </a>
            </li>
            <li>
              <a href="https://www.instagram.com/">
                <img src="/img/logotipo-de-instagram.png" alt="Logo_Instagram" className="social-icon" /> Instagram
              </a>
            </li>
            <li>
              <a href="https://www.youtube.com/">
                <img src="/img/youtube.png" alt="Logo_YouTube" className="social-icon" /> YouTube
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2025 CreditSmart. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer; // Permite importar Footer en cualquier página, como Home, Simulator, etc.
