import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyWeapon, Weapon } from '@tools/api-interfaces';
import { WeaponsFacade } from '@tools/core-state';
import { Observable } from 'rxjs';

@Component({
  selector: 'tools-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.scss'],
})
export class WeaponsComponent implements OnInit {
  form: FormGroup;
  weapons$: Observable<Weapon[]> = this.weaponsFacade.allWeapons$;
  selectedWeapon$: Observable<Weapon> = this.weaponsFacade.selectedWeapons$;

  constructor(
    private weaponsFacade: WeaponsFacade,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.initForm();
    this.weaponsFacade.loadWeapons();
    this.reset();
  }

  reset() {
    this.selectWeapon(emptyWeapon);
    this.form.reset();
  }

  selectWeapon(weapon: Weapon) {
    this.weaponsFacade.selectWeapon(weapon.id);
    this.form.patchValue(weapon);
  }

  createWeapon(weapon: Weapon) {
    this.weaponsFacade.createWeapon(weapon);
    this.reset();
  }

  updateWeapon(weapon: Weapon) {
    this.weaponsFacade.updateWeapon(weapon);
    this.reset();
  }

  saveWeapon(weapon: Weapon) {
    weapon.id
      ? this.weaponsFacade.updateWeapon(weapon)
      : this.weaponsFacade.createWeapon(weapon);
  }

  deleteWeapon(weapon: Weapon) {
    this.weaponsFacade.deleteWeapon(weapon);
    this.reset();
  }

  cancel() {
    this.reset();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      id: null,
      name: ['', Validators.required],
      type: ['', Validators.required],
      description: ['', Validators.required],
      famousUse: ['', Validators.required],
      effectiveRange: ['', Validators.required],
      decomissioned: [''],
    });
  }
}
