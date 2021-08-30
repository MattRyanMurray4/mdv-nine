import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';
import { Weapon } from '@tools/api-interfaces';

import * as WeaponsActions from './weapons.actions';

export const WEAPONS_FEATURE_KEY = 'weapons';

export interface WeaponsAction extends Action {
  error: string;
}

export interface WeaponsState extends EntityState<Weapon> {
  selectedId?: string | number; // which Weapons record has been selected
  loaded: boolean; // has the Weapons list been loaded
  error?: string | null; // last known error (if any)
}

export interface WeaponsPartialState {
  readonly [WEAPONS_FEATURE_KEY]: WeaponsState;
}

export const weaponsAdapter: EntityAdapter<Weapon> =
  createEntityAdapter<Weapon>();

export const initialState: WeaponsState = weaponsAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const setLoading = (state: WeaponsState) => ({
  ...state,
  loaded: false,
  error: null,
});

const setFailure = (state: WeaponsState, { error }: WeaponsAction) => ({
  ...state,
  error,
});

const _weaponsReducer = createReducer(
  initialState,
  on(
    WeaponsActions.loadWeapon,
    WeaponsActions.loadWeapons,
    WeaponsActions.createWeapon,
    WeaponsActions.updateWeapon,
    WeaponsActions.deleteWeapon,
    setLoading
  ),
  on(
    WeaponsActions.loadWeaponFailure,
    WeaponsActions.loadWeaponsFailure,
    WeaponsActions.createWeaponFailure,
    WeaponsActions.updateWeaponFailure,
    WeaponsActions.deleteWeaponFailure,
    setFailure
  ),
  on(WeaponsActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(WeaponsActions.loadWeaponsSuccess, (state, { weapons }) =>
    weaponsAdapter.setAll(weapons, { ...state, loaded: true })
  ),
  on(WeaponsActions.loadWeaponsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(WeaponsActions.selectWeapon, (state, { weaponId }) => ({
    selectedId: weaponId,
    ...state,
  })),
  on(WeaponsActions.createWeaponSuccess, (state, { weapon }) =>
    weaponsAdapter.addOne(weapon, { ...state, loaded: true })
  ),
  on(
    WeaponsActions.updateWeaponSuccess,
    (state, { weapon: { id, ...restWeapon } }) =>
      weaponsAdapter.updateOne(
        { id, changes: { ...restWeapon } },
        { ...state, loaded: true }
      )
  ),
  on(WeaponsActions.deleteWeaponSuccess, (state, { id }) =>
    weaponsAdapter.removeOne(id, { ...state, loaded: true })
  )
);

export function weaponsReducer(
  state: WeaponsState | undefined,
  action: Action
) {
  return _weaponsReducer(state, action);
}
