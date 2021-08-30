import { WeaponsEntity } from './weapons.models';
import {
  weaponsAdapter,
  WeaponsPartialState,
  initialState,
} from './weapons.reducer';
import * as WeaponsSelectors from './weapons.selectors';

describe('Weapons Selectors', () => {
  const ERROR_MSG = 'No Error Available';
  const getWeaponsId = (it: WeaponsEntity) => it.id;
  const createWeaponsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as WeaponsEntity);

  let state: WeaponsPartialState;

  beforeEach(() => {
    state = {
      weapons: weaponsAdapter.setAll(
        [
          createWeaponsEntity('PRODUCT-AAA'),
          createWeaponsEntity('PRODUCT-BBB'),
          createWeaponsEntity('PRODUCT-CCC'),
        ],
        {
          ...initialState,
          selectedId: 'PRODUCT-BBB',
          error: ERROR_MSG,
          loaded: true,
        }
      ),
    };
  });

  describe('Weapons Selectors', () => {
    it('getAllWeapons() should return the list of Weapons', () => {
      const results = WeaponsSelectors.getAllWeapons(state);
      const selId = getWeaponsId(results[1]);

      expect(results.length).toBe(3);
      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getSelected() should return the selected Entity', () => {
      const result = WeaponsSelectors.getSelected(state) as WeaponsEntity;
      const selId = getWeaponsId(result);

      expect(selId).toBe('PRODUCT-BBB');
    });

    it('getWeaponsLoaded() should return the current "loaded" status', () => {
      const result = WeaponsSelectors.getWeaponsLoaded(state);

      expect(result).toBe(true);
    });

    it('getWeaponsError() should return the current "error" state', () => {
      const result = WeaponsSelectors.getWeaponsError(state);

      expect(result).toBe(ERROR_MSG);
    });
  });
});
