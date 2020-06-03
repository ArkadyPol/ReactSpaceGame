import {
  takeEvery,
  call,
  select,
  fork,
  CallEffect,
  ForkEffect,
  SelectEffect,
} from 'redux-saga/effects';
import { SAVE_GAME } from '../actions-types';
import { SagaToggleEscapeAction, SaveGameAction } from '../actions';
import api from '../../api';
import { getGame } from '../selectors';
import { Game, WatcherSaga } from '../../types';
import { getSavesSaga } from './get-saves';
import { ToggleEscapeEffects, toggleEscapeSaga } from './toggle-escape';

type SaveGameSaga = Generator<
  ForkEffect<void> | SelectEffect | CallEffect<void> | ToggleEscapeEffects,
  void,
  Game
>;
function* saveGameSaga({ saveName }: SaveGameAction): SaveGameSaga {
  const game: Game = yield select(getGame);
  const save = { saveName, game };
  yield call(api.saveGame.bind(api), save);
  yield fork(getSavesSaga);
  yield* toggleEscapeSaga({ isOn: false } as SagaToggleEscapeAction);
}
export default function* watchSaveGame(): WatcherSaga {
  yield takeEvery(SAVE_GAME, saveGameSaga);
}
