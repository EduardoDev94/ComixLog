import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginRegisterPage from './pages/LoginRegisterPage'; // A página em que você está trabalhando
import InfoPage from './pages/InfoPage.tsx'
import ContainerPage from './pages/ContainerPage.tsx'
import MainPage from './pages/MainPage.tsx'
import PedidoForm from './pages/PedidoForm';
import CadastroContainerPage from './pages/CadastroContainerPage.tsx';
import EditContainer from './pages/EditContainer.tsx';
import PedidosPage from './pages/PedidosPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import ExportacaoPage from './pages/ExportacaoPage.tsx';
import { AuthProvider } from './context/AuthContext.tsx';

import CadastroContaPage from './pages/CadastroContaPage.tsx'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* <Route path="/" element={<Home />} />  Defina a rota Home */}
          <Route path="/" element={<MainPage />} />
          <Route path="/Info" element={<InfoPage />} />
          <Route path="/Container" element={<ContainerPage />} />
          <Route path="/PedidoForm" element={<PedidoForm />} />
          <Route path="/CadastroContainerPage" element={<CadastroContainerPage />} />
          <Route path="/EditContainer" element={<EditContainer />} />
          <Route path="/PedidosPage" element={<PedidosPage />} />
          <Route path="/ProfilePage" element={<ProfilePage />} />
          <Route path="/ExportacaoPage" element={<ExportacaoPage />} />
          <Route path="/CadastroContaPage" element={<CadastroContaPage />} />
          <Route path="/LoginRegister" element={<LoginRegisterPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
