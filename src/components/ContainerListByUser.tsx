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
  const [selectedUserAllocation, setSelectedUserAllocation] = useState<AlocacaoUsuario | null>(null);
  const [selectedContainerId, setSelectedContainerId] = useState<string | null>(null);

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
        console.error("Erro ao buscar containers:", error);
      });
  }, [user?._id]);

  const handleShowUserAllocation = (usuario: AlocacaoUsuario, containerId: string) => {
    setSelectedUserAllocation(usuario);
    setSelectedContainerId(containerId);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

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

      setContainers((prevContainers) =>
        prevContainers
          .map((container) =>
            container.id === containerId
              ? {
                ...container,
                usuariosAlocados: container.usuariosAlocados.filter(
                  (alocacao) => alocacao.nomeProduto !== nomeDoProduto
                ),
              }
              : container
          )
          .filter((container) => container.usuariosAlocados.length > 0)
      );

      alert('Produto removido com sucesso');
      setShowModal(false); // Fecha o modal após o alert
    } catch (error) {
      console.error('Erro ao remover produto:', error);
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
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaClipboardCheck className="icon" style={{ marginRight: '10px' }} />
                    <strong>Status: </strong> {container.status === 0 ? 'Transporte' : container.status === 1 ? 'Lotado' : container.status === 2 ? 'Vazio' : 'Entregue'}
                  </ListGroup.Item>
                  <ListGroup.Item className="d-flex align-items-center">
                    <FaCalendarAlt className="icon" style={{ marginRight: '10px' }} />
                    <strong>Embarque: </strong> {container.dataDeEmbarque}
                  </ListGroup.Item>
                </ListGroup>
                {container.usuariosAlocados.length > 0 && (
                  <Button
                    variant="primary"
                    className="mt-3 Vmore"
                    onClick={() => handleShowUserAllocation(container.usuariosAlocados[0], container.id)}
                  >
                    Ver Detalhes
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalhes da Alocação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedUserAllocation && (
            <div>
              <h5>Nome do Produto: {selectedUserAllocation.nomeProduto}</h5>
              <p>Descrição do Produto: {selectedUserAllocation.descricaoDoProduto}</p>
              <p>Peso do Produto: {selectedUserAllocation.pesoDoProduto} kg</p>
              <p>Características da Embalagem: {selectedUserAllocation.caracteristicaDaEmbalagem}</p>
              <p>Quantidade Alocada: {selectedUserAllocation.quantidadeAlocada} m³</p>
              <p>Valor da Alocação: R$ {selectedUserAllocation.precoTotal}</p>
              <p>Valor de Exportação: R$ {selectedUserAllocation.valorDeExportacao}</p>
              <Button
                variant="danger"
                onClick={() => removerProduto(selectedContainerId!, selectedUserAllocation.nomeProduto)}
              >
                Remover Produto
              </Button>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ContainerListByUser;
