import {
  takeEvery,
  put,
  call,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';
import { SAGA_GET_SAVES } from '../actions-types';
import { getSaves, GetSaveAction } from '../actions';
import api from '../../api';
import { WatcherSaga } from '../../types';

type GetSavesSaga = Generator<
  CallEffect<string[]> | PutEffect<GetSaveAction>,
  void,
  string[]
>;

export function* getSavesSaga(): GetSavesSaga {
  const saves: string[] = yield call(api.getSaves.bind(api));
  yield put(getSaves(saves));
}

export default function* watchGetSaves(): WatcherSaga {
  yield takeEvery(SAGA_GET_SAVES, getSavesSaga);
}
