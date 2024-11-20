import React from 'react';
import Headertwo from '../components/Headertwo';
import Footer from '../components/Footer';
import RegisterForm from '../components/RegisterForm';
import '@fortawesome/fontawesome-free/css/all.css'; // Ícones do Font Awesome


const LoginRegisterPage: React.FC = () => {
    return (
        <>
            <Headertwo />
            <div className="register-container">
                <div className="menu-options"> </div>
                <div className="forms-container">
                    <RegisterForm />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default LoginRegisterPage;
