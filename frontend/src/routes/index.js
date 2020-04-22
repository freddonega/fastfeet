import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import SingIn from '~/pages/SignIn';
import Packages from '~/pages/Packages';
import PackagesCreate from '~/pages/Packages/create';
import PackagesUpdate from '~/pages/Packages/update';

import Deliverymen from '~/pages/Deliverymen';
import DeliverymenCreate from '~/pages/Deliverymen/create';
import DeliverymenUpdate from '~/pages/Deliverymen/update';

import Recipients from '~/pages/Recipients';
import RecipientsCreate from '~/pages/Recipients/create';
import RecipientsUpdate from '~/pages/Recipients/update';

import Problems from '~/pages/Problems';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SingIn} />
      <Route path="/packages" exact component={Packages} isPrivate />
      <Route path="/packages/create" component={PackagesCreate} isPrivate />
      <Route path="/packages/:id" component={PackagesUpdate} isPrivate />

      <Route path="/deliverymen" exact component={Deliverymen} isPrivate />
      <Route
        path="/deliverymen/create"
        component={DeliverymenCreate}
        isPrivate
      />
      <Route path="/deliverymen/:id" component={DeliverymenUpdate} isPrivate />

      <Route path="/recipients" exact component={Recipients} isPrivate />
      <Route path="/recipients/create" component={RecipientsCreate} isPrivate />
      <Route path="/recipients/:id" component={RecipientsUpdate} isPrivate />

      <Route path="/problems" exact component={Problems} isPrivate />
    </Switch>
  );
}
