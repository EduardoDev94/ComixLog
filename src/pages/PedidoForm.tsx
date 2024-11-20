import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate
import ContainerLayout from '../components/ContainerLayout';
import { useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PedidoForm = () => {
    const { user, token } = useAuth(); // Obtém o usuário e o token do contexto de autenticação
    const location = useLocation();
    const { state: id } = location;
    const navigate = useNavigate(); // Adicione o useNavigate aqui


    const [nomeProduto, setnomeProduto] = useState('');
    const [descricaoProduto, setDescricaoProduto] = useState('');
    const [tamanhoProduto, setTamanhoProduto] = useState('');
    const [caracteristicaEmbalagem, setCaracteristicaEmbalagem] = useState('');
    const [pesoProduto, setPesoProduto] = useState('');
    const [valorExportacao, setValorExportacao] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const handlePopupOpen = () => setShowPopup(true);
    const handlePopupClose = () => setShowPopup(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Prepara os dados conforme esperado pelo DTO
        const requestData = {
            UsuarioId: user?._id,
            QuantidadeAlocada: Number(tamanhoProduto),
            NomeProduto: nomeProduto,
            DescricaoDoProduto: descricaoProduto,
            PesoDoProduto: Number(pesoProduto),
            CaracteristicaDaEmbalagem: caracteristicaEmbalagem,
            ValorDeExportacao: Number(valorExportacao)
        };

        try {
            // Realiza a requisição para a API usando o método POST
            const response = await fetch(`https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/api/Allocation/${id}/alocar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Inclui o token para autorização
                },
                body: JSON.stringify(requestData)
            });

            if (response.ok) {
                alert('Usuário alocado com sucesso!');
                // Redireciona para a página /pedidosPage após o sucesso
                navigate('/pedidosPage');
            } else {
                const errorData = await response.json();
                alert(`Erro: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Erro ao alocar usuário:', error);
            alert('Erro ao tentar alocar usuário.');
        }
    };

    return (
        <ContainerLayout>
            <div className="page-container">
                <div className="container mt-3 p-0">
                    <div>
                        <h2 style={{ color: '#FFA500', fontWeight: 'bold' }}>
                            Crie um pedido para o Contêiner
                        </h2>
                    </div>

                    <form onSubmit={handleSubmit} className="row g-3 ms-10">
                        <div className="col-md-6">
                            <label className="form-label label-gray">Nome do produto *</label>
                            <input
                                type="text"
                                value={nomeProduto}
                                onChange={(e) => setnomeProduto(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label label-gray">Descrição do produto *</label>
                            <input
                                type="text"
                                value={descricaoProduto}
                                onChange={(e) => setDescricaoProduto(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label label-gray">Tamanho do produto [m³] *</label>
                            <input
                                type="text"
                                value={tamanhoProduto}
                                onChange={(e) => setTamanhoProduto(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label label-gray">Característica da embalagem *</label>
                            <input
                                type="text"
                                value={caracteristicaEmbalagem}
                                onChange={(e) => setCaracteristicaEmbalagem(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label label-gray">Peso do produto [Kg] *</label>
                            <input
                                type="text"
                                value={pesoProduto}
                                onChange={(e) => setPesoProduto(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label label-gray">Valor de exportação *</label>
                            <input
                                type="text"
                                value={valorExportacao}
                                onChange={(e) => setValorExportacao(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-12">
                            <button type="submit" className="btn btn-success">
                                Confirmar
                            </button>
                        </div>
                        <div className="col-12 mt-3">
                            <button
                                type="button"
                                className="btn btn-outline-warning"
                                style={{ fontWeight: 600 }}
                                onClick={handlePopupOpen}
                            >
                                Confira aqui o perfil de carga que exportamos
                            </button>
                        </div>
                    </form>
                </div>
                {showPopup && (
                    <div className="popup-overlay">
                        <div className="popup">
                            <h3>Cargas que exportamos</h3>
                            <ul>
                                <li>Alimentos</li>
                                <li>Roupas</li>
                                <li>Móveis</li>
                                <li>Computadores</li>
                                <li>Eletrônicos</li>
                                <li>Material de construção</li>
                            </ul>
                            <button className="close-button" onClick={handlePopupClose}>Fechar</button>
                        </div>
                    </div>
                )}
            </div>
        </ContainerLayout>
    );
};

export default PedidoForm;
