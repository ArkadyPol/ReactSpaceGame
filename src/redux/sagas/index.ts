import { all, AllEffect } from 'redux-saga/effects';
import watchGetSaves from './get-saves';
import watchToggleEscape from './toggle-escape';
import watchSaveGame from './save-game';
import watchLoadGame from './load-game';
import fpsTimer, { FpsTimer } from './fps-timer';
import watchUpdateGame from './update-game';

type RootSaga = Generator<AllEffect<FpsTimer>, void, unknown>;

export default function* rootSaga(): RootSaga {
  yield all([
    watchGetSaves(),
    watchToggleEscape(),
    watchSaveGame(),
    watchLoadGame(),
    fpsTimer(),
    watchUpdateGame(),
  ]);
}
