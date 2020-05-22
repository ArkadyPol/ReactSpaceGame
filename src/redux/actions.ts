import * as t from './actions-types';
import { Game, Move, RestGameState } from '../types';

export type AddFPSAction = {
  type: typeof t.ADD_FPS;
};
export type ChangeSaveNameAction = {
  type: typeof t.CHANGE_SAVE_NAME;
  payload: string;
};
export type ClearFPSAction = {
  type: typeof t.CLEAR_FPS;
};
export type LoadGameAction = {
  type: typeof t.LOAD_GAME;
  payload: Game;
};
export type GameReducerAction = LoadGameAction | UpdateGameAction | ResetAction;
export type GenerateNewStarsAction = {
  type: typeof t.GENERATE_NEW_STARS;
};
export type GetSaveAction = {
  type: typeof t.GET_SAVES;
  payload: string[];
};
export type ResetAction = {
  type: typeof t.RESET;
};
export type SagaGetSavesAction = {
  type: typeof t.SAGA_GET_SAVES;
};
export type SagaLoadGameAction = {
  type: typeof t.SAGA_LOAD_GAME;
  saveName: string;
};
export type SagaRunFpsTimerAction = {
  type: typeof t.SAGA_RUN_FPS_TIMER;
};
export type SagaSaveGameAction = {
  type: typeof t.SAGA_SAVE_GAME;
  saveName: string;
};
export type SagaStopFpsTimerAction = {
  type: typeof t.SAGA_STOP_FPS_TIMER;
};
export type SagaToggleEscapeAction = {
  type: typeof t.SAGA_TOGGLE_ESCAPE;
  key: boolean;
};
export type ToggleArrowLeftAction = {
  type: typeof t.TOGGLE_ARROW_LEFT;
  payload: boolean;
};
export type ToggleArrowRightAction = {
  type: typeof t.TOGGLE_ARROW_RIGHT;
  payload: boolean;
};
export type ToggleDisplayAction = {
  type: typeof t.TOGGLE_DISPLAY;
  payload: boolean;
};
export type ToggleEscapeAction = {
  type: typeof t.TOGGLE_ESCAPE;
  payload: boolean;
};
export type ToggleSpaceAction = {
  type: typeof t.TOGGLE_SPACE;
  payload: boolean;
};
export type UpdateGameAction = {
  type: typeof t.UPDATE_GAME;
  payload: RestGameState;
  state: Move;
};

export const addFPS = (): AddFPSAction => ({ type: t.ADD_FPS });
export const changeSaveName = (saveName: string): ChangeSaveNameAction => ({
  type: t.CHANGE_SAVE_NAME,
  payload: saveName,
});
export const clearFPS = (): ClearFPSAction => ({ type: t.CLEAR_FPS });
export const generateNewStars = (): GenerateNewStarsAction => ({
  type: t.GENERATE_NEW_STARS,
});
export const getSaves = (saves: string[]): GetSaveAction => ({
  type: t.GET_SAVES,
  payload: saves,
});
export const loadGame = (payload: Game): LoadGameAction => ({
  type: t.LOAD_GAME,
  payload,
});
export const reset = (): ResetAction => ({ type: t.RESET });
export const sagaGetSaves = (): SagaGetSavesAction => ({
  type: t.SAGA_GET_SAVES,
});
export const sagaLoadGame = (saveName: string): SagaLoadGameAction => ({
  type: t.SAGA_LOAD_GAME,
  saveName,
});
export const sagaRunFpsTimer = (): SagaRunFpsTimerAction => ({
  type: t.SAGA_RUN_FPS_TIMER,
});
export const sagaSaveGame = (saveName: string): SagaSaveGameAction => ({
  type: t.SAGA_SAVE_GAME,
  saveName,
});
export const sagaStopFpsTimer = (): SagaStopFpsTimerAction => ({
  type: t.SAGA_STOP_FPS_TIMER,
});
export const sagaToggleEscape = (key: boolean): SagaToggleEscapeAction => ({
  type: t.SAGA_TOGGLE_ESCAPE,
  key,
});
export const toggleArrowLeft = (key: boolean): ToggleArrowLeftAction => ({
  type: t.TOGGLE_ARROW_LEFT,
  payload: key,
});
export const toggleArrowRight = (key: boolean): ToggleArrowRightAction => ({
  type: t.TOGGLE_ARROW_RIGHT,
  payload: key,
});
export const toggleDisplay = (display: boolean): ToggleDisplayAction => ({
  type: t.TOGGLE_DISPLAY,
  payload: display,
});
export const toggleEscape = (payload: boolean): ToggleEscapeAction => ({
  type: t.TOGGLE_ESCAPE,
  payload,
});
export const toggleSpace = (key: boolean): ToggleSpaceAction => ({
  type: t.TOGGLE_SPACE,
  payload: key,
});
export const updateGame = (
  game: RestGameState,
  state: Move
): UpdateGameAction => ({
  type: t.UPDATE_GAME,
  payload: game,
  state,
});
