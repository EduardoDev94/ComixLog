import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ImgContainer from '../assets/container.jpg';
import ImgContainerRef from '../assets/ContainerRef.jpeg';
import { useAuth } from '../context/AuthContext';
import { Modal, Button, Card, ListGroup } from 'react-bootstrap';
import { FaDollarSign, FaCube, FaTemperatureLow, FaBox, FaCalendarAlt, FaClipboardCheck } from 'react-icons/fa';
import './css/ContainerListByUser.css';

interface Container {
  id: string;
  preco: number;
  capacidadeTotal: number;
  capacidadeAtual: number;
  resfriado: boolean;
  status: number;
  dataDeEmbarque: string;
  usuariosAlocados: AlocacaoUsuario[];
}

interface AlocacaoUsuario {
  usuarioId: string;
  quantidadeAlocada: number;
  precoTotal: number;
  nomeProduto: string;
  descricaoDoProduto: string;
  pesoDoProduto: number;
  caracteristicaDaEmbalagem: string;
  valorDeExportacao: number;
}

const ContainerListByUser: React.FC = () => {
  const { user } = useAuth();
  const [containers, setContainers] = useState<Container[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedContainer, setSelectedContainer] = useState<Container | null>(null);

  useEffect(() => {
    axios
      .get<Container[]>(`https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/api/Containers/user/${user?._id}`)
      .then((response) => {
        const userContainers = response.data.map((container) => ({
          ...container,
          usuariosAlocados: container.usuariosAlocados.filter(
            (alocacao) => alocacao.usuarioId === user?._id
          ),
        }));
        setContainers(userContainers);
      })
      .catch((error) => {
        console.error('Erro ao buscar containers:', error);
      });
  }, [user?._id]);

  const handleShowContainerDetails = (container: Container) => {
    setSelectedContainer(container);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedContainer(null);
  };

  const removerProduto = async (containerId: string, nomeDoProduto: string) => {
    try {
      await axios.post(
        `https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/api/Allocation/${containerId}/remover/${user?._id}`,
        nomeDoProduto,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Atualizar o estado local dos containers
      setContainers((prevContainers) =>
        prevContainers.map((container) =>
          container.id === containerId
            ? {
                ...container,
                usuariosAlocados: container.usuariosAlocados.filter(
                  (alocacao) => alocacao.nomeProduto !== nomeDoProduto
                ),
              }
            : container
        )
      );
  
      // Verificar se o produto removido estava no container selecionado e se sim, removê-lo do modal
      if (selectedContainer) {
        setSelectedContainer((prevSelectedContainer) => {
          if (prevSelectedContainer?.id === containerId) {
            return {
              ...prevSelectedContainer,
              usuariosAlocados: prevSelectedContainer.usuariosAlocados.filter(
                (alocacao) => alocacao.nomeProduto !== nomeDoProduto
              ),
            };
          }
          return prevSelectedContainer;
        });
      }
      
      await atualizarContainers()
      handleCloseModal()
      alert('Produto removido com sucesso');
    } catch (error) {
      console.error('Erro ao remover produto:', error);
    }
  };
  

    // Função para atualizar os containers
    const atualizarContainers = async () => {
      try {
        const response = await axios.get<Container[]>(
          `https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/api/Containers/user/${user?._id}`
        );
        const userContainers = response.data.map((container) => ({
          ...container,
          usuariosAlocados: container.usuariosAlocados.filter(
            (alocacao) => alocacao.usuarioId === user?._id
          ),
        }));
        setContainers(userContainers);
      } catch (error) {
        console.error('Erro ao atualizar containers:', error);
      }
    };
  

  return (
    <div>
      <h2 style={{ marginTop: '20px', color: 'rgb(255, 165, 0)', fontWeight: 'bold' }}>Contêiners Alocados</h2>
      <div className="row">
        {containers.map((container) => (
          <div className="col-12 col-md-6 col-lg-4 mb-4" key={container.id}>
            <Card className="h-100">
              <Card.Body>
                <img
                  src={container.resfriado ? ImgContainerRef : ImgContainer}
                  alt="Imagem do Container"
                  className="container-image"
                  style={{ width: '235px', height: 'auto', marginBottom: '10px' }}
                />
                <ListGroup variant="flush">
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaDollarSign className="icon" style={{ marginRight: '10px' }} />
                    <strong>Preço: </strong>R$ {container.preco}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaCube className="icon" style={{ marginRight: '10px' }} />
                    <strong>Capacidade Total: </strong> {container.capacidadeTotal} m³
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaBox className="icon" style={{ marginRight: '10px' }} />
                    <strong>Capacidade Atual: </strong> {container.capacidadeAtual} m³
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaTemperatureLow className="icon" style={{ marginRight: '10px' }} />
                    <strong>Resfriado: </strong> {container.resfriado ? 'Sim' : 'Não'}
                  </ListGroup.Item>
                </ListGroup>
                {container.usuariosAlocados.length > 0 && (
                  <Button
                    variant="primary"
                    className="mt-3 Vmore"
                    onClick={() => handleShowContainerDetails(container)}
                  >
                    Ver Produtos
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {selectedContainer && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Detalhes dos Produtos</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '600px', overflowY: 'auto' }}>
            <ListGroup>
              {selectedContainer.usuariosAlocados.map((produto) => (
                <ListGroup.Item key={produto.nomeProduto}
                style={{ marginBottom: '15px' }}>
                  <div>
                    <h5>Nome do Produto: {produto.nomeProduto}</h5>
                    <p>Peso do Produto: <strong>  {produto.pesoDoProduto}  kg</strong></p>
                    <p>Descrição do Produto:<strong> {produto.descricaoDoProduto} </strong> </p> 
                    <p>Quantidade Alocada: <strong>  {produto.quantidadeAlocada} m³</strong> </p>
                    <p>Valor da Alocação: <strong> R$  {produto.precoTotal}</strong></p>
                    <p>Valor de Exportação:  <strong> R$ {produto.valorDeExportacao}</strong></p>
                    <p>Características da Embalagem: <strong> {produto.caracteristicaDaEmbalagem} </strong> </p>

                    <Button
                      variant="danger"
                      onClick={() => removerProduto(selectedContainer.id, produto.nomeProduto)}
                    >
                      Remover
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ContainerListByUser;
