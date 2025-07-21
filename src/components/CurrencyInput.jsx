import React, { useState } from 'react'

const CurrencyInput = ({ allCurrency }) => {
  const [firstValue, setFirstValue] = useState('EUR')
  const [secondValue, setSecondValue] = useState('USD')

  return (
    <div className='container mx-auto'>
      <select
        value={firstValue}
        onChange={(e) => setFirstValue(e.target.value)}
      >
        {allCurrency.map((c) => (
          <option key={`from-${c}`} value={c}>{c}</option>
        ))
        }
      </select>

      <span className='mx-20'>→</span>

      <select
        value={secondValue}
        onChange={(e) => setSecondValue(e.target.value)}
      >
        {allCurrency.map((c) => (
          <option key={`from-${c}`} value={c}>{c}</option>
        ))
        }
      </select>

    </div >
  )
}

export default CurrencyInput
