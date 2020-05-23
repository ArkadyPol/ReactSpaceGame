import stars from './stars.json';
import {
  RESET,
  UPDATE_GAME,
  LOAD_GAME,
  GENERATE_NEW_STARS,
} from '../../actions-types';
import randomInteger from '../../../logic';
import { Star } from '../../../types';
import { GenerateNewStarsAction, GameReducerAction } from '../../actions';

const generateStar = (): Star => {
  const x = randomInteger(8, 1176);
  const y = randomInteger(-10, -19);
  const percent = randomInteger(0, 199);
  let size;
  if (percent < 81) size = 2;
  else if (percent < 130) size = 3;
  else if (percent < 160) size = 4;
  else if (percent < 178) size = 5;
  else if (percent < 189) size = 6;
  else if (percent < 196) size = 7;
  else size = 8;
  return [x, y, size];
};
const generateNewStars = (oldStars: readonly Star[]): readonly Star[] => {
  const newStars = [...oldStars];
  const quantity = randomInteger(1, 6);
  for (let i = 0; i < quantity; i++) {
    newStars.push(generateStar());
  }
  return newStars;
};

const initialState = (stars as unknown) as readonly Star[];

const starsReducer = (
  state = initialState,
  action: GameReducerAction | GenerateNewStarsAction
): readonly Star[] => {
  switch (action.type) {
    case LOAD_GAME:
      return action.payload.stars;
    case UPDATE_GAME:
      return (state
        .map((params) => [params[0], params[1] + 0.5, params[2]])
        .filter((params) => params[1] < 750) as unknown) as readonly Star[];
    case GENERATE_NEW_STARS:
      return generateNewStars(state);
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default starsReducer;
