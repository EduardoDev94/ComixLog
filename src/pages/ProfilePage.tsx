import React, { useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css'; // Importe o Bootstrap
import Header from '../components/Header';
import Footer from '../components/Footer';
import './css/Profile.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Ícones do Font Awesome
import IcnPerfil from '../assets/imagem-perfil.png';
import { useNavigate } from 'react-router-dom'; // Importando useNavigate do react-router-dom

const ProfilePage: React.FC = () => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate(); // Usando o hook useNavigate para redirecionamento

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar os dados do formulário
    };

    const navigateInfoPage = () => {
        navigate('/Info');
    };
    const navigateContainerPage = () => {
        navigate('/Container');
    };
    const navigatePedidosPage = () => {
        navigate('/PedidosPage');
    };
    const navigateCadastroContainerPage = () => {
        navigate('/CadastroContainerPage');
    };

    return (
        <div className="page-container">
            <Header />

            {/* Menu lateral */}
            <nav className={`menu-lateral`}>
                <ul>
                    <li><a onClick={navigateInfoPage}>Etapas de exportação</a></li>
                    <li><a onClick={navigateContainerPage}>Contêiners Disponíveis</a></li>
                    <li><a onClick={navigatePedidosPage}>Pedidos em Andamento</a></li>
                    <li><a onClick={navigateCadastroContainerPage}>Cadastro Contêiners</a></li>
                </ul>
            </nav>

            {/* Conteúdo principal */}
            <div className="container mt-5 p-0"> {/* Adicionando padding horizontal */}
                <div className="text-start mb-4 textoTitulo">
                    <h2 style={{ marginTop: '95px', color: '#FFA500', fontWeight: 'bold' }}>
                        Perfil do usuário
                    </h2>
                    <img src={IcnPerfil} className="ImgIconP" />
                </div>
                <form onSubmit={handleSubmit} className="row g-3 mt-3 ms-10 inputs">
                    <div className="col-md-6">
                        <label className="form-label label-gray" htmlFor="nome">Nome *</label>
                        <input
                            id="nome"
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label label-gray" htmlFor="email">E-mail *</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label label-gray" htmlFor="senha">Senha *</label>
                        <input
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            className="form-control"
                            required
                        />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'orange' }}>
                            Atualizar Perfil
                        </button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
};
export default ProfilePage
