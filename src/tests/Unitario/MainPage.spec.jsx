import { render, screen } from '@testing-library/react';
import MainPage from '../../pages/MainPage';
import '@testing-library/jest-dom';

jest.mock('../../components/Headertwo', () => () => <header>Mocked Header</header>);
jest.mock('../../components/Footer', () => () => <footer>Mocked Footer</footer>);

describe('MainPage Component', () => {
  it('deve renderizar o cabeçalho, as estatísticas e o rodapé', () => {
    render(<MainPage />);

    // Verifica se o cabeçalho foi renderizado
    expect(screen.getByText('Mocked Header')).toBeInTheDocument();

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

    // Verifica se o rodapé foi renderizado
    expect(screen.getByText('Mocked Footer')).toBeInTheDocument();
  });
});
