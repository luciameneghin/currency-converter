import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);


const Graphic = ({ fromAmount, toAmount, firstValue, secondValue }) => {
  const [x, setX] = useState([])
  const [y, setY] = useState([])

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 30);
  const start = startDate.toISOString().split('T')[0];
  const endDate = new Date().toISOString().split('T')[0];


  useEffect(() => {
    const fetchGraphic = async () => {
      try {
        const res = await axios.get(`https://api.frankfurter.app/${start}..${endDate}?from=${firstValue}&to=${secondValue}`)
        const labels = Object.keys(res.data.rates); // date
        const data = labels.map(date => res.data.rates[date][secondValue]); // valori
        setX(labels);
        setY(data);
      }
      catch (err) {
        console.error('Errore nel recupero dei dati del grafico:', err)
      }
    };
    fetchGraphic()
  }, [fromAmount, toAmount, firstValue, secondValue])

  const data = {
    labels: x,
    datasets: [
      {
        label: `${firstValue} → ${secondValue}`,
        data: y,
        borderColor: '#E3B505',
        tension: 0.2,
        fill: false,
      }
    ]
  };


  return (
    <div className="w-full max-w-3xl mx-auto mt-10">
      <Line data={data} />
    </div>

  )
}

export default Graphic
