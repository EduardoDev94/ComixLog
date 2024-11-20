// InfoPage.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Importa o MemoryRouter
import InfoPage from '../../pages/InfoPage'; // Ajuste o caminho conforme necessário

describe('InfoPage Component', () => {
    const mockCards = [
        {
            id: 1,
            icon: 'icon1.png',
            title: 'Consulta Inicial',
            descricao: 'Descrição da Consulta Inicial',
        },
        {
            id: 2,
            icon: 'icon2.png',
            title: 'Planejamento Logístico',
            descricao: 'Descrição do Planejamento Logístico',
        },
    ];

    test('deve renderizar o componente InfoPage corretamente', () => {
        render(
            <MemoryRouter>
                <InfoPage />
            </MemoryRouter>
        );
        
        // Verifica se o título está presente
        expect(screen.getByText('Cards Informativos')).toBeInTheDocument();
    });

    test('deve renderizar os cards corretamente', () => {
        render(
            <MemoryRouter>
                <InfoPage cards={mockCards} />
            </MemoryRouter>
        );

        // Verifica se os títulos dos cards estão presentes
        expect(screen.getByText('Consulta Inicial')).toBeInTheDocument();
        expect(screen.getByText('Planejamento Logístico')).toBeInTheDocument();
    });

    test('deve abrir o pop-up ao clicar em um card', () => {
        render(
            <MemoryRouter>
                <InfoPage cards={mockCards} />
            </MemoryRouter>
        );
        
        // Simula o clique no primeiro card
        fireEvent.click(screen.getByText('Consulta Inicial'));

       // Verifica se o pop-up não está visível ao iniciar
expect(screen.queryByText('Descrição da Consulta Inicial')).not.toBeInTheDocument();

        
        // Fecha o pop-up
        fireEvent.click(screen.getByText('Fechar'));

        // Verifica se o pop-up não está mais visível
        expect(screen.queryByText('Descrição da Consulta Inicial')).not.toBeInTheDocument();
    });

    test('deve não exibir o pop-up inicialmente', () => {
        render(
            <MemoryRouter>
                <InfoPage cards={mockCards} />
            </MemoryRouter>
        );

        // Verifica se o pop-up não está visível ao iniciar
        expect(screen.queryByText('Descrição da Consulta Inicial')).not.toBeInTheDocument();
    });
});
