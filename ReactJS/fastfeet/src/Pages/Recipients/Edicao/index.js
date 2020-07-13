import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { RecipientUpdateRequest } from '../../../store/modules/recipient/action';

import {
  Container,
  Manager,
  Buttons,
  Dados,
  Nome,
  Endereco,
  Rua,
  Cidade,
} from './styles';

const schema = Yup.object().shape({
  nome: Yup.string(),
  rua: Yup.string(),
  numero: Yup.number(),
  complemento: Yup.string(),
  estado: Yup.string(),
  cidade: Yup.string(),
  cep: Yup.string().min(9).max(9),
});

function Edicao({ match }) {
  const { id } = match.params;
  const dispatch = useDispatch();
  const recipient = useSelector((state) => state.recipient);
  const singleRecipient = recipient.find((rec) => {
    return rec.id === Number(id);
  });

  function handleSubmit(data) {
    dispatch(RecipientUpdateRequest(Number(id), data));
  }
  return (
    <Container>
      <Manager>
        <div>
          <strong>Edição de destinatário</strong>
        </div>

        <Buttons>
          <div>
            <Link to="/recipients">
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
        initialData={singleRecipient}
        id="myform"
        schema={schema}
        onSubmit={handleSubmit}
      >
        <Dados>
          <Nome>
            <div>
              <p>Nome</p>
              <Input name="nome" type="text" />
            </div>
          </Nome>
          <Endereco>
            <Rua>
              <div>
                <p>Rua</p>
                <Input name="rua" type="text" />
              </div>
            </Rua>
            <div>
              <p>Número</p>
              <Input name="numero" type="text" />
            </div>
            <div>
              <p>Complemento</p>
              <Input name="complemento" type="text" />
            </div>
          </Endereco>
          <Cidade>
            <div>
              <p>Cidade</p>
              <Input name="cidade" type="text" />
            </div>
            <div>
              <p>Estado</p>
              <Input name="estado" type="text" />
            </div>
            <div>
              <p>CEP</p>
              <Input name="cep" type="text" />
            </div>
          </Cidade>
        </Dados>
      </Form>
    </Container>
  );
}

export default Edicao;
