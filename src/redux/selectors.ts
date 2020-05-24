// import { createSelector } from 'reselect';
import { RootState } from './reducers';
import { Star, Game } from '../types';

export const getStars = (state: RootState): readonly Star[] => state.game.stars;

export const getGame = (state: RootState): Game => state.game;
