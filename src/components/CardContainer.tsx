import React from 'react';
import ImgContainer from '../assets/container.jpg';
import ImgContainerRef from '../assets/ContainerRef.jpeg';
import { Container } from '../services/ContainerServices';
import { useNavigate } from 'react-router-dom';
import { FaDollarSign, FaThermometerHalf, FaInfoCircle, FaBoxOpen, FaWarehouse, FaCalendarAlt } from 'react-icons/fa';
import '../components/css/CardContainer.css';

interface ContainerCardProps {
  container: Container;
}

const ContainerCard: React.FC<ContainerCardProps> = ({ container }) => {
  const { id, preco, resfriado, status, capacidadeTotal, capacidadeAtual, dataDeEmbarque } = container;
  const navigate = useNavigate();

  const navigatePedidoForm = () => {
    navigate('/PedidoForm', { state: id });
  };

  const navigateEditContainer = () => {
    localStorage.setItem('selectedContainer', JSON.stringify(container));
    navigate('/EditContainer');
  };

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return 'Transporte';
      case 1:
        return 'Lotado';
      case 2:
        return 'Vazio';
      case 3:
        return 'Entregue';
      default:
        return 'Status desconhecido';
    }
  };

  return (
    <div className="container-card">
      <div className="container-details">
        <img
          src={resfriado ? ImgContainerRef : ImgContainer}
          alt="Imagem do Container"
          className="container-image"
        />
        <div className="info-row">
          <FaDollarSign className="icon" />
          <p className="property-name">Preço/m³:</p>
          <span>R$ {preco}</span>
        </div>
        <div className="info-row">
          <FaThermometerHalf className="icon" />
          <p className="property-name">Resfriado:</p>
          <span>{resfriado ? 'Sim' : 'Não'}</span>
        </div>
        <div className="info-row">
          <FaInfoCircle className="icon" />
          <p className="property-name">Status:</p>
          <span>{getStatusText(status)}</span>
        </div>
        <div className="info-row">
          <FaWarehouse className="icon" />
          <p className="property-name">Capacidade Total:</p>
          <span>{capacidadeTotal} m³</span>
        </div>
        <div className="info-row">
          <FaBoxOpen className="icon" />
          <p className="property-name">Capacidade Disponível:</p>
          <span>{capacidadeAtual} m³</span>
        </div>
        <div className="info-row">
          <FaCalendarAlt className="icon" />
          <p className="property-name">Data de Embarque:</p>
          <span>{dataDeEmbarque}</span>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="action-button button-register"
            onClick={navigatePedidoForm}
          >
            Cadastrar Carga
          </button>
          <button
            className="action-button button-edit"
            onClick={navigateEditContainer}
          >
            Editar Contêiner
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContainerCard;
