import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import PedidosPage from '../../pages/PedidosPage';

// Mock do localStorage para simular o userID
beforeEach(() => {
  localStorage.setItem('userID', '1');
});

afterEach(() => {
  localStorage.clear();
  jest.restoreAllMocks();
});

describe('PedidosPage Component', () => {
  test('deve exibir a mensagem quando não há contêineres alocados', async () => {
    // Mock da resposta de fetch para contêineres vazios
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]),
      })
    );

    render(
      <BrowserRouter>
        <PedidosPage />
      </BrowserRouter>
    );

    // Verifica se a mensagem "Nenhum contêiner alocado para o usuário." está presente
    const messageElement = await screen.findByText(/Nenhum contêiner alocado para o usuário/i);
    expect(messageElement).toBeInTheDocument();
  });

  test('deve exibir a lista de contêineres quando há contêineres alocados', async () => {
    // Mock da resposta de fetch para contêineres alocados
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () =>
          Promise.resolve([
            {
              id: 1,
              preco: 100,
              resfriado: true,
              status: 0,
              capacidadeTotal: 50,
              capacidadeAtual: 20,
              usuariosAlocados: [1],
            },
          ]),
      })
    );

    render(
      <BrowserRouter>
        <PedidosPage />
      </BrowserRouter>
    );

    // Verifica se os detalhes do contêiner são exibidos corretamente
    expect(await screen.findByText(/Contêiner #1/i)).toBeInTheDocument();
    expect(screen.getByText(/Preço: 100/i)).toBeInTheDocument();
    expect(screen.getByText(/Resfriado: Sim/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacidade Total: 50 m³/i)).toBeInTheDocument();
    expect(screen.getByText(/Capacidade Atual: 20 m³/i)).toBeInTheDocument();
  });

  test('deve navegar para as páginas corretas ao clicar nos links do menu lateral', async () => {
    render(
      <BrowserRouter>
        <PedidosPage />
      </BrowserRouter>
    );

    // Mock do método `navigate` usando fireEvent
    const navigateLinks = [
      { linkText: /Etapas de exportação/i, expectedPath: '/Info' },
      { linkText: /Contêiners Disponíveis/i, expectedPath: '/Container' },
      { linkText: /Pedidos em Andamento/i, expectedPath: '/PedidosPage' },
      { linkText: /Cadastro Contêiners/i, expectedPath: '/CadastroContainerPage' },
    ];

    navigateLinks.forEach(({ linkText }) => {
      const linkElement = screen.getByText(linkText);
      expect(linkElement).toBeInTheDocument();
      fireEvent.click(linkElement);
      // Simulamos uma navegação bem-sucedida
      waitFor(() => expect(window.location.pathname).toBe(linkElement.getAttribute('href')));
    });
  });
});
