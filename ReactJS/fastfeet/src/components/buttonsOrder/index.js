import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiEye, FiEdit2, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';

// import api from '../../services/api';

import { removeOrderRequest } from '../../store/modules/order/actions';

import { Badge, Container, ButtonList, Scroll, Button } from './styles';

function ButtonsOrder({ idProd }) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  console.log('Product: ', idProd);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDeleteOrder(id) {
    console.log('ID: ', id);

    dispatch(removeOrderRequest(id));
  }

  return (
    <Container>
      <Badge onClick={handleToggleVisible} type="button">
        <div>
          <FiMoreHorizontal size={16} color="#C6C6C6" />
        </div>
      </Badge>
      <ButtonList visible={visible}>
        <Scroll>
          <Button>
            <li key={idProd}>
              <Link to="/orderview">
                <div>
                  <FiEye size={14} color="#8E5BE8" />
                </div>
                Visualizar
              </Link>
            </li>
            <li>
              <Link to="/orderedit">
                <div>
                  <FiEdit2 size={14} color="#4D85EE" />
                </div>
                Editar
              </Link>
            </li>
            <li>
              <button type="button" onClick={() => handleDeleteOrder(idProd)}>
                <div>
                  <FiTrash2 size={14} color="#DE3B3B" />
                </div>
                Excluir
              </button>
            </li>
          </Button>
        </Scroll>
      </ButtonList>
    </Container>
  );
}

export default ButtonsOrder;
