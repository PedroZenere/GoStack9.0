import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import {
  RecipientSuccess,
  RecipientFilterSuccess,
  RecipientInsertSuccess,
  RecipientUpdateSuccess,
  removeRecipientSuccess,
} from './action';

export function* recipientList() {
  try {
    const response = yield call(api.get, 'recipients');

    const st = yield select((state) => state.recipient);

    const { data } = response;

    // console.log('DeliverySag: ', data);
    // const lenstate = st ? st.length : 0;
    // console.log('DataLen: ', data.length);
    // console.log('stateLen: ', lenstate);
    if (st.length === data.length) return;

    yield put(RecipientSuccess(data));
  } catch (err) {
    toast.error('Erro na requisição');
  }
}

export function* recipientListFilter({ payload }) {
  try {
    const { q } = payload;
    const response = yield call(api.get, 'recipients', {
      params: {
        q,
      },
    });

    const { data } = response;
    yield put(RecipientFilterSuccess(data));
  } catch (err) {
    toast.error('Erro na requisição');
  }
}

export function* recipientInsert({ payload }) {
  try {
    console.log('Payload: ', payload);
    const { nome, rua, numero, complemento, estado, cidade, cep } = payload;

    const response = yield call(api.post, 'recipients', {
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });

    const { data } = response;
    console.log('Response: ', data);

    yield put(RecipientInsertSuccess(data));
  } catch (err) {
    toast.error('Erro ao inserir destinatario. Confira os dados!');
  }
}

export function* recipientUpdate({ payload }) {
  try {
    const { id } = payload;
    const {
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    } = payload.recipient;

    const response = yield call(api.put, `recipients/${id}`, {
      nome,
      rua,
      numero,
      complemento,
      estado,
      cidade,
      cep,
    });

    if (!response) {
      throw new Error(
        'Problemas ao atualizar destinatario. Verifique seus dados'
      );
    }

    // history.push('/orders');

    yield put(RecipientUpdateSuccess(response.data));
    // console.log('Passei');
  } catch (err) {
    toast.error(err);
  }
}

export function* removeRecipient({ payload }) {
  try {
    const { id } = payload;
    yield call(api.delete, `recipients/${id}`);

    yield put(removeRecipientSuccess(id));
  } catch (err) {
    toast.error('Erro ao deletar');
  }
}

export default all([
  takeLatest('@recipient/RECIPIENT_REQUEST', recipientList),
  takeLatest('@recipient/RECIPIENT_FILTER_REQUEST', recipientListFilter),
  takeLatest('@recipient/RECIPIENT_INSERT_REQUEST', recipientInsert),
  takeLatest('@recipient/RECIPIENT_UPDATE_REQUEST', recipientUpdate),
  takeLatest('@recipient/RECIPIENT_REMOVE_REQUEST', removeRecipient),
]);
