import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import imagen from './criptomonedas.png';
import Formulario from './componentes/Formulario';
import Cotizacion from './componentes/Cotizacion';
import Spinner from './componentes/Spinner';

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  @media (min-width:992px) {
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem
  }
`;

const Imagen = styled.img`
  max-width: 100%;
  margin-top: 5rem;
`
const Heading = styled.h1`
  font-family: 'Bebas Neue', cursive;
  color: #FFF;
  text-align: left;
  font-weight: 700;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 80px;

  &::after {
    content: '';
    width: 100px;
    height: 6px;
    background-color: #66A2FE;
    display: block;

  }

`

function App() {

  const [moneda, guardarMoneda] = useState('');
  const [criptomoneda, guardarCriptomoneda] = useState('');
  const [resultado, guardarResultado] = useState({});
  const [cargando, guardarCargando] = useState(false);

  useEffect (() => {

    const cotizarCriptomoneda = async () => {
      // Evitamos la ejecución la primera vez
      if (moneda === '') return;

      console.log('Cotizando...');

      // Consultar la api para obtener cotización

      const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;

      const resultado = await axios.get(url);

      // mostrar el spinner

      guardarCargando(true);

      // ocultar el spinner y mostrar el resultado

      setTimeout(() => {
        guardarCargando(false);


        // guardar cotizacion

        guardarResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
      }, 3000);
    }

    cotizarCriptomoneda();
    

  }, [moneda, criptomoneda])


  // Mostrar Spinner o Resultado

  const componente = (cargando) ? <Spinner/> : <Cotizacion resultado={resultado}/>  

  return (
    <Contenedor>
      <div>
        <Imagen 
        src={imagen}
        alt="Imagen Criptomonedas"
        />
      </div>
      <div>
        <Heading>Cotizador de Criptomonedas</Heading>
        <Formulario
          guardarMoneda={guardarMoneda}
          guardarCriptomoneda={guardarCriptomoneda}
        />

        {componente}

      </div>
      
    </Contenedor>
    
  );
}

export default App;
