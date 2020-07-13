import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';

import { removeDeliverymanRequest } from '../../store/modules/delivery/actions';

import { Badge, Container, ButtonList, Scroll, Button } from './styles';

function ButtonsDelivery({ idDeliver }) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  // console.log('Delivery: ', idDeliver);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDeleteDeliveryman(id) {
    // console.log('ID: ', id);

    dispatch(removeDeliverymanRequest(id));
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
            <li key={idDeliver}>
              <Link to={`/edideliverymans/${idDeliver}`}>
                <div>
                  <FiEdit2 size={14} color="#4D85EE" />
                </div>
                Editar
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleDeleteDeliveryman(idDeliver)}
              >
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

export default ButtonsDelivery;
