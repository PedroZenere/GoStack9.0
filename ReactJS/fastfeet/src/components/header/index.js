import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/fastfeet-logo.png';

import { Container, Content, Admin } from './styles';

function header() {
  return (
    <Container>
      <Content>
        <div>
          <img src={logo} alt="FastFeet" />

          <nav>
            <Link to="/orders">ENCOMENDAS</Link>
            <Link to="/deliverymans">ENTREGADORES</Link>
            <Link to="/recipients">DESTINATÁRIOS</Link>
            <Link to="/problems">PROBLEMAS</Link>
          </nav>
        </div>

        <aside>
          <Admin>
            <strong>Admin FastFeet</strong>
            <p>sair do sistema</p>
          </Admin>
        </aside>
      </Content>
    </Container>
  );
}

export default header;
