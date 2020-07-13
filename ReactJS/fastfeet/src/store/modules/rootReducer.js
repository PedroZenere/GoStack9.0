import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import delivery from './delivery/reducer';
import recipient from './recipient/reducer';
import order from './order/reducer';

export default combineReducers({
  auth,
  user,
  delivery,
  recipient,
  order,
});
