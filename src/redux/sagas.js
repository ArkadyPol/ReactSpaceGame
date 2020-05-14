import {
  GET_SAVES,
  TOGGLE_ESCAPE,
  SAVE_GAME,
  LOAD_GAME,
  SAGA_GET_SAVES,
  SAGA_TOGGLE_ESCAPE,
  SAGA_SAVE_GAME,
  SAGA_LOAD_GAME,
} from "./types";
import { toggleDisplay } from "./actions";
import api from "../api";
import { takeEvery, put, call, all, select, fork } from "redux-saga/effects";
import { getGame } from "./selectors";

function* watchGetSaves() {
  yield takeEvery(SAGA_GET_SAVES, getSavesSaga);
}
function* getSavesSaga() {
  const saves = yield call(api.getSaves);
  yield put({ type: GET_SAVES, payload: saves });
}

function* watchToggleEscape() {
  yield takeEvery(SAGA_TOGGLE_ESCAPE, toggleEscapeSaga);
}
function* toggleEscapeSaga({ key }) {
  yield put({ type: TOGGLE_ESCAPE, payload: key });
  yield put(toggleDisplay(false));
}

function* watchSaveGame() {
  yield takeEvery(SAGA_SAVE_GAME, saveGameSaga);
}
function* saveGameSaga({ saveName }) {
  const game = yield select(getGame);
  const save = { saveName, game };
  yield call(api.saveGame, save);
  yield put({ type: SAVE_GAME, payload: save });
  yield fork(getSavesSaga);
  yield* toggleEscapeSaga({ key: false });
}

function* watchLoadGame() {
  yield takeEvery(SAGA_LOAD_GAME, loadGameSaga);
}
function* loadGameSaga({ save }) {
  const game = yield call(api.loadGame, save);
  yield put({ type: LOAD_GAME, payload: game });
  yield put(toggleDisplay(false));
}

export default function* rootSaga() {
  yield all([
    watchGetSaves(),
    watchToggleEscape(),
    watchSaveGame(),
    watchLoadGame(),
  ]);
}
