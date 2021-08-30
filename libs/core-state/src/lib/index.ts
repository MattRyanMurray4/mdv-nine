import { ActionReducerMap } from '@ngrx/store';
import {
  weaponsReducer,
  WeaponsState,
  WEAPONS_FEATURE_KEY,
} from './weapons/weapons.reducer';

export interface AppState {
  [WEAPONS_FEATURE_KEY]: WeaponsState;
}

export const reducers: ActionReducerMap<AppState> = {
  [WEAPONS_FEATURE_KEY]: weaponsReducer,
};
