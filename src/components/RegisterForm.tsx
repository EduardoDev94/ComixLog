import React, { useState } from 'react';
import '../pages/LoginRegisterPage';
import './css/RegisterForm.css';
import { useNavigate } from 'react-router-dom';

const RegisterForm: React.FC = () => {
    const navigate = useNavigate();
    
    // Estados para os campos do formulário e para mensagens de erro
    const [name, setName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [error, setError] = useState<string | null>(null);
    
    // Função de submissão do formulário
    const handleRegisterSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        // Dados a serem enviados para a API
        const userData = {
            name,
            emailAddress,
            password,
            cnpj,
        };
        
        try {
            const response = await fetch('https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/api/Users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('Usuário cadastrado com sucesso!');
                // Limpar os campos após o cadastro
                setName('');
                setEmailAddress('');
                setPassword('');
                setCnpj('');
                setError(null); // Limpar a mensagem de erro, caso exista
            } else {
                const errorData = await response.json();
                setError(`Erro ao cadastrar usuário: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
            setError('Erro ao cadastrar usuário. Tente novamente mais tarde.');
        }
    };

    const navigateLoginRegister = () => {
        navigate('/LoginRegister');
    };
    
    return (
        <div className="form-wrapper cadastro">
            <h3 className="h3-Register">CADASTRE-SE</h3>
            <form className="form-group" onSubmit={handleRegisterSubmit}>
                <div className="input-group">
                    <label className="label-Register">Nome da Empresa</label>
                    <input
                        className="inputs-Register"
                        type="text"
                        placeholder="Nome da Empresa"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label-Register">CNPJ</label>
                    <input
                        className="inputs-Register"
                        type="text"
                        placeholder="CNPJ"
                        value={cnpj}
                        onChange={(e) => setCnpj(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label className="label-Register">E-mail</label>
                    <input
                        className="inputs-Register"
                        type="email"
                        placeholder="Insira seu e-mail"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
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
                <div className="input-group">
                    <label className="label-Register">Confirmar senha</label>
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
                <button type="submit" className="btn-register">Cadastrar</button>
                <button type="button" className="btn-noAccount" onClick={navigateLoginRegister}>Logar</button>
            </form>
        </div>
    );
};

export default RegisterForm;
