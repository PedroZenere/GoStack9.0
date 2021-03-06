import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { OrderInsertRequest } from '../../../store/modules/order/actions';

import { Container, Manager, Buttons, Dados, NomeProd } from './styles';

const schema = Yup.object().shape({
  destinatario: Yup.string().required(),
  entregador: Yup.string().required(),
  product: Yup.string().required(),
});

function Cadastro() {
  const dispatch = useDispatch();

  function handleSubmit({ destinatario, entregador, product }) {
    dispatch(OrderInsertRequest(destinatario, entregador, product));
  }
  return (
    <Container>
      <Manager>
        <div>
          <strong>Cadastro de encomendas</strong>
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

      <Form id="myform" schema={schema} onSubmit={handleSubmit}>
        <Dados>
          <div>
            <div>
              <p>Destinatário</p>
              <Input name="destinatario" type="text" />
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

export default Cadastro;
