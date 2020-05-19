import {
  takeEvery,
  put,
  call,
  all,
  select,
  fork,
  take,
  cancel,
  delay,
} from "redux-saga/effects";
import {
  SAGA_GET_SAVES,
  SAGA_TOGGLE_ESCAPE,
  SAGA_SAVE_GAME,
  SAGA_LOAD_GAME,
  SAGA_RUN_FPS_TIMER,
  SAGA_STOP_FPS_TIMER,
} from "./types";
import {
  toggleDisplay,
  clearFPS,
  getSaves,
  toggleEscape,
  loadGame,
} from "./actions";
import api from "../api";
import { getGame } from "./selectors";

function* getSavesSaga() {
  const saves = yield call(api.getSaves.bind(api));
  yield put(getSaves(saves));
}

function* watchGetSaves() {
  yield takeEvery(SAGA_GET_SAVES, getSavesSaga);
}

function* toggleEscapeSaga({ key }) {
  yield put(toggleEscape(key));
  yield put(toggleDisplay(false));
}
function* watchToggleEscape() {
  yield takeEvery(SAGA_TOGGLE_ESCAPE, toggleEscapeSaga);
}

function* saveGameSaga({ saveName }) {
  const game = yield select(getGame);
  const save = { saveName, game };
  yield call(api.saveGame.bind(api), save);
  yield fork(getSavesSaga);
  yield* toggleEscapeSaga({ key: false });
}
function* watchSaveGame() {
  yield takeEvery(SAGA_SAVE_GAME, saveGameSaga);
}

function* loadGameSaga({ saveName }) {
  const game = yield call(api.loadGame.bind(api), saveName);
  yield put(loadGame(game));
  yield put(toggleDisplay(false));
}
function* watchLoadGame() {
  yield takeEvery(SAGA_LOAD_GAME, loadGameSaga);
}

function* fpsTick() {
  while (true) {
    yield delay(5000);
    yield put(clearFPS());
  }
}
function* fpsTimer() {
  while (yield take(SAGA_RUN_FPS_TIMER)) {
    const fpsTask = yield fork(fpsTick);
    yield take(SAGA_STOP_FPS_TIMER);
    yield cancel(fpsTask);
  }
}

export default function* rootSaga() {
  yield all([
    watchGetSaves(),
    watchToggleEscape(),
    watchSaveGame(),
    watchLoadGame(),
    fpsTimer(),
  ]);
}
