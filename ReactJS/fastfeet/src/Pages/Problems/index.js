import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';

import ButtonList from '../../components/buttonsOrder';

import api from '../../services/api';

import { Container, Manager, OrderTable } from './styles';

function Problems() {
  const [problems, setProblems] = useState([]);

  useEffect(() => {
    async function loadProblems() {
      const response = await api.get('orders');

      setProblems(response.data);
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
                <span>#{problem.delivery_id}</span>
              </td>
              <td>
                <span>{problem.description}</span>
              </td>
              <td>
                <ButtonList />
              </td>
            </tr>
          ))}
        </tbody>
      </OrderTable>
    </Container>
  );
}

export default Problems;
