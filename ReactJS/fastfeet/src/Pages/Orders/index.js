import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Input } from '@rocketseat/unform';

import ButtonList from '../../components/buttonsOrder';

import {
  OrderRequest,
  OrderRequestFilter,
} from '../../store/modules/order/actions';

import {
  Container,
  Manager,
  Teste,
  Button,
  OrderTable,
  Status,
} from './styles';

export default function Orders() {
  const dispatch = useDispatch();

  useEffect(() => {
    function loadOrders() {
      dispatch(OrderRequest());
    }

    loadOrders();
  }, [dispatch]);

  async function handleFilter(e) {
    dispatch(OrderRequestFilter(e.target.value));
  }

  const orders = useSelector((state) => state.order);

  function handleStatusColorButton(status) {
    switch (status) {
      case 'ENTREGUE':
        return '#DFF0DF';
      case 'PENDENTE':
        return '#F0F0DF';
      case 'RETIRADO':
        return '#BAD2FF';
      default:
        return '#FAB0B0';
    }
  }

  function handleStatusColorFont(status) {
    switch (status) {
      case 'ENTREGUE':
        return '#2CA42B';
      case 'PENDENTE':
        return '#C1BC35';
      case 'RETIRADA':
        return '#4D85EE';
      default:
        return '#4D85EE';
    }
  }

  return (
    <Container>
      <Manager>
        <strong>Gerenciando encomendas</strong>

        <Teste>
          <div>
            <Input
              onChange={handleFilter}
              name="search"
              placeholder="Buscar por encomendas"
            />
          </div>

          <aside>
            <Button>
              <Link to="/cadorders">
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
            <th>Destinatário</th>
            <th>Entregador</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((product) => (
            <tr key={product.id}>
              <td>
                <span>#{product.id}</span>
              </td>
              <td>
                <span>{product.recipient.nome}</span>
              </td>
              <td>
                <div>
                  <span>{product.deliveryman.name}</span>
                </div>
              </td>
              <td>
                <span>{product.recipient.cidade}</span>
              </td>
              <td>
                <span>{product.recipient.estado}</span>
              </td>
              <td>
                <Status
                  statusButton={handleStatusColorButton(product.status)}
                  statusFont={handleStatusColorFont(product.status)}
                >
                  <button type="button">
                    <div />
                    {product.status}
                  </button>
                </Status>
              </td>
              <td>
                <div>
                  <ButtonList idProd={product.id} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </OrderTable>
    </Container>
  );
}
