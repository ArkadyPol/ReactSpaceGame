import { combineReducers } from 'redux';
import starsReducer from './stars-reducer';
import pathReducer from './path-reducer';
import moveReducer from './move-reducer';
import asteroidsReducer from './asteroids-reducer';
import healthReducer from './health-reducer';
import shotsReducer from './shots-reducer';
import boxesReducer from './boxes-reducer';

const gameReducer = combineReducers({
  stars: starsReducer,
  passedPath: pathReducer,
  move: moveReducer,
  asteroids: asteroidsReducer,
  health: healthReducer,
  shotsState: shotsReducer,
  boxes: boxesReducer,
});

export default gameReducer;
