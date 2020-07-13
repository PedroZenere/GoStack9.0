import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';

// import { removeRecipientRequest } from '../../store/modules/recipient/action';

import { Badge, Container, ButtonList, Scroll, Button } from './styles';

function ButtonsProblem({ idProblem }) {
  const [visible, setVisible] = useState(false);

  // console.log('Delivery: ', idRecip);

  function handleToggleVisible() {
    setVisible(!visible);
  }

  async function handleDeleteProblem(id) {
    console.log('ID: ', id);

    // dispatch(removeRecipientRequest(id));
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
            <li key={idProblem}>
              <Link to="/problemview">
                <div>
                  <FiEye size={14} color="#8E5BE8" />
                </div>
                Visualizar
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => handleDeleteProblem(idProblem)}
              >
                <div>
                  <FiTrash2 size={14} color="#DE3B3B" />
                </div>
                Cancelar encomenda
              </button>
            </li>
          </Button>
        </Scroll>
      </ButtonList>
    </Container>
  );
}

export default ButtonsProblem;
