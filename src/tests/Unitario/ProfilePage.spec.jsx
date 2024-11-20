import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProfilePage from '../../pages/ProfilePage'; // Ajuste o caminho conforme necessário
import { MemoryRouter } from 'react-router-dom';

describe('ProfilePage', () => {
    test('renders ProfilePage correctly', () => {
        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        // Verifica se o título está no documento
        expect(screen.getByText(/Perfil do usuário/i)).toBeInTheDocument();
        
        // Verifica se os campos do formulário estão presentes
        expect(screen.getByLabelText(/Nome \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/E-mail \*/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Senha \*/i)).toBeInTheDocument();
        
        // Verifica se o botão de atualizar perfil está presente
        expect(screen.getByRole('button', { name: /Atualizar Perfil/i })).toBeInTheDocument();
    });

    test('submits form with user input', () => {
        render(
            <MemoryRouter>
                <ProfilePage />
            </MemoryRouter>
        );

        // Preenche os campos do formulário
        fireEvent.change(screen.getByLabelText(/Nome \*/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText(/E-mail \*/i), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText(/Senha \*/i), { target: { value: 'password123' } });

        // Envia o formulário
        fireEvent.click(screen.getByRole('button', { name: /Atualizar Perfil/i }));

        // Aqui você pode adicionar lógica para verificar se os dados foram processados corretamente
        // (por exemplo, verificando se uma função de envio foi chamada, se o estado foi atualizado, etc.)
    });
});
