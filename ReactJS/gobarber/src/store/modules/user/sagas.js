import { all, call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { updateProfileSuccess, updateProfileFailure } from './actions';

import api from '~/services/api';
import history from '~/services/history';

function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload;

    const profile = Object({
      name,
      email,
      avatar_id,
      ...(rest.oldPassword ? rest : {}),
    });

    const response = yield call(api.put, 'users', profile);

    if (!profile.oldPassword) {
      toast.success('Cadastro atualizado com sucesso!');
    } else {
      toast.success('Senha atualizada com sucesso!');
    }

    yield put(updateProfileSuccess(response.data));
    setTimeout(function reload() {
      history.go(0);
    }, 3000);
  } catch (err) {
    toast.error('Não foi possível atualizar. Confira suas informações');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
