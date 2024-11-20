import 'react'

import Logo from '../assets/logocomix2.png'
import './css/Footer.css' // Importando o CSS

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
      <img src={Logo} className="footer-logo" />
        <p>&copy; {new Date().getFullYear()} ComixLog. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
