import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Weapon } from '@tools/api-interfaces';
import { mapTo } from 'rxjs/operators';

export const BASE_URL = 'https://db-30x30.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class WeaponsService {
  private model = 'weapons';
  constructor(private httpClient: HttpClient) {}

  all() {
    return this.httpClient.get<Weapon[]>(this.getUrl());
  }

  find(id: string) {
    return this.httpClient.get<Weapon>(this.getUrlById(id));
  }

  create(weapon: Weapon) {
    return this.httpClient.post<Weapon>(this.getUrl(), weapon);
  }

  update(weapon: Weapon) {
    return this.httpClient.patch<Weapon>(this.getUrlById(weapon.id), weapon);
  }

  delete(weaponId: string) {
    return this.httpClient
      .delete<string>(this.getUrlById(weaponId))
      .pipe(mapTo(weaponId));
  }

  private getUrl() {
    return `${BASE_URL}${this.model}`;
  }

  private getUrlById(id: string) {
    return `${this.getUrl()}/${id}`;
  }
}
