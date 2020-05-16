import stars from "./stars.json";
import { RESET, UPDATE_GAME, LOAD_GAME, GENERATE_NEW_STARS } from "../../types";
import { randomInteger } from "../../../logic";

const generateStar = () => {
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
const generateNewStars = (oldStars) => {
  const newStars = [...oldStars];
  const quantity = randomInteger(2, 7);
  for (let i = 0; i < quantity; i++) {
    newStars.push(generateStar());
  }
  return newStars;
};

const starsReducer = (state = stars, action) => {
  switch (action.type) {
    case LOAD_GAME:
      return action.payload.stars;
    case UPDATE_GAME:
      return state
        .map((params) => [params[0], params[1] + 0.5, params[2]])
        .filter((params) => params[1] < 750);
    case GENERATE_NEW_STARS:
      return generateNewStars(state);
    case RESET:
      return stars;
    default:
      return state;
  }
};

export default starsReducer;
