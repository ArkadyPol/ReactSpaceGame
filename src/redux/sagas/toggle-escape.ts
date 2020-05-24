import { takeEvery, put, PutEffect } from 'redux-saga/effects';
import { SAGA_TOGGLE_ESCAPE } from '../actions-types';
import {
  toggleDisplay,
  toggleEscape,
  ToggleEscapeAction,
  ToggleDisplayAction,
  SagaToggleEscapeAction,
} from '../actions';
import { WatcherSaga } from '../../types';

export type ToggleEscapeEffects =
  | PutEffect<ToggleEscapeAction>
  | PutEffect<ToggleDisplayAction>;

type ToggleEscapeSaga = Generator<ToggleEscapeEffects, void, unknown>;

export function* toggleEscapeSaga({
  key,
}: SagaToggleEscapeAction): ToggleEscapeSaga {
  yield put(toggleEscape(key));
  yield put(toggleDisplay(false));
}

export default function* watchToggleEscape(): WatcherSaga {
  yield takeEvery(SAGA_TOGGLE_ESCAPE, toggleEscapeSaga);
}
