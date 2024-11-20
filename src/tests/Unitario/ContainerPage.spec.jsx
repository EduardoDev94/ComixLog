// src/tests/Unitario/ContainerPage.spec.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContainerPage from '../../pages/ContainerPage';
import { useNavigate } from 'react-router-dom';
import '@testing-library/jest-dom';

// Mock do useNavigate do react-router-dom
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(), // Mock explícito de useNavigate como uma função
}));

describe('ContainerPage - Teste Unitário', () => {
    let mockNavigate;

    beforeAll(() => {
        mockNavigate = jest.fn(); // Cria o mock para o navigate
        useNavigate.mockReturnValue(mockNavigate); // Define o retorno do useNavigate
    });

    beforeEach(() => {
        render(<ContainerPage />);
    });

    test('navega para a página de Contêiners Disponíveis ao clicar no link', () => {
        fireEvent.click(screen.getByText('Contêiners Disponíveis'));
        expect(mockNavigate).toHaveBeenCalledWith('/Container');
    });

    test('navega para a página de Pedidos em Andamento ao clicar no link', () => {
        fireEvent.click(screen.getByText('Pedidos em Andamento'));
        expect(mockNavigate).toHaveBeenCalledWith('/PedidosPage');
    });

    test('navega para a página de Cadastro Contêiner ao clicar no link', () => {
        fireEvent.click(screen.getByText('Cadastro Contêiner'));
        expect(mockNavigate).toHaveBeenCalledWith('/CadastroContainerPage');
    });
});
