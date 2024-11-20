// src/tests/CadastroContainerPage.test.tsx

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CadastroContainerPage from '../../pages/CadastroContainerPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('CadastroContainerPage - Integração', () => {
    beforeEach(() => {
        render(
            <Router>
                <CadastroContainerPage />
            </Router>
        );
    });

    test('permite que o usuário preencha o formulário e submeta', async () => {
        fireEvent.change(screen.getByLabelText(/preço/i), { target: { value: 'R$ 100,00' } });
        fireEvent.change(screen.getByLabelText(/capacidade total/i), { target: { value: '20' } });
        fireEvent.change(screen.getByLabelText(/peso do produto/i), { target: { value: '5' } });
        fireEvent.click(screen.getByLabelText(/resfriado/i));
        fireEvent.change(screen.getByLabelText(/status do contêiner/i), { target: { value: 'transporte' } });
        fireEvent.change(screen.getByLabelText(/data de embarque/i), { target: { value: '2024-12-01' } });

        fireEvent.click(screen.getByText(/avançar/i));

        // Verifique a lógica de submissão e o estado dos campos após o envio
        await waitFor(() => {
            expect(screen.getByLabelText(/preço/i)).toHaveValue('R$ 100,00');
        });
    });

    test('exibe o popup ao clicar no botão e fecha corretamente', () => {
        fireEvent.click(screen.getByText(/confira aqui o perfil de carga que não exportamos/i));
        expect(screen.getByText(/cargas que exportamos/i)).toBeInTheDocument();

        fireEvent.click(screen.getByText(/fechar/i));
        expect(screen.queryByText(/cargas que exportamos/i)).not.toBeInTheDocument();
    });
});
