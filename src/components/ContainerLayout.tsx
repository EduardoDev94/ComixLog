import React, { useState } from 'react';
import FooterContent from './Footer'
import { useNavigate, useLocation } from 'react-router-dom'; // Importa useLocation
import { Layout, Menu, Button } from 'antd';
import {
    InfoCircleOutlined,
    ContainerOutlined,
    ShoppingCartOutlined,
    PlusCircleOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
} from '@ant-design/icons';
import './css/Layout.css';
import logoImage from '../assets/logocomix2.png';
import globoImage from '../assets/globologo.png';

const { Sider, Content, Footer } = Layout;

const ContainerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation(); // Hook para obter a URL atual
    const [collapsed, setCollapsed] = useState(() => {
        const savedState = localStorage.getItem('sidebarCollapsed');
        return savedState === 'true'; // Recupera o estado salvo ou usa 'false' como padrão
    });

    const toggleSidebar = () => {
        const newState = !collapsed;
        setCollapsed(newState);
        localStorage.setItem('sidebarCollapsed', String(newState)); // Salva o estado
    };

    // Mapear rotas para as chaves do menu
    const getSelectedKey = () => {
        if (location.pathname === '/PedidoForm') return '1'; // Define "Contêiners" como selecionado
        if (location.pathname === '/Info') return '4';
        if (location.pathname === '/Container') return '1';
        if (location.pathname === '/PedidosPage') return '2';
        if (location.pathname === '/CadastroContainerPage') return '3';
        return '2'; // Default selecionado
    };

    const items = [

        {
            key: '1',
            icon: <ContainerOutlined />,
            label: 'Contêiners',
            onClick: () => navigate('/Container'),
        },
        {
            key: '2',
            icon: <ShoppingCartOutlined />,
            label: 'Alocados',
            onClick: () => navigate('/PedidosPage'),
        },
        {
            key: '3',
            icon: <PlusCircleOutlined />,
            label: 'Novo Contêiner',
            onClick: () => navigate('/CadastroContainerPage'),
        },
        {
            key: '4',
            icon: <InfoCircleOutlined />,
            label: 'Informativos',
            onClick: () => navigate('/Info'),
        },
        {
            key: '5',
            icon: <LogoutOutlined />,
            label: 'Logout',
            onClick: () => {
                localStorage.removeItem('token');
                navigate('/');
            },
        },
    ];

    return (
        <Layout hasSider>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{ background: '#4C428C', height: '100vh', position: 'fixed' }}
            >
                <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
                    <img
                        src={collapsed ? globoImage : logoImage}
                        alt="Logo"
                        style={{ width: '80%', height: 'auto' }}
                    />
                </div>
                <Menu
                    style={{ background: '#4C428C'}}
                    theme="dark"
                    mode="inline"
                    selectedKeys={[getSelectedKey()]} // Define o item selecionado dinamicamente
                    items={items}
                />
            </Sider>

            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div style={{ padding: 24, background: '#fff', borderRadius: 8 }}>
                        <Button
                            type="text"
                            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                            onClick={toggleSidebar}
                            style={{
                                fontSize: '16px',
                                width: 64,
                                height: 64,
                                color: '#6F2DA8'
                            }}
                        />
                        {children}
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    <FooterContent/>
                </Footer>
            </Layout>
        </Layout>
    );
};

export default ContainerLayout;
