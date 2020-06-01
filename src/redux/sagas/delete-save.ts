import {
  takeEvery,
  call,
  fork,
  CallEffect,
  ForkEffect,
} from 'redux-saga/effects';
import { DELETE_SAVE } from '../actions-types';
import { DeleteSaveAction } from '../actions';
import api from '../../api';
import { WatcherSaga } from '../../types';
import { getSavesSaga } from './get-saves';

type DeleteSaveSaga = Generator<
  CallEffect<void> | ForkEffect<void>,
  void,
  unknown
>;
function* deleteSaveSaga({ saveName }: DeleteSaveAction): DeleteSaveSaga {
  yield call(api.deleteSave.bind(api), saveName);
  yield fork(getSavesSaga);
}
export default function* watchDeleteSave(): WatcherSaga {
  yield takeEvery(DELETE_SAVE, deleteSaveSaga);
}
