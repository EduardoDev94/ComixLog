import { useState } from 'react'; 
import { useNavigate } from 'react-router-dom'; // Importando useNavigate do react-router-dom
import Logo from '../assets/logocomix2.png';
import './css/Headertwo.css'; 

const Headertwo = () => {
  const [menuOpen, setMenuOpen] = useState(false); 
  const navigate = useNavigate(); // Usando o hook useNavigate para redirecionamento

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Função para redirecionar para a página
  const navigateLoginRegisterPage = () => {
    navigate('/LoginRegister')
  };
  const navigateExportacaoPage = () => {
    navigate('/ExportacaoPage')
  };
  const navigateMainPage = () => {
    navigate('/')
  };

  return (
    <>
      <header className="header">
        <div className="header-content">
          <img src={Logo} className="header-logo" alt="Logo"/>
          <div className="header-buttons">
            <button className="header-button" onClick={navigateMainPage}>HOME</button>
            <i className="fas fa-bars custom-icon" aria-hidden="true" onClick={toggleMenu}></i>
            <p>|</p>
            <button className="client-button" onClick={navigateLoginRegisterPage}>Área Cliente</button>
            <button className="cotacao-button" onClick={navigateExportacaoPage}>Cotação de Exportação</button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <div className="hamburger-menu">
          <button className="hamburger-item" onClick={navigateMainPage}>HOME</button>
          <button className="hamburger-item" onClick={navigateLoginRegisterPage}>Área Cliente</button>
          <button className="hamburger-item" onClick={navigateExportacaoPage}>Cotação de Exportação</button>
        </div>
      )}
    </>
  );
};

export default Headertwo;
