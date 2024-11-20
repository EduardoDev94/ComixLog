import React from 'react';
import Headertwo from '../components/Headertwo';
import Footer from '../components/Footer';
import LoginForm from '../components/LoginForm';
import '@fortawesome/fontawesome-free/css/all.css'; // Ícones do Font Awesome

const LoginRegisterPage: React.FC = () => {
  return (
    <>
      <Headertwo />
      <div className="login-container">
        <div className="forms-container">
          <LoginForm />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginRegisterPage;
