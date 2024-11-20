import React, { useState } from 'react';
import '../pages/css/LoginRegisterPage.css';
import { useNavigate } from 'react-router-dom';
import './css/LoginForm.css';
import { useAuth } from '../context/AuthContext'; // Importe o AuthContext

const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth(); // Acesse a função de login do AuthContext
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);
    const [emailInput, setEmailInput] = useState('');
    const [confirmationMessage, setConfirmationMessage] = useState('');

    const handlePopupOpen = () => {
        setShowPopup(true);
    };
    const handlePopupClose = () => {
        setShowPopup(false);
        setConfirmationMessage('');
    };

    const handleSendEmail = () => {
        setConfirmationMessage(`Uma nova senha foi enviada para o seu e-mail: ${emailInput}`);
    };

    const handleLoginSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch('https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/api/Auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            if (response.ok) {
                const data = await response.json();
                const { token, user } = data; // Supondo que a API retorne o token e os dados do usuário
                localStorage.setItem('authToken', token);

                // Agora salvamos o token e as informações do usuário no contexto
                login(user, token); // Salva no AuthContext

                // Navega para a próxima página
                navigate('/Container');
            } else {
                setError('Credenciais inválidas. Por favor, tente novamente.');
            }
        } catch (error) {
            setError('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.');
        }
    };

    const navigateCadastroPage = () => {
        navigate('/CadastroContaPage');
    };

    return (
        <div className="form-wrapper">
            <h3 className="h3-Login">LOGIN</h3>
            <form className="form-group" onSubmit={handleLoginSubmit}>
                <div className="input-group">
                    <label className="label-Register">E-mail</label>
                    <input
                        className="inputs-Register"
                        type="email"
                        placeholder="Insira seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label-Register">Senha</label>
                    <input
                        className="inputs-Register"
                        type="password"
                        placeholder="Insira sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p className="error-message">{error}</p>}
                <p className="forgot-password" onClick={handlePopupOpen}>Esqueceu a senha?</p>
                <button type="submit" className="btn-login">Entrar</button>
                <button type="button" className="btn-noAccount" onClick={navigateCadastroPage}>Cadastre-se</button>
            </form>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <h3 className='h3-popup'>Redefinir Senha</h3>
                        <input
                            type="email"
                            className="input-email-popup"
                            placeholder="Insira seu e-mail"
                            value={emailInput}
                            onChange={(e) => setEmailInput(e.target.value)}
                        />
                        <button className="btn-send-email" onClick={handleSendEmail}>Enviar</button>
                        {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
                        <button className="closes-button" onClick={handlePopupClose}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LoginForm;
