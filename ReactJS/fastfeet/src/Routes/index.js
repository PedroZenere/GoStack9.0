import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '../Pages/SignIn';

// Dashboards
import Orders from '../Pages/Orders';
import Deliverymans from '../Pages/Deliverymans';
import Recipients from '../Pages/Recipients';
import Problems from '../Pages/Problems';

// Orders
import CadastroOrders from '../Pages/Orders/Cadastro';
import EdicaoOrders from '../Pages/Orders/Edicao';

// Deliverymans
import CadastroDeliverymans from '../Pages/Deliverymans/Cadastro';
import EdicaoDeliverymans from '../Pages/Deliverymans/Edicao';

// Recipients
import CadastroRecipients from '../Pages/Recipients/Cadastro';
import EdicaoRecipients from '../Pages/Recipients/Edicao';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/orders" component={Orders} isPrivate />
      <Route path="/deliverymans" component={Deliverymans} isPrivate />
      <Route path="/recipients" component={Recipients} isPrivate />
      <Route path="/problems" component={Problems} isPrivate />

      <Route path="/cadorders" component={CadastroOrders} isPrivate />
      <Route path="/ediorders/:id" component={EdicaoOrders} isPrivate />

      <Route
        path="/caddeliverymans"
        component={CadastroDeliverymans}
        isPrivate
      />
      <Route
        path="/edideliverymans/:id"
        component={EdicaoDeliverymans}
        isPrivate
      />

      <Route path="/cadrecipients" component={CadastroRecipients} isPrivate />
      <Route path="/edirecipients/:id" component={EdicaoRecipients} isPrivate />
    </Switch>
  );
}
