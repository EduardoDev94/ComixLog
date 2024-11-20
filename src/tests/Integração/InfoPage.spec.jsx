import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InfoPage from '../../pages/InfoPage';
import { BrowserRouter as Router } from 'react-router-dom';

describe('InfoPage Integration Test', () => {
    beforeEach(() => {
        render(
            <Router>
                <InfoPage />
            </Router>
        );
    });

    test('renders all cards with correct titles', () => {
        const cardTitles = [
            'Consulta Inicial',
            'Planejamento Logístico',
            'Documentação',
            'Aprovações Legais',
            'Registro no Radar/Siscomex',
            'Definições de Tarifas e Impostos',
            'Monitoramento de Carga',
            'Trâmites Portuários em Portugal',
            'Suporte Pós-Entrega'
        ];

        cardTitles.forEach(title => {
            expect(screen.getByText(title)).toBeInTheDocument();
        });
    });

    test('opens pop-up with card details when a card is clicked', () => {
        const cardTitle = 'Consulta Inicial';
        fireEvent.click(screen.getByText(cardTitle));

        expect(screen.getByRole('heading', { name: cardTitle })).toBeInTheDocument();
        expect(screen.getByText(/Uma consulta inicial para a exportação/)).toBeInTheDocument();
    });

    test('closes pop-up when the close button is clicked', () => {
        const cardTitle = 'Consulta Inicial';
        fireEvent.click(screen.getByText(cardTitle));

        const closeButton = screen.getByRole('button', { name: /Fechar/i });
        fireEvent.click(closeButton);

        expect(screen.queryByRole('heading', { name: cardTitle })).not.toBeInTheDocument();
    });

    test('navigates to pages when menu links are clicked', () => {
        const menuLinks = [
            { text: 'Etapas de exportação', path: '/Info' },
            { text: 'Contêiners Disponíveis', path: '/Container' },
            { text: 'Pedidos em Andamento', path: '/PedidosPage' },
            { text: 'Cadastro Contêiners', path: '/CadastroContainerPage' }
        ];

        menuLinks.forEach(link => {
            const navLink = screen.getByText(link.text);
            expect(navLink).toBeInTheDocument();
            fireEvent.click(navLink);
            // Navegação pode ser simulada e assertivas adicionais podem ser necessárias dependendo do roteamento configurado
        });
    });
});
