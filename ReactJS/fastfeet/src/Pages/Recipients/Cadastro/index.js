import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';
import { Input, Form } from '@rocketseat/unform';
import * as Yup from 'yup';

import { RecipientInsertRequest } from '../../../store/modules/recipient/action';

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
  nome: Yup.string().required(),
  rua: Yup.string().required(),
  numero: Yup.number().required(),
  complemento: Yup.string().required(),
  cidade: Yup.string().required(),
  estado: Yup.string().required(),
  cep: Yup.string().min(9).max(9).required(),
});

function Cadastro() {
  const dispatch = useDispatch();

  function handleSubmit(data) {
    console.log('Dados: ', data);
    dispatch(RecipientInsertRequest(data));
  }
  return (
    <Container>
      <Manager>
        <div>
          <strong>Cadastro de destinatário</strong>
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

      <Form id="myform" schema={schema} onSubmit={handleSubmit}>
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

export default Cadastro;
