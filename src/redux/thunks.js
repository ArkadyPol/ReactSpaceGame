import { GET_SAVES, TOGGLE_ESCAPE, SAVE_GAME, LOAD_GAME } from "./types";
import { toggleDisplay } from "./actions";

export const getSaves = () => async (dispatch) => {
  const response = await fetch("/saves");
  const saves = await response.json();
  dispatch({ type: GET_SAVES, payload: saves });
};

export const toggleEscape = (key) => (dispatch) => {
  dispatch({ type: TOGGLE_ESCAPE, payload: key });
  dispatch(toggleDisplay(false));
};

export const saveGame = (saveName) => (dispatch, getState) => {
  let game = getState().game;
  let save = { saveName, game };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(save),
  };
  fetch("/saves", options);
  dispatch({ type: SAVE_GAME, payload: save });
  dispatch(getSaves());
  dispatch(toggleEscape(false));
};

export const loadGame = (save) => async (dispatch) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ name: save }),
  };
  const response = await fetch("/save", options);
  const game = await response.json();
  dispatch({ type: LOAD_GAME, payload: game });
  dispatch(toggleDisplay(false));
};
