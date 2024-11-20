// src/pages/ContainerPage.js

import { useState } from 'react';
import './css/ContainerPage.css';
import CardList from '../components/cardList';
import ContainerLayout from '../components/ContainerLayout';


function ContainerPage() {
    const [showPopup, setShowPopup] = useState(false);

    const handlePopupOpen = () => {
        setShowPopup(true);
    };

    const handlePopupClose = () => {
        setShowPopup(false);
    };

    return (

        <>

            <ContainerLayout>

                <div className="page-container">
                    <main className="container-info">
    
                            <CardList />
                            <a href="#" className="profile-link" onClick={handlePopupOpen}>
                                Confira aqui o perfil de carga que não exportamos
                            </a>

                    </main>

                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup">
                                <h3>Cargas que não exportamos</h3>
                                <ul>
                                    <li>Explosivos</li>
                                    <li>Material radioativo</li>
                                    <li>Animais vivos</li>
                                </ul>
                                <button className="close-button" onClick={handlePopupClose}>Fechar</button>
                            </div>
                        </div>
                    )}
                </div>
            </ContainerLayout>
        </>
    );
}

export default ContainerPage;
