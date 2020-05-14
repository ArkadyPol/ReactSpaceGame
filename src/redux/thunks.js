import { GET_SAVES, TOGGLE_ESCAPE, SAVE_GAME, LOAD_GAME } from "./types";
import { toggleDisplay } from "./actions";
import api from "../api";
export const getSaves = () => async (dispatch) => {
  const saves = await api.getSaves();
  dispatch({ type: GET_SAVES, payload: saves });
};

export const toggleEscape = (key) => (dispatch) => {
  dispatch({ type: TOGGLE_ESCAPE, payload: key });
  dispatch(toggleDisplay(false));
};

export const saveGame = (saveName) => (dispatch, getState) => {
  let game = getState().game;
  let save = { saveName, game };
  api.saveGame(save);
  dispatch({ type: SAVE_GAME, payload: save });
  dispatch(getSaves());
  dispatch(toggleEscape(false));
};

export const loadGame = (save) => async (dispatch) => {
  const game = await api.loadGame(save);
  dispatch({ type: LOAD_GAME, payload: game });
  dispatch(toggleDisplay(false));
};
