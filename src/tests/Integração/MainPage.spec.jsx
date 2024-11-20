import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MainPage from '../../pages/MainPage';
import '@testing-library/jest-dom';

describe('MainPage Component', () => {
  it('deve renderizar o cabeçalho, os ícones de estatísticas e o rodapé', () => {
    render(
      <MemoryRouter>
        <MainPage />
      </MemoryRouter>
    );

    // Verifica o título principal da página
    expect(screen.getByRole('heading', { name: /nossa média anual/i })).toBeInTheDocument();

    // Verifica as estatísticas específicas
    expect(screen.getByText(/330 mil/)).toBeInTheDocument();
    expect(screen.getByText(/toneladas transportadas/i)).toBeInTheDocument();

    expect(screen.getByText(/42 milhões/)).toBeInTheDocument();
    expect(screen.getByText(/km percorridos/i)).toBeInTheDocument();

    expect(screen.getByText(/12 milhões/)).toBeInTheDocument();
    expect(screen.getByText(/entregas realizadas/i)).toBeInTheDocument();

    expect(screen.getByText(/39/)).toBeInTheDocument();
    expect(screen.getByText(/países já atendidos/i)).toBeInTheDocument();

    // Verifica se o componente Footer foi renderizado usando o papel contentinfo
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });
});
