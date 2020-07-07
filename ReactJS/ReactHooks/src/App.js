import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // Funciona com o state do componente. Muito bom para quando
  // temos poucas variaveis state
  const [tech, setTech] = useState([]);
  const [newTech, setnewTech] = useState('');

  // Só vai ser executada quando a variavel que esta sendo monitorada
  // mudar de valor
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setnewTech('');
  }, [newTech, tech]);

  // Funcionamento semelhante ao componentDidMount. Irá executar
  // apenas uma vez, pois não esta monitorando nenhum state
  useEffect(() => {
    const getTech = localStorage.getItem('tech');

    if (getTech) {
      setTech(JSON.parse(getTech));
    }
  }, []);

  // Funcionamento semelhante ao componentDidUpdate. Irá executar
  // toda vez que identificar uma mudança no estado que esta sendo monitorado
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  // Ira executar quando um valor alterar(especificar) em um estado
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input value={newTech} onChange={(e) => setnewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
