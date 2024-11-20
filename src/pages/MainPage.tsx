import 'react';
import Headertwo from '../components/Headertwo'
import Footer from '../components/Footer'
import './css/MainPage.css'

import '@fortawesome/fontawesome-free/css/all.css';

function MainPage() {
  return (
    <>
      <Headertwo />
        <div className='container-body'>
          <h1 className='h1-main'>Nossa média anual</h1>
          <div className="stats-wrapper">
            <div className="stats-container">
              <div className='group-icon'>
                <i className="fas fa-weight icon" aria-hidden="true"></i>
                <h2 className='h2-main'>330 mil</h2>
                <p className='p-main'>Toneladas transportadas</p>
              </div>
              <div className='group-icon'>
                <i className="fas fa-road icon" aria-hidden="true"></i>
                <h2 className='h2-main'>42 milhões</h2>
                <p className='p-main'>KM percorridos</p>
              </div>
              <div className='group-icon'>
                <i className="fas fa-file-invoice icon" aria-hidden="true"></i>
                <h2 className='h2-main'>12 milhões</h2>
                <p className='p-main'>Entregas realizadas</p>
              </div>
              <div className='group-icon'>
                <i className="fas fa-globe icon" aria-hidden="true"></i>
                <h2 className='h2-main'>39</h2>
                <p className='p-main'>Países já atendidos</p>
              </div>
            </div>
          </div>
        </div>
      <Footer />
    </>
  )
}

export default MainPage;
