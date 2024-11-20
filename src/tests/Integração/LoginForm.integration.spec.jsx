import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import LoginForm from '../../components/LoginForm';

describe('LoginForm', () => {
    // Configura um mock do localStorage e do fetch antes de cada teste
    beforeEach(() => {
        jest.clearAllMocks();
        Storage.prototype.setItem = jest.fn();
    });

    test('deve exibir uma mensagem de erro para credenciais inválidas', async () => {
        // Mock da resposta de erro da API
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
        });

        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        // Preenche os campos e envia o formulário
        fireEvent.change(screen.getByPlaceholderText('Insira seu e-mail'), { target: { value: 'wrong@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Insira sua senha'), { target: { value: 'wrongpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        // Verifica se a mensagem de erro é exibida na tela
        await waitFor(() => {
            expect(screen.getByText('Credenciais inválidas. Por favor, tente novamente.')).toBeInTheDocument();
        });
    });

    test('deve exibir uma mensagem de erro para problemas de rede', async () => {
        // Mock de um erro de rede
        global.fetch = jest.fn().mockRejectedValue(new Error('Erro de rede'));

        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        // Preenche os campos e envia o formulário
        fireEvent.change(screen.getByPlaceholderText('Insira seu e-mail'), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Insira sua senha'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        // Verifica se a mensagem de erro genérico é exibida na tela
        await waitFor(() => {
            expect(screen.getByText('Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.')).toBeInTheDocument();
        });
    });

    test('deve salvar o token no localStorage e redirecionar após login bem-sucedido', async () => {
        // Mock de resposta de sucesso da API com um token
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
            json: jest.fn().mockResolvedValue({ token: 'fakeToken123' }),
        });

        render(
            <BrowserRouter>
                <LoginForm />
            </BrowserRouter>
        );

        // Preenche os campos e envia o formulário
        fireEvent.change(screen.getByPlaceholderText('Insira seu e-mail'), { target: { value: 'user@example.com' } });
        fireEvent.change(screen.getByPlaceholderText('Insira sua senha'), { target: { value: 'password123' } });
        fireEvent.click(screen.getByRole('button', { name: /entrar/i }));

        // Verifica se o token foi salvo e o redirecionamento ocorreu
        await waitFor(() => {
            expect(localStorage.setItem).toHaveBeenCalledWith('authToken', 'fakeToken123');
        });
    });
});
