import { combineReducers } from 'redux';
import displayReducer from './display-reducer';
import savesReducer from './saves-reducer';
import gameReducer from './game-reducer';
import keyboardReducer from './keyboard-reducer';
import fpsReducer from './fps-reducer';
import langReducer from './lang-reducer';

const rootReducer = combineReducers({
  display: displayReducer,
  saves: savesReducer,
  game: gameReducer,
  keyboard: keyboardReducer,
  fps: fpsReducer,
  lang: langReducer,
});
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
