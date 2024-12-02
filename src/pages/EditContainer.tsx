import React, { useState, useEffect } from 'react';
import ContainerLayout from '../components/ContainerLayout';
import './css/CadastroContainerPage.css';
import '@fortawesome/fontawesome-free/css/all.css';
import { useNavigate } from 'react-router-dom';

const EditContainer: React.FC = () => {
    const [precoContainer, setPrecoContainer] = useState('');
    const [capacidadeTotal, setCapacidadeTotal] = useState('');
    const [capacidadeAtual, setCapacidadeAtual] = useState('');
    const [resfriado, setResfriado] = useState(false);
    const [statusContainer, setStatusContainer] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [containerId, setContainerId] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        const selectedContainer = localStorage.getItem('selectedContainer');
        if (selectedContainer) {
            const containerData = JSON.parse(selectedContainer);
            setContainerId(containerData.id);  // Set container ID for deletion
            setPrecoContainer(containerData.preco.toString());
            setCapacidadeTotal(containerData.capacidadeTotal.toString());
            setResfriado(containerData.resfriado);
            setStatusContainer(containerData.status.toString());
            setCapacidadeAtual(containerData.capacidadeAtual?.toString() || '');
        }
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const containerData = {
            preco: parseFloat(precoContainer),
            capacidadeTotal: parseFloat(capacidadeTotal),
            capacidadeAtual: parseFloat(capacidadeAtual),
            resfriado,
            status: statusContainer === 'transporte' ? 0 :
                statusContainer === 'lotado' ? 1 :
                    statusContainer === 'vazio' ? 2 :
                        statusContainer === 'entregue' ? 3 : 0, // Exemplo de conversão
        };

        try {
            const token = localStorage.getItem('authToken') || '';

            // Use PUT instead of POST and include the containerId in the URL
            const response = await fetch(`https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/api/containers/${containerId}`, {
                method: 'PUT', // Change from POST to PUT
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(containerData),
            });

            if (response.ok) {
                alert('Contêiner editado com sucesso!');
                navigate('/Container');
                setSuccessMessage('Contêiner editado com sucesso!');
                setPrecoContainer('');
                setCapacidadeTotal('');
                setCapacidadeAtual('');
                setResfriado(false);
                setStatusContainer('');
                setErrorMessage(null);
            } else {
                const errorData = await response.json().catch(() => null);
                setErrorMessage(errorData?.message ? `Erro ao editar contêiner, verifique se os dados foram preenchidos corretamente: ${errorData.message}` :
                    'Erro ao editar contêiner, verifique se os dados foram preenchidos corretamente.');
            }
        } catch (error) {
            console.error('Erro ao editar contêiner, verifique se os dados foram preenchidos corretamente:', error);
            setErrorMessage('Erro ao editar contêiner, verifique se os dados foram preenchidos corretamente. Tente novamente mais tarde.');
        }
    };

    // Delete container function
    const handleDeleteContainer = async () => {
        if (!containerId) {
            setErrorMessage("ID do contêiner não encontrado.");
            return;
        }

        if (window.confirm("Tem certeza que deseja excluir este contêiner?")) {
            try {
                const token = localStorage.getItem('authToken') || '';
                const response = await fetch(`https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/api/containers/${containerId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    alert("Contêiner excluído com sucesso!");
                    navigate('/Container'); // Navigate back to the container list page
                } else {
                    const errorData = await response.json().catch(() => null);
                    setErrorMessage(errorData?.message ? `Erro ao excluir contêiner: ${errorData.message}` : 'Erro ao excluir contêiner.');
                }
            } catch (error) {
                console.error("Erro ao excluir contêiner:", error);
                setErrorMessage("Erro ao excluir o contêiner. Tente novamente mais tarde.");
            }
        }
    };



    return (
        <ContainerLayout>
                <div>
                    <div>
                        <h2 className='h1-t' style={{ color: '#FFA500', fontWeight: 'bold' }}>
                            Editar Contêiner
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="row g-3 mt-3 ms-10">
                        <div className="col-md-6">
                            <label className="form-label label-gray">Preço *</label>
                            <input
                                type="text"
                                value={precoContainer}
                                onChange={(e) => setPrecoContainer(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label label-gray">Capacidade Total *</label>
                            <input
                                type="text"
                                value={capacidadeTotal}
                                onChange={(e) => setCapacidadeTotal(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label label-gray">Capacidade Disponível*</label>
                            <input
                                type="text"
                                value={capacidadeAtual}
                                onChange={(e) => setCapacidadeAtual(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="col-md-6">
                            <label className="form-label label-gray">Resfriado *</label>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="resfriadoCheck"
                                    checked={resfriado}
                                    onChange={(e) => setResfriado(e.target.checked)}
                                />
                                <label className="form-check-label" htmlFor="resfriadoCheck">
                                    Este contêiner é resfriado
                                </label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <label className="form-label label-gray">Status do Contêiner *</label>
                            <select
                                value={statusContainer}
                                onChange={(e) => setStatusContainer(e.target.value)}
                                className="form-control"
                                required
                            >
                                <option value="">Selecione o status</option>
                                <option value="transporte">Transporte</option>
                                <option value="lotado">Lotado</option>
                                <option value="vazio">Vazio</option>
                                <option value="entregue">Entregue</option>
                            </select>
                        </div>

                        <div>
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'green', marginRight: 10 }}>
                                Editar
                            </button>
                            <button type="button" className="btn btn-primary btnPop"
                            style={{ backgroundColor: 'red' }}
                            onClick={handleDeleteContainer}>
                                Excluir
                            </button>
                        </div>

                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
        </ContainerLayout>
    );
};

export default EditContainer;
