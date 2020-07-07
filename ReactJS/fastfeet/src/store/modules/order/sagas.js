import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  OrderSuccess,
  OrderFilterSuccess,
  removeOrderSuccess,
} from './actions';

function verifyStatus(order) {
  if (order.canceled_at !== null) {
    return 'CANCELADO';
  } else if (order.end_date !== null) {
    return 'ENTREGUE';
  } else if (order.start_date !== null && order.end_date === null) {
    return 'RETIRADO';
  } else {
    return 'PENDENTE';
  }
}

export function* orderList() {
  try {
    const response = yield call(api.get, 'orders');

    const st = yield select((state) => state.order);

    const data = response.data.map((product) => ({
      ...product,
      status: verifyStatus(product),
    }));

    if (st.length === data.length) return;

    yield put(OrderSuccess(data));
  } catch (err) {
    toast.error('Erro na requisição');
  }
}

export function* orderListFilter({ payload }) {
  try {
    const { q } = payload;
    const response = yield call(api.get, 'orders', {
      params: {
        q,
      },
    });

    const data = response.data.map((product) => ({
      ...product,
      status: verifyStatus(product),
    }));

    yield put(OrderFilterSuccess(data));
  } catch (err) {
    toast.error('Erro na requisição');
  }
}

export function* removeOrder({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `orders/${id}`);

    yield put(removeOrderSuccess(id));
  } catch (err) {
    toast.error('Erro ao deletar');
  }
}

export default all([
  takeLatest('@order/ORDER_REQUEST', orderList),
  takeLatest('@order/ORDER_FILTER_REQUEST', orderListFilter),
  takeLatest('@order/ORDER_REMOVE_REQUEST', removeOrder),
]);
