import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Graphic from './Graphic'

const CurrencyInput = ({ allCurrency }) => {
  const [firstValue, setFirstValue] = useState('EUR')
  const [secondValue, setSecondValue] = useState('USD')

  const [fromAmount, setFromAmount] = useState(0)
  const [toAmount, setToAmount] = useState(0)

  const [isFromInputActive, setIsFromInputActive] = useState(false)

  useEffect(() => {
    if ((isFromInputActive && fromAmount === 0) || (!isFromInputActive && toAmount === 0)) {
      return;
    }

    const fetchCurrency = async () => {
      try {
        if (isFromInputActive === true) {
          const res = await axios.get(`https://api.frankfurter.app/latest?amount=${fromAmount}&from=${firstValue}&to=${secondValue}`)
          setToAmount(res.data.rates[secondValue])
        } else {
          const res = await axios.get(`https://api.frankfurter.app/latest?amount=${toAmount}&from=${secondValue}&to=${firstValue}`)
          setFromAmount(res.data.rates[firstValue])
        }
      } catch (err) {
        console.error('Errore di chiamata del valore:', err)
      }
    };


    fetchCurrency()
  }, [fromAmount, toAmount, firstValue, secondValue]);


  return (
    <div className="flex flex-col gap-10">

      <div className="flex flex-wrap items-end justify-between gap-6">
        {/* FROM */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-highlight mb-2">From</label>
          <select
            name="from"
            value={firstValue}
            onChange={(e) => {
              setIsFromInputActive(true)
              setFirstValue(e.target.value)
            }}
            className="bg-soft text-dark p-2 rounded w-full"
          >
            {allCurrency.map((c) => (
              <option key={`from-${c}`} value={c} disabled={c === secondValue}>{c}</option>
            ))}
          </select>
          <input
            type="number"
            name="from"
            value={fromAmount}
            onChange={(e) => {
              setIsFromInputActive(true)
              setFromAmount(Number(e.target.value))
            }}
            className="text-3xl text-right bg-transparent border-b-2 border-highlight focus:outline-none focus:ring-0 w-full mt-2 placeholder:text-light"
          />
        </div>

        {/* Freccia */}
        <div className="text-4xl text-highlight self-center">→</div>

        {/* TO */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-highlight mb-2">To</label>
          <select
            name="to"
            value={secondValue}
            onChange={(e) => {
              setIsFromInputActive(false)
              setSecondValue(e.target.value)
            }}
            className="bg-soft text-dark p-2 rounded w-full"
          >
            {allCurrency.map((c) => (
              <option key={`to-${c}`} value={c} disabled={c === firstValue}>{c}</option>
            ))}
          </select>
          <input
            type="number"
            name="to"
            value={toAmount}
            onChange={(e) => {
              setIsFromInputActive(false)
              setToAmount(Number(e.target.value))
            }}
            className="text-3xl text-right bg-transparent border-b-2 border-highlight focus:outline-none focus:ring-0  w-full mt-2 placeholder:text-light"
          />
        </div>
      </div>

      {/* Grafico */}
      <div className="w-full">
        <Graphic
          fromAmount={fromAmount}
          toAmount={toAmount}
          firstValue={firstValue}
          secondValue={secondValue}
        />
      </div>

    </div>
  )

}

export default CurrencyInput
