import { createAction, props } from '@ngrx/store';
import { Weapon } from '@tools/api-interfaces';

export const init = createAction('[Weapons Page] Init');

// load all

export const loadWeapons = createAction('[Weapons] Load All Weapons');

export const loadWeaponsSuccess = createAction(
  '[Weapons] Load Weapons Success',
  props<{ weapons: Weapon[] }>()
);

export const loadWeaponsFailure = createAction(
  '[Weapons] Load Weapons Failure',
  props<{ error: any }>()
);

// load singular

export const loadWeapon = createAction(
  '[Weapon] Load A Weapon',
  props<{ id: string }>()
);
export const loadWeaponSuccess = createAction(
  '[Weapon] Load Weapon Success',
  props<{ weapon: Weapon }>()
);
export const loadWeaponFailure = createAction(
  '[Weapon] Load Weapon Failure',
  props<{ error: any }>()
);

// select

export const selectWeapon = createAction(
  '[Weapon] Select A Weapon',
  props<{ weaponId: string }>()
);

// create

export const createWeapon = createAction(
  '[Weapon] Create A Weapon',
  props<{ weapon: Weapon }>()
);

export const createWeaponSuccess = createAction(
  '[Weapon] Created Weapon Success',
  props<{ weapon: Weapon }>()
);

export const createWeaponFailure = createAction(
  '[Weapon] Created Weapon Failure',
  props<{ error: any }>()
);

// update

export const updateWeapon = createAction(
  '[Weapon] Update A Weapon',
  props<{ weapon: Weapon }>()
);

export const updateWeaponSuccess = createAction(
  '[Weapon] Updated Weapon Success',
  props<{ weapon: Weapon }>()
);

export const updateWeaponFailure = createAction(
  '[Weapon] Updated Weapon Failure',
  props<{ error: any }>()
);

// delete

export const deleteWeapon = createAction(
  '[Weapon] Delete A Weapon',
  props<{ weapon: Weapon }>()
);

export const deleteWeaponSuccess = createAction(
  '[Weapon] Deleted Weapon Success',
  props<{ id: string }>()
);

export const deleteWeaponFailure = createAction(
  '[Weapon] Deleted Weapon Failure',
  props<{ error: any }>()
);
