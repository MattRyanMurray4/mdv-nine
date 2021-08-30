import {
  actionTypeNamePastTense,
  actionTypeNamePresentTense,
  getActionType,
  NotifyService,
} from '@tools/core-data';
import { WeaponsService } from '@tools/core-data';
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import {
  loadWeaponSuccess,
  loadWeapon,
  loadWeaponFailure,
  loadWeapons,
  loadWeaponsFailure,
  loadWeaponsSuccess,
  createWeapon,
  createWeaponFailure,
  createWeaponSuccess,
  updateWeapon,
  updateWeaponFailure,
  updateWeaponSuccess,
  deleteWeapon,
  deleteWeaponFailure,
  deleteWeaponSuccess,
} from './weapons.actions';

import * as WeaponsActions from './weapons.actions';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class WeaponsEffects {
  loadWeapon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWeapon),
      switchMap(({ id }) =>
        this.weaponsService.find(id).pipe(
          map((weapon) => loadWeaponSuccess({ weapon })),
          catchError((error) => of(loadWeaponFailure({ error })))
        )
      )
    )
  );

  loadWeapons$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadWeapons),
      switchMap(() =>
        this.weaponsService.all().pipe(
          map((weapons) => loadWeaponsSuccess({ weapons })),
          catchError((error) => of(loadWeaponsFailure({ error })))
        )
      )
    )
  );

  createWeapon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createWeapon),
      switchMap(({ weapon }) =>
        this.weaponsService.create(weapon).pipe(
          map((weapon) => createWeaponSuccess({ weapon })),
          catchError((error) => of(createWeaponFailure({ error })))
        )
      )
    )
  );

  updateWeapon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateWeapon),
      switchMap(({ weapon }) =>
        this.weaponsService.update(weapon).pipe(
          map((weapon) => updateWeaponSuccess({ weapon })),
          catchError((error) => of(updateWeaponFailure({ error })))
        )
      )
    )
  );

  deleteWeapon$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteWeapon),
      switchMap(({ weapon }) =>
        this.weaponsService.delete(weapon.id).pipe(
          map((id) => deleteWeaponSuccess({ id })),
          catchError((error) => of(deleteWeaponFailure({ error })))
        )
      )
    )
  );

  weaponSuccessNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateWeaponSuccess, createWeaponSuccess, deleteWeaponSuccess),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Weapons ${actionTypeNamePastTense[actionType]} Successfully!`
          );
        })
      ),
    { dispatch: false }
  );

  weaponFailureNotifications$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(updateWeaponFailure, createWeaponFailure, deleteWeaponFailure),
        tap((action) => {
          const actionType = getActionType(action.type);
          this.notify.notification(
            `Failed to ${actionTypeNamePresentTense[actionType]} Weapons. Please try again.`
          );
        })
      ),
    { dispatch: false }
  );

  constructor(
    private readonly actions$: Actions,
    private notify: NotifyService,
    private weaponsService: WeaponsService
  ) {}
}
