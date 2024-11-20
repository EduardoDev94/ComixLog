import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';

describe('LoginForm', () => {
    beforeAll(() => {
        // Mock do localStorage
        Storage.prototype.setItem = jest.fn();
    });

    beforeEach(() => {
        // Mock do global.fetch para cada teste
        global.fetch = jest.fn();
        
        // Renderiza o LoginForm dentro de um MemoryRouter para simular a navegação
        render(
            <MemoryRouter>
                <LoginForm />
            </MemoryRouter>
        );
    });

    afterEach(() => {
        // Limpa os mocks após cada teste para evitar interferência
        jest.clearAllMocks();
    });

    test('deve renderizar o formulário de login corretamente', () => {
        expect(screen.getByText(/ENTRE/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Insira seu e-mail/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Insira sua senha/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    });

    test('deve atualizar os campos de entrada', () => {
        const emailInput = screen.getByPlaceholderText(/Insira seu e-mail/i);
        const passwordInput = screen.getByPlaceholderText(/Insira sua senha/i);

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });

        expect(emailInput.value).toBe('test@example.com');
        expect(passwordInput.value).toBe('password123');
    });
    
    test('deve chamar a função de login ao enviar o formulário', async () => {
        const emailInput = screen.getByPlaceholderText(/Insira seu e-mail/i);
        const passwordInput = screen.getByPlaceholderText(/Insira sua senha/i);
        const submitButton = screen.getByRole('button', { name: /Entrar/i });
    
        // Simula a mudança dos valores dos inputs
        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
        // Simula uma chamada de API bem-sucedida
        global.fetch.mockResolvedValueOnce({
            ok: true,
            json: jest.fn().mockResolvedValueOnce({ token: 'mock-token' }),
        });
    
        // Simula o clique no botão de envio
        fireEvent.click(submitButton);
    
        // Verifica se localStorage.setItem e fetch foram chamados corretamente
        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'mock-token');
            expect(global.fetch).toHaveBeenCalledWith(
                'https://webapicomixlog-adbrgqe8d4fyfkh8.brazilsouth-01.azurewebsites.net/api/Auth/login',
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: 'test@example.com', password: 'password123' }),
                })
            );
        });
    });
    
    test('deve mostrar uma mensagem de erro se as credenciais forem inválidas', async () => {
        const emailInput = screen.getByPlaceholderText(/Insira seu e-mail/i);
        const passwordInput = screen.getByPlaceholderText(/Insira sua senha/i);
        const submitButton = screen.getByRole('button', { name: /Entrar/i });

        fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
        fireEvent.change(passwordInput, { target: { value: 'wrong-password' } });

        // Simula uma chamada de API com erro
        global.fetch.mockResolvedValueOnce({
            ok: false,
            json: jest.fn().mockResolvedValueOnce({}),
        });

        fireEvent.click(submitButton);

        // Verifica se a mensagem de erro aparece
        await waitFor(() => {
            expect(screen.getByText(/Credenciais inválidas. Por favor, tente novamente./i)).toBeInTheDocument();
        });
    });
});
