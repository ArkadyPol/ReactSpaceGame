import * as t from './actions-types';
import {
  Game,
  RequiredState,
  Asteroid,
  DropBox,
  Raw,
  Language,
} from '../types';

export type AddAsteroidAction = {
  type: typeof t.ADD_ASTEROID;
  payload: Asteroid;
};
export type AddShotAction = {
  type: typeof t.ADD_SHOT;
};
export type CatchBoxAction = {
  type: typeof t.CATCH_BOX;
  payload: {
    index: number;
    raw: Raw;
    count: number;
  };
};
export type ChangeLanguageAction = {
  type: typeof t.CHANGE_LANGUAGE;
  payload: Language;
};
export type ChangeSaveNameAction = {
  type: typeof t.CHANGE_SAVE_NAME;
  payload: string;
};
export type ClearFPSAction = {
  type: typeof t.CLEAR_FPS;
};
export type DamageRocketAction = {
  type: typeof t.DAMAGE_ROCKET;
  payload: number;
};
export type DeleteSaveAction = {
  type: typeof t.DELETE_SAVE;
  saveName: string;
};
export type DestroyAsteroidAction = {
  type: typeof t.DESTROY_ASTEROID;
  payload: number;
};
export type DestroyShotAction = {
  type: typeof t.DESTROY_SHOT;
  payload: number;
};
export type DropBoxAction = {
  type: typeof t.DROP_BOX;
  payload: DropBox;
};
export type LoadGameAction = {
  type: typeof t.LOAD_GAME;
  payload: Game;
};
export type GameReducerAction = LoadGameAction | UpdateGameAction | ResetAction;
export type GenerateAsteroidAction = {
  type: typeof t.GENERATE_ASTEROID;
};
export type GenerateNewStarsAction = {
  type: typeof t.GENERATE_NEW_STARS;
};
export type GetSaveAction = {
  type: typeof t.GET_SAVES;
  payload: string[];
};
export type ReadyShootAction = {
  type: typeof t.READY_SHOOT;
};
export type ResetAction = {
  type: typeof t.RESET;
};
export type RunFpsTimerAction = {
  type: typeof t.RUN_FPS_TIMER;
};
export type SagaGetSavesAction = {
  type: typeof t.SAGA_GET_SAVES;
};
export type SagaLoadGameAction = {
  type: typeof t.SAGA_LOAD_GAME;
  saveName: string;
};
export type SagaToggleEscapeAction = {
  type: typeof t.SAGA_TOGGLE_ESCAPE;
  key: boolean;
};
export type SagaUpdateGameAction = {
  type: typeof t.SAGA_UPDATE_GAME;
};
export type SaveGameAction = {
  type: typeof t.SAVE_GAME;
  saveName: string;
};
export type StopFpsTimerAction = {
  type: typeof t.STOP_FPS_TIMER;
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
  payload: RequiredState;
};

export const addAsteroid = (asteroid: Asteroid): AddAsteroidAction => ({
  type: t.ADD_ASTEROID,
  payload: asteroid,
});
export const addShot = (): AddShotAction => ({ type: t.ADD_SHOT });
export const catchBox = (
  index: number,
  raw: Raw,
  count: number
): CatchBoxAction => ({
  type: t.CATCH_BOX,
  payload: {
    index,
    raw,
    count,
  },
});
export const changeLanguage = (lang: Language): ChangeLanguageAction => ({
  type: t.CHANGE_LANGUAGE,
  payload: lang,
});
export const changeSaveName = (saveName: string): ChangeSaveNameAction => ({
  type: t.CHANGE_SAVE_NAME,
  payload: saveName,
});
export const clearFPS = (): ClearFPSAction => ({ type: t.CLEAR_FPS });
export const damageRocket = (damage: number): DamageRocketAction => ({
  type: t.DAMAGE_ROCKET,
  payload: damage,
});
export const deleteSave = (saveName: string): DeleteSaveAction => ({
  type: t.DELETE_SAVE,
  saveName,
});
export const destroyAsteroid = (index: number): DestroyAsteroidAction => ({
  type: t.DESTROY_ASTEROID,
  payload: index,
});
export const destroyShot = (index: number): DestroyShotAction => ({
  type: t.DESTROY_SHOT,
  payload: index,
});
export const dropBox = (box: DropBox): DropBoxAction => ({
  type: t.DROP_BOX,
  payload: box,
});
export const generateAsteroid = (): GenerateAsteroidAction => ({
  type: t.GENERATE_ASTEROID,
});
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
export const readyShoot = (): ReadyShootAction => ({
  type: t.READY_SHOOT,
});
export const reset = (): ResetAction => ({ type: t.RESET });
export const runFpsTimer = (): RunFpsTimerAction => ({
  type: t.RUN_FPS_TIMER,
});
export const sagaGetSaves = (): SagaGetSavesAction => ({
  type: t.SAGA_GET_SAVES,
});
export const sagaLoadGame = (saveName: string): SagaLoadGameAction => ({
  type: t.SAGA_LOAD_GAME,
  saveName,
});
export const sagaToggleEscape = (key: boolean): SagaToggleEscapeAction => ({
  type: t.SAGA_TOGGLE_ESCAPE,
  key,
});
export const sagaUpdateGame = (): SagaUpdateGameAction => ({
  type: t.SAGA_UPDATE_GAME,
});
export const saveGame = (saveName: string): SaveGameAction => ({
  type: t.SAVE_GAME,
  saveName,
});
export const stopFpsTimer = (): StopFpsTimerAction => ({
  type: t.STOP_FPS_TIMER,
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
export const updateGame = (payload: RequiredState): UpdateGameAction => ({
  type: t.UPDATE_GAME,
  payload,
});
