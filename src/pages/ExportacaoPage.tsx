import { useEffect, useState } from 'react';
import Headertwo from '../components/Headertwo';
import Footer from '../components/Footer';
import './css/MainPage.css';
import '@fortawesome/fontawesome-free/css/all.css';
 
function ExportacaoPage() {
  const [rates, setRates] = useState({ USD: null, EUR: null, GBP: null });
  const [error, setError] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,GBP-BRL');
        const data = await response.json();
 
        const rates = {
          USD: data.USDBRL ? data.USDBRL.bid : null,
          EUR: data.EURBRL ? data.EURBRL.bid : null,
          GBP: data.GBPBRL ? data.GBPBRL.bid : null,
        };
 
        setRates(rates);
      } catch (error) {
        setError('Erro ao obter as cotações');
      }
    };
 
    fetchRates();
  }, []);
 
  return (
    <>
      <Headertwo />
      <div className="currency-board">
        <h1>Cotações Diárias</h1>
        {error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="currency-cards">
            <div className="currency-card">
              <h2>Dólar <br></br>(USD)</h2>
              <p>R$ {rates.USD}</p>
            </div>
            <div className="currency-card">
              <h2>Euro <br></br>(EUR)</h2>
              <p>R$ {rates.EUR}</p>
            </div>
            <div className="currency-card">
              <h2>Libra Esterlina (GBP)</h2>
              <p>R$ {rates.GBP}</p>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
 
export default ExportacaoPage;
 
