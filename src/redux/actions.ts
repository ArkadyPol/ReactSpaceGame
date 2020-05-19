import * as t from "./types";

export type AddFPSActionType = {
  type: typeof t.ADD_FPS;
};
export type AsteroidType = {
  x: number;
  y: number;
  size: number;
  vX: number;
  vY: number;
};
export type BoxType = {
  x: number;
  y: number;
  color: string;
};
export type ChangeSaveNameActionType = {
  type: typeof t.CHANGE_SAVE_NAME;
  payload: string;
};
export type ClearFPSActionType = {
  type: typeof t.CLEAR_FPS;
};
export type GameType = {
  stars: StarType[];
  passedPath: number;
  rocketX: number;
  velocity: number;
  asteroids: AsteroidType[];
  boxes: BoxType[];
  health: number;
  readyToShoot: boolean;
  shotMagazine: number;
  shots: ShotType[];
};
export type GenerateNewStarsActionType = {
  type: typeof t.GENERATE_NEW_STARS;
};
export type GetSavesActionType = {
  type: typeof t.SAGA_GET_SAVES;
};
export type LoadGameActionType = {
  type: typeof t.SAGA_LOAD_GAME;
  saveName: string;
};
export type MoveType = {
  arrowLeft: boolean;
  arrowRight: boolean;
};
export type RunFpsTimerActionType = {
  type: typeof t.SAGA_RUN_FPS_TIMER;
};
export type ResetActionType = {
  type: typeof t.RESET;
};
export type SaveGameActionType = {
  type: typeof t.SAGA_SAVE_GAME;
  saveName: string;
};
export type ShotType = [number, number];
export type StarType = [number, number, number];
export type StopFpsTimerActionType = {
  type: typeof t.SAGA_STOP_FPS_TIMER;
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
  type: typeof t.SAGA_TOGGLE_ESCAPE;
  key: boolean;
};
export type ToggleSpaceActionType = {
  type: typeof t.TOGGLE_SPACE;
  payload: boolean;
};
export type UpdateGameActionType = {
  type: typeof t.UPDATE_GAME;
  payload: GameType;
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
export const getSaves = (): GetSavesActionType => ({
  type: t.SAGA_GET_SAVES,
});
export const loadGame = (saveName: string): LoadGameActionType => ({
  type: t.SAGA_LOAD_GAME,
  saveName,
});
export const reset = (): ResetActionType => ({ type: t.RESET });
export const runFpsTimer = (): RunFpsTimerActionType => ({
  type: t.SAGA_RUN_FPS_TIMER,
});
export const saveGame = (saveName: string): SaveGameActionType => ({
  type: t.SAGA_SAVE_GAME,
  saveName,
});
export const stopFpsTimer = (): StopFpsTimerActionType => ({
  type: t.SAGA_STOP_FPS_TIMER,
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
export const toggleEscape = (key: boolean): ToggleEscapeActionType => ({
  type: t.SAGA_TOGGLE_ESCAPE,
  key,
});
export const toggleSpace = (key: boolean): ToggleSpaceActionType => ({
  type: t.TOGGLE_SPACE,
  payload: key,
});
export const updateGame = (
  game: GameType,
  state: MoveType
): UpdateGameActionType => ({
  type: t.UPDATE_GAME,
  payload: game,
  state,
});
