import { useState, FormEvent } from 'react';
import './App.css';

import logoImg from './assets/logo.png';

interface InfoProps {
  title: string;
  gasolina: string | number;
  alcool: string | number;
}

export default function App() {

  const [gasolinaInput, setGasolinaInput] = useState(0)
  const [alcoolInput, setAlcoolInput] = useState(0)
  const [info, setInfo] = useState<InfoProps>()

  function calcular(event: FormEvent) {
    event.preventDefault()

    let calculo = (alcoolInput / gasolinaInput)

    if (calculo <= 0.7) {
      setInfo({
        title: "Compensa usar Álcool",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
    } else {
      setInfo({
        title: "Compensa usar Gasolina",
        gasolina: formatarMoeda(gasolinaInput),
        alcool: formatarMoeda(alcoolInput),
      })
    }
  }

  function formatarMoeda(valor: number){
    let valorFormatado = valor.toLocaleString('pt-br', 
      {
        style: "currency",
        currency: "BRL"
      })
      return valorFormatado;
  }

  return (
    <div>
      <main className='container'>
        <img
          className='logo'
          src={logoImg}
          alt='Logo da Calculadora: Gasolina X Álcool'
        />
        <h1 className='title'>Qual melhor opção?</h1>

        <form className='form' onSubmit={calcular}>
          <label>Álcool (Preço por Litro)</label>
          <input
            className='input'
            type='number'
            placeholder='4,50'
            min='1'
            step='0.01'
            required
            value={alcoolInput}
            onChange={(event) => setAlcoolInput(Number(event.target.value))}
          />

          <label>Gasolina (Preço por Litro)</label>
          <input
            className='input'
            type='number'
            placeholder='4,99'
            min='1'
            step='0.01'
            required
            value={gasolinaInput}
            onChange={(event) => setGasolinaInput(Number(event.target.value))}
          />

          <input
            className='button'
            type='submit'
            value='Calcular'
          />
        </form>

        {info && Object.keys(info).length > 0 && (
          <section className='result'>
            <h2 className='result-title'>{info.title}</h2>

            <span>Álcool: {info.alcool}</span>
            <span>Gasolina: {info.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  );
}