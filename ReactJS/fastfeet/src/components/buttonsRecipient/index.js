import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiEdit2, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';

import { removeRecipientRequest } from '../../store/modules/recipient/action';

import { Badge, Container, ButtonList, Scroll, Button } from './styles';

function ButtonsRecipient({ idRecip }) {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  // console.log('Delivery: ', idRecip);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDeleteRecipient(id) {
    // console.log('ID: ', id);

    dispatch(removeRecipientRequest(id));
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
            <li key={idRecip}>
              <Link to={`/edirecipients/${idRecip}`}>
                <div>
                  <FiEdit2 size={14} color="#4D85EE" />
                </div>
                Editar
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleDeleteRecipient(idRecip)}
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

export default ButtonsRecipient;
