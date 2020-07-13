import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  DeliverymanSuccess,
  DeliverymanFilterSuccess,
  DeliverymanInsertSuccess,
  DeliverymanUpdateSuccess,
  removeDeliverymanSuccess,
} from './actions';

export function* deliverymanList() {
  try {
    const response = yield call(api.get, 'deliveryman');

    const st = yield select((state) => state.delivery);

    const { data } = response;

    // console.log('DeliverySag: ', data);
    // const lenstate = st ? st.length : 0;
    // console.log('DataLen: ', data.length);
    // console.log('stateLen: ', lenstate);
    if (st.length === data.length) return;

    yield put(DeliverymanSuccess(data));
  } catch (err) {
    toast.error('Erro na requisição');
  }
}

export function* deliverymanListFilter({ payload }) {
  try {
    const { q } = payload;
    const response = yield call(api.get, 'deliveryman', {
      params: {
        q,
      },
    });

    const { data } = response;
    yield put(DeliverymanFilterSuccess(data));
  } catch (err) {
    toast.error('Erro na requisição');
  }
}

export function* deliverymanInsert({ payload }) {
  try {
    const { name, email } = payload;

    const response = yield call(api.post, 'deliveryman', {
      name,
      email,
    });

    const { data } = response;

    yield put(DeliverymanInsertSuccess(data));
  } catch (err) {
    toast.error('Erro ao inserir entregador. Confira os dados!');
  }
}

export function* deliverymanUpdate({ payload }) {
  try {
    const { id, name, email } = payload;

    const response = yield call(api.put, `deliveryman/${id}`, {
      name,
      email,
    });

    if (!response) {
      throw new Error(
        'Problemas ao atualizar entregador. Verifique seus dados'
      );
    }

    // history.push('/orders');

    yield put(DeliverymanUpdateSuccess(response.data));
    // console.log('Passei');
  } catch (err) {
    toast.error(err);
  }
}

export function* removeDeliveryman({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `deliveryman/${id}`);

    yield put(removeDeliverymanSuccess(id));
  } catch (err) {
    toast.error('Erro ao deletar');
  }
}

export default all([
  takeLatest('@deliveryman/DELIVERYMAN_REQUEST', deliverymanList),
  takeLatest('@deliveryman/DELIVERYMAN_FILTER_REQUEST', deliverymanListFilter),
  takeLatest('@deliveryman/DELIVERYMAN_INSERT_REQUEST', deliverymanInsert),
  takeLatest('@deliveryman/DELIVERYMAN_UPDATE_REQUEST', deliverymanUpdate),
  takeLatest('@deliveryman/DELIVERYMAN_REMOVE_REQUEST', removeDeliveryman),
]);
