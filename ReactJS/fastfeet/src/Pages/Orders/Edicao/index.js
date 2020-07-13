import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { OrderUpdateRequest } from '../../../store/modules/order/actions';

import { Container, Manager, Buttons, Dados, NomeProd } from './styles';

const schema = Yup.object().shape({
  destinatario: Yup.string().required(),
  entregador: Yup.string(),
  product: Yup.string(),
});

function Edicao({ match }) {
  const { id } = match.params;

  const order = useSelector((state) => state.order);

  const singleOrder = order.find((ord) => {
    return ord.id === Number(id);
  });

  const dispatch = useDispatch();

  function handleSubmit({ destinatario, entregador, product }) {
    // console.log('dest: ', destinatario);

    dispatch(OrderUpdateRequest(Number(id), destinatario, entregador, product));
  }
  return (
    <Container>
      <Manager>
        <div>
          <strong>Edição de encomendas</strong>
        </div>

        <Buttons>
          <div>
            <Link to="/orders">
              <div>
                <FiChevronLeft size={20} color="#FFFF" />
              </div>
              <strong>VOLTAR</strong>
            </Link>
            <button type="submit" form="myform">
              <div>
                <FiCheck size={20} color="#FFFF" />
              </div>
              <strong>SALVAR</strong>
            </button>
          </div>
        </Buttons>
      </Manager>

      <Form
        initialData={{
          destinatario: singleOrder.recipient.nome,
          entregador: singleOrder.deliveryman.name,
          product: singleOrder.product,
        }}
        id="myform"
        schema={schema}
        onSubmit={handleSubmit}
      >
        <Dados>
          <div>
            <div>
              <p>Destinatário</p>
              <Input name="destinatario" type="text" id="dest" />
            </div>
            <div>
              <p>Entregador</p>
              <Input name="entregador" type="text" />
            </div>
          </div>
          <NomeProd>
            <p>Nome do produto</p>
            <Input name="product" type="text" />
          </NomeProd>
        </Dados>
      </Form>
    </Container>
  );
}

export default Edicao;
