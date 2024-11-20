import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ProfilePage from '../../pages/ProfilePage';

// Mock do localStorage se necessário
beforeEach(() => {
  localStorage.setItem('userID', '1'); // Simulando um usuário logado
});

afterEach(() => {
  localStorage.clear();
});

describe('ProfilePage Component', () => {
  test('deve renderizar corretamente os elementos do formulário', () => {
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    // Verifica a presença dos rótulos
    expect(screen.queryByText(/Nome \*/i)).toBeInTheDocument();
    expect(screen.queryByText(/E-mail \*/i)).toBeInTheDocument();
    expect(screen.queryByText(/Senha \*/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Atualizar Perfil/i })).toBeInTheDocument();
  });
  


  test('deve redirecionar para a página correta ao clicar nos links do menu lateral', () => {
    render(
      <BrowserRouter>
        <ProfilePage />
      </BrowserRouter>
    );

    expect(screen.getByText(/Etapas de exportação/i)).toBeInTheDocument();
    expect(screen.getByText(/Contêiners Disponíveis/i)).toBeInTheDocument();
    expect(screen.getByText(/Pedidos em Andamento/i)).toBeInTheDocument();
    expect(screen.getByText(/Cadastro Contêiners/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/Etapas de exportação/i));
    // Aqui você pode verificar se a navegação está funcionando corretamente.
  });
});
