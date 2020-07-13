import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import ButtonProblem from '../../components/buttonsProblem';

import api from '../../services/api';

import { Container, Manager, OrderTable } from './styles';

function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('orders');

      setProblems(response.data);
      console.log('Problem: ', response.data);
    }

    loadProblems();
  }, []);

  return (
    <Container>
      <Manager>
        <strong>Problemas na entrega</strong>
      </Manager>
      <OrderTable>
        <thead>
          <tr>
            <th>Encomenda</th>
            <th>Problema</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {problems.map((problem) => (
            <tr key={problem.id}>
              <td>
                <span>#{problem.deliveryman_id}</span>
              </td>
              <td>
                <span>
                  {problem.description || 'Nenhum problema com esta encomenda'}
                </span>
              </td>
              <td>
                <ButtonProblem idProblem={problem.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </OrderTable>
    </Container>
  );
}

export default Problems;
