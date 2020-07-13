import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Input } from '@rocketseat/unform';

import ButtonRecipient from '../../components/buttonsRecipient';

import { RecipientRequest } from '../../store/modules/recipient/action';

import { Container, Manager, Teste, Button, OrderTable } from './styles';

function Recipients() {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const rec = useSelector((state) => state.recipient);

  useEffect(() => {
    // console.log('Executei?');
    dispatch(RecipientRequest());

    setRecipients(rec);
    if (rec) {
      setLoading(true);
    }
  }, [dispatch, rec]);

  if (!loading) {
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
                <Link to="/cadrecipients">
                  <div>
                    <FiPlus size={20} color="#FFFF" />
                  </div>
                  <strong>CADASTRAR</strong>
                </Link>
              </Button>
            </aside>
          </Teste>
        </Manager>
      </Container>
    );
  } else {
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
                <Link to="/cadrecipients">
                  <div>
                    <FiPlus size={20} color="#FFFF" />
                  </div>
                  <strong>CADASTRAR</strong>
                </Link>
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
                  <ButtonRecipient idRecip={dest.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </OrderTable>
      </Container>
    );
  }
}

export default Recipients;
