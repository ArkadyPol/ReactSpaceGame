import { takeEvery, put, PutEffect } from 'redux-saga/effects';
import { SAGA_TOGGLE_ESCAPE } from '../actions-types';
import {
  toggleDisplay,
  ToggleKeyAction,
  ToggleDisplayAction,
  SagaToggleEscapeAction,
  toggleKey,
} from '../actions';
import { WatcherSaga } from '../../types';

export type ToggleEscapeEffects =
  | PutEffect<ToggleKeyAction>
  | PutEffect<ToggleDisplayAction>;

type ToggleEscapeSaga = Generator<ToggleEscapeEffects, void, unknown>;

export function* toggleEscapeSaga({
  isOn,
}: SagaToggleEscapeAction): ToggleEscapeSaga {
  yield put(toggleKey('escape', isOn));
  yield put(toggleDisplay(false));
}

export default function* watchToggleEscape(): WatcherSaga {
  yield takeEvery(SAGA_TOGGLE_ESCAPE, toggleEscapeSaga);
}
