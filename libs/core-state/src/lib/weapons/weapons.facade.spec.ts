import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';
import { NxModule } from '@nrwl/angular';
import { readFirst } from '@nrwl/angular/testing';

import * as WeaponsActions from './weapons.actions';
import { WeaponsEffects } from './weapons.effects';
import { WeaponsFacade } from './weapons.facade';
import { WeaponsEntity } from './weapons.models';
import {
  WEAPONS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './weapons.reducer';
import * as WeaponsSelectors from './weapons.selectors';

interface TestSchema {
  weapons: State;
}

describe('WeaponsFacade', () => {
  let facade: WeaponsFacade;
  let store: Store<TestSchema>;
  const createWeaponsEntity = (id: string, name = ''): WeaponsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(WEAPONS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([WeaponsEffects]),
        ],
        providers: [WeaponsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.inject(Store);
      facade = TestBed.inject(WeaponsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async () => {
      let list = await readFirst(facade.allWeapons$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      facade.init();

      list = await readFirst(facade.allWeapons$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(true);
    });

    /**
     * Use `loadWeaponsSuccess` to manually update list
     */
    it('allWeapons$ should return the loaded list; and loaded flag == true', async () => {
      let list = await readFirst(facade.allWeapons$);
      let isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(0);
      expect(isLoaded).toBe(false);

      store.dispatch(
        WeaponsActions.loadWeaponsSuccess({
          weapons: [createWeaponsEntity('AAA'), createWeaponsEntity('BBB')],
        })
      );

      list = await readFirst(facade.allWeapons$);
      isLoaded = await readFirst(facade.loaded$);

      expect(list.length).toBe(2);
      expect(isLoaded).toBe(true);
    });
  });
});
