// pages/ContainerList.tsx
import React, { useEffect, useState } from 'react';
import { fetchContainers, Container } from '../services/ContainerServices';
import ContainerCard from '../components/CardContainer';
import './css/CardList.css';

const ContainerList: React.FC = () => {
  const [containers, setContainers] = useState<Container[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadContainers = async () => {
      try {
        const data = await fetchContainers();
        setContainers(data);
      } catch (err) {
        setError("Erro ao carregar containers");
      }
    };

    loadContainers();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2 className='h2-title'>Contêiners Disponíveis</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around' }}>
        {containers.map(container => (
          <ContainerCard key={container.id} container={container} />
        ))}
      </div>
    </div>
  );
};

export default ContainerList;
