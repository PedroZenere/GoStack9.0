import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { DeliverymanUpdateRequest } from '../../../store/modules/delivery/actions';

import AvatarInput from '../AvatarInput';

import { Container, Manager, Buttons, Dados, Avatar } from './styles';

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string(),
});

function Edicao({ match }) {
  const { id } = match.params;

  const delivery = useSelector((state) => state.delivery);

  const singleDelivery = delivery.find((ord) => {
    return ord.id === Number(id);
  });

  const dispatch = useDispatch();

  function handleSubmit({ name, email }) {
    // console.log('dest: ', destinatario);

    dispatch(DeliverymanUpdateRequest(Number(id), name, email));
  }

  return (
    <Container>
      <Manager>
        <div>
          <strong>Cadastro de entregadores</strong>
        </div>

        <Buttons>
          <div>
            <Link to="/deliverymans">
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
          name: singleDelivery.name,
        }}
        id="myform"
        schema={schema}
        onSubmit={handleSubmit}
      >
        <Dados>
          <Avatar>
            <AvatarInput name="avatar_id" />
          </Avatar>
          <div>
            <div>
              <p>Nome</p>
              <Input name="name" type="text" />
            </div>
            <div>
              <p>Email</p>
              <Input name="email" type="text" />
            </div>
          </div>
        </Dados>
      </Form>
    </Container>
  );
}

export default Edicao;
