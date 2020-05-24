import {
  put,
  fork,
  take,
  cancel,
  delay,
  CallEffect,
  PutEffect,
  ForkEffect,
  TakeEffect,
  CancelEffect,
} from 'redux-saga/effects';
import { Task } from 'redux-saga';
import { RUN_FPS_TIMER, STOP_FPS_TIMER } from '../actions-types';
import { clearFPS, ClearFPSAction } from '../actions';

type FpsTick = Generator<
  CallEffect<true> | PutEffect<ClearFPSAction>,
  void,
  unknown
>;
function* fpsTick(): FpsTick {
  while (true) {
    yield delay(5000);
    yield put(clearFPS());
  }
}
export type FpsTimer = Generator<
  ForkEffect<void> | TakeEffect | CancelEffect,
  void,
  Task
>;
export default function* fpsTimer(): FpsTimer {
  while (yield take(RUN_FPS_TIMER)) {
    const fpsTask: Task = yield fork(fpsTick);
    yield take(STOP_FPS_TIMER);
    yield cancel(fpsTask);
  }
}
