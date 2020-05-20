import * as t from "./actions-types";
import { GameType, MoveType, RestGameStateType } from "../types";

export type AddFPSActionType = {
  type: typeof t.ADD_FPS;
};
export type ChangeSaveNameActionType = {
  type: typeof t.CHANGE_SAVE_NAME;
  payload: string;
};
export type ClearFPSActionType = {
  type: typeof t.CLEAR_FPS;
};
export type LoadGameActionType = {
  type: typeof t.LOAD_GAME;
  payload: GameType;
};
export type GameReducerActionType =
  | LoadGameActionType
  | UpdateGameActionType
  | ResetActionType;
export type GenerateNewStarsActionType = {
  type: typeof t.GENERATE_NEW_STARS;
};
export type GetSaveActionType = {
  type: typeof t.GET_SAVES;
  payload: string[];
};
export type SagaRunFpsTimerActionType = {
  type: typeof t.SAGA_RUN_FPS_TIMER;
};
export type ResetActionType = {
  type: typeof t.RESET;
};
export type SagaGetSavesActionType = {
  type: typeof t.SAGA_GET_SAVES;
};
export type SagaLoadGameActionType = {
  type: typeof t.SAGA_LOAD_GAME;
  saveName: string;
};
export type SagaSaveGameActionType = {
  type: typeof t.SAGA_SAVE_GAME;
  saveName: string;
};
export type SagaStopFpsTimerActionType = {
  type: typeof t.SAGA_STOP_FPS_TIMER;
};
export type SagaToggleEscapeActionType = {
  type: typeof t.SAGA_TOGGLE_ESCAPE;
  key: boolean;
};
export type ToggleArrowLeftActionType = {
  type: typeof t.TOGGLE_ARROW_LEFT;
  payload: boolean;
};
export type ToggleArrowRightActionType = {
  type: typeof t.TOGGLE_ARROW_RIGHT;
  payload: boolean;
};
export type ToggleDisplayActionType = {
  type: typeof t.TOGGLE_DISPLAY;
  payload: boolean;
};
export type ToggleEscapeActionType = {
  type: typeof t.TOGGLE_ESCAPE;
  payload: boolean;
};
export type ToggleSpaceActionType = {
  type: typeof t.TOGGLE_SPACE;
  payload: boolean;
};
export type UpdateGameActionType = {
  type: typeof t.UPDATE_GAME;
  payload: RestGameStateType;
  state: MoveType;
};

export const addFPS = (): AddFPSActionType => ({ type: t.ADD_FPS });
export const changeSaveName = (saveName: string): ChangeSaveNameActionType => ({
  type: t.CHANGE_SAVE_NAME,
  payload: saveName,
});
export const clearFPS = (): ClearFPSActionType => ({ type: t.CLEAR_FPS });
export const generateNewStars = (): GenerateNewStarsActionType => ({
  type: t.GENERATE_NEW_STARS,
});
export const getSaves = (saves: string[]): GetSaveActionType => ({
  type: t.GET_SAVES,
  payload: saves,
});
export const loadGame = (payload: GameType): LoadGameActionType => ({
  type: t.LOAD_GAME,
  payload,
});
export const reset = (): ResetActionType => ({ type: t.RESET });
export const sagaGetSaves = (): SagaGetSavesActionType => ({
  type: t.SAGA_GET_SAVES,
});
export const sagaLoadGame = (saveName: string): SagaLoadGameActionType => ({
  type: t.SAGA_LOAD_GAME,
  saveName,
});
export const sagaRunFpsTimer = (): SagaRunFpsTimerActionType => ({
  type: t.SAGA_RUN_FPS_TIMER,
});
export const sagaSaveGame = (saveName: string): SagaSaveGameActionType => ({
  type: t.SAGA_SAVE_GAME,
  saveName,
});
export const sagaStopFpsTimer = (): SagaStopFpsTimerActionType => ({
  type: t.SAGA_STOP_FPS_TIMER,
});
export const sagaToggleEscape = (key: boolean): SagaToggleEscapeActionType => ({
  type: t.SAGA_TOGGLE_ESCAPE,
  key,
});
export const toggleArrowLeft = (key: boolean): ToggleArrowLeftActionType => ({
  type: t.TOGGLE_ARROW_LEFT,
  payload: key,
});
export const toggleArrowRight = (key: boolean): ToggleArrowRightActionType => ({
  type: t.TOGGLE_ARROW_RIGHT,
  payload: key,
});
export const toggleDisplay = (display: boolean): ToggleDisplayActionType => ({
  type: t.TOGGLE_DISPLAY,
  payload: display,
});
export const toggleEscape = (payload: boolean): ToggleEscapeActionType => ({
  type: t.TOGGLE_ESCAPE,
  payload,
});
export const toggleSpace = (key: boolean): ToggleSpaceActionType => ({
  type: t.TOGGLE_SPACE,
  payload: key,
});
export const updateGame = (
  game: RestGameStateType,
  state: MoveType
): UpdateGameActionType => ({
  type: t.UPDATE_GAME,
  payload: game,
  state,
});
