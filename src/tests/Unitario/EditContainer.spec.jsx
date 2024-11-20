import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import EditContainer from '../../pages/EditContainer';



describe('EditContainer - Testes Unitários', () => {
   
    test('Exibe corretamente os campos e seus valores iniciais', () => {
        render(
            <MemoryRouter> {/* Envolva o componente em um Router */}
                <EditContainer />
            </MemoryRouter>
        );
    
        expect(screen.getByLabelText('Preço *')).toBeInTheDocument();
        expect(screen.getByLabelText('Capacidade Total *')).toBeInTheDocument();
        expect(screen.getByLabelText('Capacidade Atual *')).toBeInTheDocument();
        expect(screen.getByLabelText('Resfriado *')).toBeInTheDocument();
        expect(screen.getByLabelText('Status do Contêiner *')).toBeInTheDocument();
    });
    
    test('Atualiza o esta   do ao preencher os campos', () => {
        render(
            <MemoryRouter>
                <EditContainer />
            </MemoryRouter>
        );

        fireEvent.change(screen.getByLabelText('Preço *'), { target: { value: '100' } });
        fireEvent.change(screen.getByLabelText('Capacidade Total *'), { target: { value: '500' } });
        fireEvent.change(screen.getByLabelText('Capacidade Atual *'), { target: { value: '200' } });

        fireEvent.click(screen.getByLabelText('Este contêiner é resfriado'));
        fireEvent.change(screen.getByLabelText('Status do Contêiner *'), { target: { value: 'transporte' } });

        expect(screen.getByLabelText('Preço *').value).toBe('100');
        expect(screen.getByLabelText('Capacidade Total *').value).toBe('500');
        expect(screen.getByLabelText('Capacidade Atual *').value).toBe('200');
        expect(screen.getByLabelText('Este contêiner é resfriado').checked).toBe(true);
        expect(screen.getByLabelText('Status do Contêiner *').value).toBe('transporte');
    });
});
