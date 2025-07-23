import { useState, useEffect } from "react";
import axios, { all } from 'axios'
import CurrencyInput from "./components/CurrencyInput";
import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

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
    <div className="bg-dark min-h-screen py-10 font-body">
      <div className="relative">
        <p className="text-light max-w-md leading-[80px] text-2xl absolute top-[200px] left-20 ">
          Visualizza l’andamento delle <br />valute negli ultimi 30 giorni<br />
          e ottieni conversioni aggiornate<br /> in tempo reale.
        </p>

      </div>


      <div
        className="absolute bottom-0 right-0 w-[100vw] h-[100vh] bg-primary z-10"
        style={{
          clipPath: 'polygon(100% 100%, 10% 100%, 100% 10%)'
        }}
      ></div>


      <DotLottieReact
        src="https://lottie.host/d96bf948-68e7-443b-b539-cd3a53c22de4/nHi5VL8qAQ.lottie"
        loop
        autoplay
        className="absolute z-20 w-[50%] right-[-200px] bottom-0"
      />



      <div
        className="absolute bottom-0 right-0 w-[100vw] h-[100vh] z-20 pointer-events-none"
        style={{
          clipPath: 'polygon(100% 10%, 10% 100%, 100% 0%)',
          background: 'linear-gradient(to top left, rgba(0,0,0,0.5), transparent)'
        }}
      ></div>

      <div className="relative z-20 p-10">
        <h1 className="text-3xl text-center font-pixel text-light mt-10 neon-title">Currency Converter</h1>
        <div className="bg-white shadow-xl rounded-2xl p-10 w-[90%] max-w-xl mx-auto mt-8">
          <CurrencyInput allCurrency={allCurrency} />
        </div>
      </div>
    </div>

  );
}

export default App;


