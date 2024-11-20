import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Para simular o roteamento
import CadastroContainerPage from '../../pages/CadastroContainerPage'; // Altere o caminho conforme necessário

describe('CadastroContainerPage', () => {
    test('renders CadastroContainerPage component', () => {
        render(
            <MemoryRouter>
                <CadastroContainerPage />
            </MemoryRouter>
        );

        // Verifica se o título é exibido
        const titleElement = screen.getByText(/Cadastre um contêiner/i);
        expect(titleElement).toBeInTheDocument();

        // Verifica se o botão "Avançar" está no documento
        const submitButton = screen.getByRole('button', { name: /Avançar/i });
        expect(submitButton).toBeInTheDocument();

        // Verifica se o botão para abrir o popup está no documento
        const popupButton = screen.getByRole('button', { name: /Confira aqui o perfil de carga que não exportamos/i });
        expect(popupButton).toBeInTheDocument();
    });

    test('opens and closes the popup', () => {
        render(
            <MemoryRouter>
                <CadastroContainerPage />
            </MemoryRouter>
        );

        // Verifica se o popup não está no documento inicialmente
        expect(screen.queryByText(/Cargas que exportamos/i)).not.toBeInTheDocument();

        // Clica no botão para abrir o popup
        const popupButton = screen.getByRole('button', { name: /Confira aqui o perfil de carga que não exportamos/i });
        fireEvent.click(popupButton);

        // Verifica se o popup é exibido
        const popupTitle = screen.getByText(/Cargas que exportamos/i);
        expect(popupTitle).toBeInTheDocument();

        // Clica no botão para fechar o popup
        const closeButton = screen.getByRole('button', { name: /Fechar/i });
        fireEvent.click(closeButton);

        // Verifica se o popup foi fechado
        expect(screen.queryByText(/Cargas que exportamos/i)).not.toBeInTheDocument();
    });

    test('submits the form', () => {
        render(
            <MemoryRouter>
                <CadastroContainerPage />
            </MemoryRouter>
        );

        // Preenche os campos do formulário
        fireEvent.change(screen.getByLabelText(/Preço \*/i), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText(/Capacidade Total \*/i), { target: { value: '20' } });
        fireEvent.change(screen.getByLabelText(/Peso do Produto \*/i), { target: { value: '5' } });
        fireEvent.change(screen.getByLabelText(/Status do Contêiner \*/i), { target: { value: 'transporte' } });
        fireEvent.change(screen.getByLabelText(/Data de Embarque \*/i), { target: { value: '2024-10-27' } });
        fireEvent.click(screen.getByLabelText(/Este contêiner é resfriado/i));

        // Envia o formulário
        fireEvent.click(screen.getByRole('button', { name: /Avançar/i }));

        // Adicione aqui expectativas sobre o que acontece após o envio, por exemplo, verificar se a função de envio foi chamada (você precisaria mockar a função de envio).
    });
});
