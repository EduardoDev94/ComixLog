// components/ContainerCard.tsx
import React from 'react';
import { Container } from '../services/ContainerServices';

interface ContainerCardProps {
  container: Container;
}

const ContainerCard: React.FC<ContainerCardProps> = ({ container }) => {
  const { preco, capacidadeTotal, capacidadeAtual } = container;

  return (
    <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', borderRadius: '5px' }}>
      <h3>Preço: {preco}</h3>
      <p>Capacidade Total: {capacidadeTotal} m³</p>
      <p>Capacidade Disponível: {capacidadeAtual} m³</p>
    </div>
  );
};

export default ContainerCard;
