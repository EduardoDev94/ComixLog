import React, { useState } from 'react';
import './css/CadastroContainerPage.css';
import '@fortawesome/fontawesome-free/css/all.css'; // Ícones do Font Awesome
import { useNavigate } from 'react-router-dom';
import ContainerLayout from '../components/ContainerLayout';
import { DatePicker, ConfigProvider } from 'antd';
import 'dayjs/locale/pt-br';
import dayjs from 'dayjs';
import locale from 'antd/es/locale/pt_BR';


dayjs.locale('pt-br');

const CadastroContainerPage: React.FC = () => {
    const [dataDeEmbarque, setDataDeEmbarque] = useState<string | null>(null);
    const [precoContainer, setPrecoContainer] = useState('');
    const [capacidadeTotal, setCapacidadeTotal] = useState('');
    const [capacidadeAtual, setCapacidadeAtual] = useState('');
    const [resfriado, setResfriado] = useState(false);
    const [statusContainer, setStatusContainer] = useState('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const disabledDate = (current: dayjs.Dayjs) => {
        return current && current.isBefore(dayjs().startOf('day'));
    }



    const navigate = useNavigate();

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
                        statusContainer === 'entregue' ? 3 : 0,
            dataDeEmbarque, // Adicionado aqui
        }

        try {
            const token = localStorage.getItem('authToken') || '';
            const response = await fetch('https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/api/containers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(containerData),
            });

            if (response.ok) {
                alert('Cadastro do Contêiner feito com sucesso!');
                navigate('/Container');
                setSuccessMessage('Contêiner cadastrado com sucesso!');
                setPrecoContainer('');
                setCapacidadeTotal('');
                setCapacidadeAtual('');
                setResfriado(false);
                setStatusContainer('');
                setErrorMessage(null);
            } else {
                const errorData = await response.json().catch(() => null);
                setErrorMessage(errorData?.message ? `Erro ao cadastrar contêiner, verifique se os dados foram preenchidos corretamente: ${errorData.message}` :
                    'Erro ao cadastrar contêiner, verifique se os dados foram preenchidos corretamente.');
            }
        } catch (error) {
            console.error('Erro ao cadastrar contêiner, verifique se os dados foram preenchidos corretamente:', error);
            setErrorMessage('Erro ao cadastrar contêiner, verifique se os dados foram preenchidos corretamente. Tente novamente mais tarde.');
        }

    };



    return (

        <ContainerLayout>
            <div className="page-container">
                <div>
                    <div>
                        <h2 className='h1-t' style={{ marginTop: '20px', color: '#FFA500', fontWeight: 'bold' }}>
                            Cadastre um Contêiner
                        </h2>
                    </div>
                    <form onSubmit={handleSubmit} className="row g-3 mt-3 ms-10">
                        <div className="col-md-6">
                            <label className="form-label label-gray">Preço[ m³ ] *</label>
                            <input
                                type="text"
                                value={precoContainer}
                                onChange={(e) => setPrecoContainer(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label label-gray">Capacidade Total [ m³ ] *</label>
                            <input
                                type="text"
                                value={capacidadeTotal}
                                onChange={(e) => setCapacidadeTotal(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label label-gray">Capacidade Atual [ m³ ]*</label>
                            <input
                                type="text"
                                value={capacidadeAtual}
                                onChange={(e) => setCapacidadeAtual(e.target.value)}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label className="form-label label-gray">Data de Embarque *</label>
                            <ConfigProvider locale={locale}>
                                <DatePicker
                                    format="DD/MM/YYYY"
                                    className="form-control"
                                    disabledDate={disabledDate} 
                                    onChange={(date, dateString) => {
                                        console.log(date)
                                        if (typeof dateString === 'string') {
                                            setDataDeEmbarque(dateString);
                                        }
                                    }}
                                    style={{ width: '100%' }}
                                    required
                                />
                            </ConfigProvider>

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
                        <div className="col-12">
                            <button type="submit" className="btn btn-primary" style={{ backgroundColor: 'green' }}>
                                Avançar
                            </button>
                        </div>
                        {successMessage && <p className="success-message">{successMessage}</p>}
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </ContainerLayout>

    );
};

export default CadastroContainerPage;
