import {
  takeEvery,
  put,
  call,
  CallEffect,
  PutEffect,
} from 'redux-saga/effects';
import { SAGA_LOAD_GAME } from '../actions-types';
import {
  loadGame,
  SagaLoadGameAction,
  LoadGameAction,
  reset,
  ResetAction,
} from '../actions';
import api from '../../api';
import { Game, WatcherSaga } from '../../types';

type LoadGameSaga = Generator<
  CallEffect<Game> | PutEffect<LoadGameAction> | PutEffect<ResetAction>,
  void,
  Game
>;
function* loadGameSaga({ saveName }: SagaLoadGameAction): LoadGameSaga {
  const game: Game = yield call(api.loadGame.bind(api), saveName);
  yield put(reset());
  yield put(loadGame(game));
}
export default function* watchLoadGame(): WatcherSaga {
  yield takeEvery(SAGA_LOAD_GAME, loadGameSaga);
}
