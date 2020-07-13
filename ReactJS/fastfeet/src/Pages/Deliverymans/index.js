import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Input } from '@rocketseat/unform';

import ButtonList from '../../components/buttonsDelivery';

import {
  DeliverymanRequest,
  DeliverymanRequestFilter,
} from '../../store/modules/delivery/actions';

import { Container, Manager, Teste, Button, OrderTable } from './styles';

function Deliverymans() {
  const [deliveryman, setDeliveryman] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const del = useSelector((state) => state.delivery);

  useEffect(() => {
    // console.log('Executei?');

    dispatch(DeliverymanRequest());

    setDeliveryman(del);
    setLoading(true);
  }, [dispatch, del]);

  async function handleFilter(e) {
    dispatch(DeliverymanRequestFilter(e.target.value));
  }

  console.log('Entrega: ', del);
  console.log('Load: ', loading);

  if (!loading) {
    return (
      <Container>
        <Manager>
          <strong>Gerenciando entregadores</strong>

          <Teste>
            <div>
              <Input
                name="search"
                placeholder="Buscar por entregadores"
                onChange={handleFilter}
              />
            </div>

            <aside>
              <Button>
                <Link to="caddeliverymans">
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
          <strong>Gerenciando entregadores</strong>

          <Teste>
            <div>
              <Input name="search" placeholder="Buscar por entregadores" />
            </div>

            <aside>
              <Button>
                <Link to="caddeliverymans">
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
                  <div>
                    <img
                      src="https://api.adorable.io/avatars/49/abott@adorable.pngC"
                      alt="avatar2"
                    />
                  </div>
                </td>
                <td>
                  <span>{entregador.name}</span>
                </td>
                <td>
                  <span>{entregador.email}</span>
                </td>
                <td>
                  <ButtonList idDeliver={entregador.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </OrderTable>
      </Container>
    );
  }
}

export default Deliverymans;
