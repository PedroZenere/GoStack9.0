import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { DeliverymanInsertRequest } from '../../../store/modules/delivery/actions';

import AvatarInput from '../AvatarInput';

import { Container, Manager, Buttons, Dados, Avatar } from './styles';

const schema = Yup.object().shape({
  name: Yup.string().required(),
  email: Yup.string().required(),
});

function Cadastro() {
  const dispatch = useDispatch();

  function handleSubmit({ name, email }) {
    // console.log('Ola');
    // console.log('Dados: ', name, ' ', email);
    dispatch(DeliverymanInsertRequest(name, email));
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

      <Form id="myform" schema={schema} onSubmit={handleSubmit}>
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

export default Cadastro;
