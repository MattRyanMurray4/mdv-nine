import { createFeatureSelector, createSelector } from '@ngrx/store';
import { emptyWeapon, Weapon } from '@tools/api-interfaces';
import {
  WEAPONS_FEATURE_KEY,
  WeaponsState,
  weaponsAdapter,
} from './weapons.reducer';

// Lookup the 'Weapons' feature state managed by NgRx
export const getWeaponsState =
  createFeatureSelector<WeaponsState>(WEAPONS_FEATURE_KEY);

const { selectAll, selectEntities } = weaponsAdapter.getSelectors();

export const getWeaponsLoaded = createSelector(
  getWeaponsState,
  (state: WeaponsState) => state.loaded
);

export const getWeaponsError = createSelector(
  getWeaponsState,
  (state: WeaponsState) => state.error
);

export const getAllWeapons = createSelector(
  getWeaponsState,
  (state: WeaponsState) => selectAll(state)
);

export const getWeaponsEntities = createSelector(
  getWeaponsState,
  (state: WeaponsState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getWeaponsState,
  (state: WeaponsState) => state.selectedId
);

export const getSelected = createSelector(
  getWeaponsEntities,
  getSelectedId,
  (entities, selectedId) =>
    (selectedId ? entities[selectedId] : emptyWeapon) as Weapon
);
