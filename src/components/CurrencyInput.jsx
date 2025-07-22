import React, { useState, useEffect } from 'react'
import axios from 'axios'

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

    if (isFromInputActive === true) {
      axios
        .get(`https://api.frankfurter.app/latest?amount=${fromAmount}&from=${firstValue}&to=${secondValue}`)
        .then((res) => {
          setToAmount(res.data.rates[secondValue])
        })
        .catch((err) => {
          console.error('Errore di chiamata del valore:', err)
        })
    } else {
      axios
        .get(`https://api.frankfurter.app/latest?amount=${toAmount}&from=${secondValue}&to=${firstValue}`)
        .then((res) => {
          setFromAmount(res.data.rates[firstValue])
        })
        .catch((err) => {
          console.error('Errore di chiamata del valore:', err)
        })
    }
  }, [fromAmount, toAmount, firstValue, secondValue])



  return (
    <div className='container mx-auto flex'>
      <div>
        <select
          name='from'
          value={firstValue}
          onChange={(e) => {
            setIsFromInputActive(true)
            setFirstValue(e.target.value)
          }}
        >
          {allCurrency.map((c) => (
            <option key={`from-${c}`} value={c} disabled={c === secondValue}>{c}</option>
          ))
          }
        </select>
        <input
          type="number"
          name='from'
          value={fromAmount}
          onChange={(e) => {
            setIsFromInputActive(true)
            setFromAmount(Number(e.target.value))
          }}
          className='border'
        />
      </div>

      <span className='mx-20'>→</span>

      <div>
        <select
          name='to'
          value={secondValue}
          onChange={(e) => {
            setIsFromInputActive(false)
            setSecondValue(e.target.value)
          }}>
          {allCurrency.map((c) => (
            <option key={`from-${c}`} value={c} disabled={c === firstValue}>{c}</option>
          ))
          }
        </select>
        <input
          type="number"
          name='to'
          value={toAmount}
          onChange={(e) => {
            setIsFromInputActive(false)
            setToAmount(Number(e.target.value))
          }}
          className='border'
        />
      </div>
    </div >
  )
}

export default CurrencyInput
