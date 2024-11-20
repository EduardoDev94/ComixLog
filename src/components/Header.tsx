import { useState } from 'react'; // Importando o useState para gerenciar o estado
import { useNavigate } from 'react-router-dom'; // Importando useNavigate do react-router-dom
import outIcon from '../assets/out.png'
import Logo from '../assets/logocomix2.png'
import './css/Header.css' // Importando o CSS
 
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu
  const navigate = useNavigate(); // Usando o hook useNavigate para redirecionamento
 
  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
 
  // Função para redirecionar para a página
  const navigateMainPage = () => {
    navigate('/')
  };
  const navigateLoginRegisterPage = () => {
    navigate('/LoginRegister')
  };

  const navigateProfilePage = () => {
    navigate('/ProfilePage')
  };
 
  return (
    <header className="header">
      <div className="header-content">
        <img src={Logo} className="header-logo" alt="Logo" />
        <div className="header-buttons">
          {/*
            <button className="header-button" onClick={navigateInfoPage}>Exportação</button>
            <button className="header-button" onClick={navigateContainerPage}>Rateio Container</button>
            <p className='header-p'>|</p>
          */}
          <button className='header-button' onClick={navigateProfilePage}>Conta</button>
          <button className='header-button' onClick={navigateMainPage}>Home</button>
          <i className="fas fa-bars custom-icon" aria-hidden="true" onClick={toggleMenu}></i>
          <img src={outIcon} className="logout-Img" onClick={navigateLoginRegisterPage}/>
        </div>
      </div>
      {/* Menu hambúrguer - aparece apenas quando o estado menuOpen for true */}
      {menuOpen && (
        <div className="hamburger-menu">
          <button className="hamburger-item" onClick={navigateProfilePage}>Conta</button>
          <button className="hamburger-item" onClick={navigateMainPage}>Home</button>
          <button className="hamburger-item" onClick={navigateLoginRegisterPage}>Sair</button>
        </div>
      )}
    </header>
   
  );
};
 
export default Header;
