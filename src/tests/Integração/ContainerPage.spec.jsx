// src/tests/Integracao/ContainerPageIntegration.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContainerPage from '../../pages/ContainerPage';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import CardList from '../../components/cardList';

// Mock do CardList
jest.mock('../../components/cardList', () => () => <div>CardList Component</div>);

describe('ContainerPage - Teste de Integração', () => {
    beforeEach(() => {
        render(
            <MemoryRouter>
                <ContainerPage />
            </MemoryRouter>
        );
    });

    test('renderiza o componente CardList', () => {
        expect(screen.getByText('CardList Component')).toBeInTheDocument();
    });

    test('abre e fecha o pop-up', () => {
        const popupLink = screen.getByText('Confira aqui o perfil de carga que não exportamos');
        
        // Verifica que o popup inicialmente não está visível
        expect(screen.queryByText('Cargas que não exportamos')).not.toBeInTheDocument();
        
        // Abre o popup
        fireEvent.click(popupLink);
        expect(screen.getByText('Cargas que não exportamos')).toBeInTheDocument();
        
        // Fecha o popup
        fireEvent.click(screen.getByText('Fechar'));
        expect(screen.queryByText('Cargas que não exportamos')).not.toBeInTheDocument();
    });
});
