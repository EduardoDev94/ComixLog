import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EditContainer from '../../pages/EditContainer'; // Ajuste o caminho conforme necessário
import { useNavigate } from 'react-router-dom';


// Mock para useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('EditContainer - Testes de Integração', () => {
    beforeEach(() => {
        mockNavigate.mockReset();
        localStorage.setItem('selectedContainer', JSON.stringify({
            id: '123',
            preco: '1500.00',
            capacidadeTotal: '1000',
            capacidadeAtual: '500',
            resfriado: true,
            status: 'transporte'
        }));
        localStorage.setItem('authToken', 'testToken');
    });

    afterEach(() => {
        localStorage.clear();
    });

   

    test('Envia dados ao editar contêiner e exibe mensagem de sucesso', async () => {
        render(
            <MemoryRouter>
                <EditContainer />
            </MemoryRouter>
        );
    
        // Simulando a resposta da API
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({}),
            })
        );
    
        // Clique no botão de editar
        fireEvent.click(screen.getByRole('button', { name: /Editar/i }));
    
        // Aguarde pela mensagem de sucesso
        await waitFor(() => {
            expect(screen.getByText(/Contêiner editado com sucesso!/i)).toBeInTheDocument();
        });
        
    }); test('Exclui contêiner com sucesso e navega para a página de Contêiners Disponíveis', async () => {
        const navigate = useNavigate();
        
        // Mock do window.confirm
        window.confirm = jest.fn(() => true); // Simula que o usuário confirma a exclusão

        // Mock do fetch para simular uma resposta de sucesso
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true, // Simula que a exclusão foi bem-sucedida
            })
        );

        render(
            <MemoryRouter>
                <EditContainer />
            </MemoryRouter>
        );

        // Clique no botão de excluir
        fireEvent.click(screen.getByRole('button', { name: /Excluir/i }));

        // Aguarde a chamada de navigate
        await waitFor(() => {
            expect(navigate).toHaveBeenCalledWith('/Container'); // Verifica se a navegação foi feita corretamente
        });
    });
});