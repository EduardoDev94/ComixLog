import './css/PedidosPage.css'; // CSS para estilo
import '@fortawesome/fontawesome-free/css/all.css';
import ContainerListByUser from '../components/ContainerListByUser';
import ContainerLayout from '../components/ContainerLayout';


function PedidosPage() {
  

    return (
        <ContainerLayout>
            <ContainerListByUser/>
        </ContainerLayout>
    );
}

// Função para obter o status textual com base no valor numérico


export default PedidosPage;
