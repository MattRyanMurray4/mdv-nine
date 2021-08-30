import { Injectable } from '@angular/core';
import { select, Store, Action } from '@ngrx/store';
import { Weapon } from '@tools/api-interfaces';

import * as WeaponsActions from './weapons.actions';
import * as WeaponsFeature from './weapons.reducer';
import * as WeaponsSelectors from './weapons.selectors';

@Injectable()
export class WeaponsFacade {
  loaded$ = this.store.pipe(select(WeaponsSelectors.getWeaponsLoaded));
  allWeapons$ = this.store.pipe(select(WeaponsSelectors.getAllWeapons));
  selectedWeapons$ = this.store.pipe(select(WeaponsSelectors.getSelected));

  constructor(private readonly store: Store) {}

  init() {
    this.store.dispatch(WeaponsActions.init());
  }

  loadWeapons() {
    return this.store.dispatch(WeaponsActions.loadWeapons());
  }

  selectWeapon(weaponId: string) {
    return this.store.dispatch(WeaponsActions.selectWeapon({ weaponId }));
  }

  createWeapon(weapon: Weapon) {
    return this.store.dispatch(WeaponsActions.createWeapon({ weapon }));
  }

  updateWeapon(weapon: Weapon) {
    return this.store.dispatch(WeaponsActions.updateWeapon({ weapon }));
  }

  deleteWeapon(weapon: Weapon) {
    return this.store.dispatch(WeaponsActions.deleteWeapon({ weapon }));
  }

  private dispatch(action: Action) {
    return this.store.dispatch(action);
  }
}
