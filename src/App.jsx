import { useState, useEffect } from "react";
import axios, { all } from 'axios'
import CurrencyInput from "./components/CurrencyInput";

function App() {
  const [currencyComplete, setCurrencyComplete] = useState([])
  const [currencyRates, setCurrencyRates] = useState([])

  useEffect(() => {
    const fetchAllCurrencies = async () => {
      try {
        const res = await axios.get('https://api.frankfurter.app/latest');
        setCurrencyComplete(res.data.base);
        setCurrencyRates(res.data.rates);
        console.log(res.data.base);
        console.log(res.data.rates);
      } catch (err) {
        console.error('Errore nel recupero dei dati:', err);
      }
    };

    fetchAllCurrencies();
  }, []);

  const allCurrency = [currencyComplete, ...Object.keys(currencyRates)]

  return (
    <div className='container mx-auto'>
      <h1>Cambio Valuta</h1>
      <CurrencyInput allCurrency={allCurrency} />
    </div>

  );
}

export default App;


