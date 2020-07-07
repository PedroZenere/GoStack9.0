import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../Pages/SignIn';

// Dashboards
import Orders from '../Pages/Orders';
import Deliverymans from '../Pages/Deliverymans';
import Recipients from '../Pages/Recipients';
import Problems from '../Pages/Problems';

// Cadastro
import CadastroOrders from '../Pages/Orders/Cadastro';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/deliverymans" component={Deliverymans} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />

      <Route path="/cadorders" component={CadastroOrders} isPrivate />
    </Switch>
  );
}
