import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { FiPlus } from 'react-icons/fi';
import { Input } from '@rocketseat/unform';

import ButtonList from '../../components/buttonsOrder';

import api from '../../services/api';

import { Container, Manager, Teste, Button, OrderTable } from './styles';

function Recipients() {
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadRecipients() {
      const response = await api.get('recipients');

      setRecipients(response.data);
    }

    loadRecipients();
  }, []);

  return (
    <Container>
      <Manager>
        <strong>Gerenciando destinatários</strong>

        <Teste>
          <div>
            <Input name="search" placeholder="Buscar por destinatários" />
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
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {recipients.map((dest) => (
            <tr key={dest.id}>
              <td>
                <span>#{dest.id}</span>
              </td>
              <td>
                <span>{dest.nome}</span>
              </td>
              <td>
                <div>
                  <span>
                    {dest.rua}, {dest.numero}, {dest.cidade} - {dest.estado}
                  </span>
                </div>
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

export default Recipients;
