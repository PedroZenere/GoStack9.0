import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { FiPlus } from 'react-icons/fi';
import { Input } from '@rocketseat/unform';

import ButtonList from '../../components/buttonsOrder';

import api from '../../services/api';

import { Container, Manager, Teste, Button, OrderTable } from './styles';

function Deliverymans() {
  const [deliveryman, setDeliveryman] = useState([]);

  useEffect(() => {
    async function loadDeliveryman() {
      const response = await api.get('deliveryman');

      setDeliveryman(response.data);
    }

    loadDeliveryman();
  }, []);

  return (
    <Container>
      <Manager>
        <strong>Gerenciando entregadores</strong>

        <Teste>
          <div>
            <Input name="search" placeholder="Buscar por entregadores" />
          </div>

          <aside>
            <Button>
              <button type="button">
                <div>
                  <FiPlus size={20} color="#FFFF" />
                </div>
                <strong>CADASTRAR</strong>
              </button>
            </Button>
          </aside>
        </Teste>
      </Manager>
      <OrderTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {deliveryman.map((entregador) => (
            <tr key={entregador.id}>
              <td>
                <span>#{entregador.id}</span>
              </td>
              <td>
                <span>Foto</span>
              </td>
              <td>
                <div>
                  <span>{entregador.name}</span>
                </div>
              </td>
              <td>
                <span>{entregador.email}</span>
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

export default Deliverymans;
