import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  OrderSuccess,
  OrderFilterSuccess,
  OrderInsertSuccess,
  OrderUpdateSuccess,
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

    console.log('Data: ', data);

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

export function* orderInsert({ payload }) {
  try {
    const { destinatario, entregador, product } = payload;

    const recipient = yield call(api.get, 'recipients', {
      params: {
        q: destinatario,
      },
    });

    if (!recipient) {
      throw new Error('Destinatario não encontrado');
    }

    const deliveryman = yield call(api.get, 'deliveryman', {
      params: {
        q: entregador,
      },
    });

    if (!deliveryman) {
      throw new Error('Entregador não encontrado');
    }

    const recipient_id = recipient.data[0].id;
    const deliveryman_id = deliveryman.data[0].id;

    const response = yield call(api.post, 'orders', {
      recipient_id,
      deliveryman_id,
      product,
    });

    const data = response.data.map((prod) => ({
      ...prod,
      status: verifyStatus(prod),
    }));

    yield put(OrderInsertSuccess(data));
  } catch (err) {
    toast.error(err);
  }
}

export function* orderUpdate({ payload }) {
  try {
    const { id, destinatario, entregador, product } = payload;

    const recipient = yield call(api.get, 'recipients', {
      params: {
        q: destinatario,
      },
    });

    if (!recipient) {
      throw new Error('Destinatario não encontrado');
    }

    const deliveryman = yield call(api.get, 'deliveryman', {
      params: {
        q: entregador,
      },
    });

    if (!deliveryman) {
      throw new Error('Entregador não encontrado');
    }

    // console.log('RECIPIENT: ', recipient);
    // console.log('deliveryman: ', deliveryman);

    // console.log('ID_RE: ', recipient.data[0].id);
    // console.log('ID_De: ', deliveryman.data[0].id);

    const recipient_id = recipient.data[0].id;
    const deliveryman_id = deliveryman.data[0].id;

    const response = yield call(api.put, `orders/${id}`, {
      recipient_id,
      deliveryman_id,
      product,
    });

    if (!response) {
      throw new Error(
        'Problemas ao atualizar a encomenda. Verifique seus dados'
      );
    }
    const data = { ...response.data, status: verifyStatus(response.data) };
    // console.log('Res: ', data);
    // history.push('/orders');

    yield put(OrderUpdateSuccess(data));
    // console.log('Passei');
  } catch (err) {
    toast.error(err);
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
  takeLatest('@order/ORDER_INSERT_REQUEST', orderInsert),
  takeLatest('@order/ORDER_UPDATE_REQUEST', orderUpdate),
  takeLatest('@order/ORDER_REMOVE_REQUEST', removeOrder),
]);
