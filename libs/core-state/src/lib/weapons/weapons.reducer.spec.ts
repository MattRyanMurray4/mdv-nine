import { Action } from '@ngrx/store';

import * as WeaponsActions from './weapons.actions';
import { WeaponsEntity } from './weapons.models';
import { State, initialState, reducer } from './weapons.reducer';

describe('Weapons Reducer', () => {
  const createWeaponsEntity = (id: string, name = ''): WeaponsEntity => ({
    id,
    name: name || `name-${id}`,
  });

  describe('valid Weapons actions', () => {
    it('loadWeaponsSuccess should return the list of known Weapons', () => {
      const weapons = [
        createWeaponsEntity('PRODUCT-AAA'),
        createWeaponsEntity('PRODUCT-zzz'),
      ];
      const action = WeaponsActions.loadWeaponsSuccess({ weapons });

      const result: State = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.ids.length).toBe(2);
    });
  });

  describe('unknown action', () => {
    it('should return the previous state', () => {
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
