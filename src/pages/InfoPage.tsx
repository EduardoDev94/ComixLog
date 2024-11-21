import { useState } from 'react';
import './css/InfoPage.css';

import ContainerLayout from '../components/ContainerLayout';

// IMPORTANDO OS ICONES DOS CARDS
import Ci from '../assets/contrato.png';
import Pl from '../assets/cargueiro.png';
import Dc from '../assets/documentos.png';
import Al from '../assets/verifica.png';
import Rs from '../assets/observacao.png';
import Dt from '../assets/moeda.png';
import Mc from '../assets/recipiente.png';
import Tp from '../assets/guindaste-portuario.png';
import Se from '../assets/suporte-ao-cliente.png';

import '@fortawesome/fontawesome-free/css/all.css';
console.log('oi')

interface Card {
    id: number;
    icon: string;
    title: string;
    descricao: string;
}

function InfoPage() {
    const [popUpAberto, setPopUpAberto] = useState(false); // Estado para controlar se o pop-up está aberto
    const [cardAtivo, setCardAtivo] = useState<Card | null>(null); // Estado para guardar o card clicado, garantindo que seja Card ou null

    // Função para abrir o pop-up com a informação do card clicado
    const abrirPopUp = (card: Card) => { // Tipando o parâmetro 'card'
        setCardAtivo(card);
        setPopUpAberto(true);
    };

    // Função para fechar o pop-up
    const fecharPopUp = () => {
        setPopUpAberto(false);
        setCardAtivo(null); // Limpa o card ativo
    };

    // Dados dos cards com descrição
    const cards: Card[] = [
        { id: 1, icon: Ci, title: 'Consulta Inicial', descricao: 'Uma consulta inicial para a exportação de um container envolve a verificação dos documentos necessários, como a fatura comercial e o conhecimento de embarque, além da definição da rota e do modal de transporte a ser utilizado.' },
        { id: 2, icon: Pl, title: 'Planejamento Logístico', descricao: 'O planejamento logístico para a exportação de um container envolve a coordenação eficiente de todas as etapas do processo, desde a coleta da carga até a entrega no destino final, garantindo a otimização dos recursos, cumprimento de prazos e conformidade com as regulamentações aduaneiras.' },
        { id: 3, icon: Dc, title: 'Documentação', descricao: 'A documentação necessária para a exportação de um container inclui a fatura comercial, o conhecimento de embarque, o certificado de origem, a declaração de exportação e, em alguns casos, licenças específicas, que garantem a conformidade legal e a facilitação do processo aduaneiro.' },
        { id: 4, icon: Al, title: 'Aprovações Legais', descricao: 'As aprovações legais necessárias para a exportação de um container incluem a obtenção de licenças e autorizações específicas de órgãos governamentais, como a Receita Federal e o Ministério da Agricultura, que asseguram que a carga está em conformidade com as regulamentações nacionais e internacionais.' },
        { id: 5, icon: Rs, title: 'Registro no Radar/Siscomex', descricao: 'O registro no Radar/Siscomex é um procedimento obrigatório para a exportação de um container, que permite a habilitação do exportador no sistema da Receita Federal, garantindo que as operações de comércio exterior sejam devidamente registradas e acompanhadas de acordo com a legislação vigente.' },
        { id: 6, icon: Dt, title: 'Definições de Tarifas e Impostos', descricao: 'As definições de tarifas e impostos necessários para a exportação de um container são realizadas por meio da análise da Nomenclatura Comum do Mercosul (NCM) do produto, que determina as alíquotas aplicáveis de impostos como o Imposto de Exportação (IE) e a Taxa de Utilização do Sistema Integrado de Comércio Exterior (SISCOMEX), assegurando o cumprimento das obrigações fiscais.' },
        { id: 7, icon: Mc, title: 'Monitoramento de Carga', descricao: 'O monitoramento da carga de um container é feito através de sistemas de rastreamento em tempo real, que utilizam tecnologias como GPS e sensores de temperatura e umidade, permitindo que os exportadores e importadores acompanhem a localização e as condições da carga durante todo o transporte até o destino final.' },
        { id: 8, icon: Tp, title: 'Trâmites Portuários em Portugal', descricao: 'Os trâmites portuários em Portugal para a exportação de um container envolvem a apresentação da documentação necessária às autoridades portuárias, o cumprimento das normas de segurança e saúde, a realização de inspeções aduaneiras, e a coordenação com operadores logísticos para garantir a carga adequada e o embarque eficiente da mercadoria.' },
        { id: 9, icon: Se, title: 'Suporte Pós-Entrega', descricao: 'O suporte pós-entrega na exportação de um container envolve a assistência ao cliente na resolução de quaisquer questões relacionadas à entrega, como reclamações sobre danos ou discrepâncias na carga, além do acompanhamento de processos de devolução e gerenciamento de documentação para garantir a satisfação e a conformidade com as condições de venda.' },
    ];

    return (
        <ContainerLayout>
            <div className="page-container">
                <div className={`main-container `}>
                    <h2 className='h2-titles'>Cards Informativos</h2>
                    <div className="cards-container">
                        {cards.map((card) => (
                            <div key={card.id} className="card" onClick={() => abrirPopUp(card)}>
                                <span className="card-number">{card.id + 'º'}</span> {/* Número do card */}
                                <div className="content">
                                    <img src={card.icon} className="ImgIcon" alt={card.title} />
                                    <p className="para">{card.title}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pop-up de informação do card */}
                {popUpAberto && cardAtivo && ( // Verifica se cardAtivo não é nulo
                    <div className="popup-overlay">
                        <div className="popup-content">
                            <h2 className='h2-popup'>{cardAtivo.title}</h2>
                            <p className='p-popup'>{cardAtivo.descricao}</p>
                            <button className="close-button" onClick={fecharPopUp}>Fechar</button>
                        </div>
                    </div>
                )}

            </div>
        </ContainerLayout>
    );
}

export default InfoPage;
