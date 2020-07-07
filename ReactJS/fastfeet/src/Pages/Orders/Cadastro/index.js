import React from 'react';
import { Link } from 'react-router-dom';
import { FiChevronLeft, FiCheck } from 'react-icons/fi';

import { Container, Manager, Buttons } from './styles';

function Cadastro() {
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
            <button type="button">
              <div>
                <FiCheck size={20} color="#FFFF" />
              </div>
              <strong>SALVAR</strong>
            </button>
          </div>
        </Buttons>
      </Manager>
    </Container>
  );
}

export default Cadastro;
