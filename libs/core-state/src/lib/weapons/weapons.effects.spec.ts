import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { NxModule } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';
import { Observable } from 'rxjs';

import * as WeaponsActions from './weapons.actions';
import { WeaponsEffects } from './weapons.effects';

describe('WeaponsEffects', () => {
  let actions: Observable<Action>;
  let effects: WeaponsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        WeaponsEffects,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.inject(WeaponsEffects);
  });

  describe('init$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: WeaponsActions.init() });

      const expected = hot('-a-|', {
        a: WeaponsActions.loadWeaponsSuccess({ weapons: [] }),
      });

      expect(effects.init$).toBeObservable(expected);
    });
  });
});
