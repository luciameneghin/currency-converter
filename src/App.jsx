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
    <div className="bg-pink-100 min-h-screen py-10 font-body">
      <h1 className="text-3xl text-center font-pixel text-purple-600 mt-10">Currency Cutie</h1>
      <div className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-xl mx-auto mt-8">
        <CurrencyInput allCurrency={allCurrency} />
      </div>
    </div>

  );
}

export default App;


