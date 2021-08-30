import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Weapon } from '@tools/api-interfaces';

@Component({
  selector: 'tools-weapon-details',
  templateUrl: './weapon-details.component.html',
  styleUrls: ['./weapon-details.component.scss'],
})
export class WeaponDetailsComponent {
  currentWeapon: Weapon;
  originalName: string;

  @Input() set weapon(value: Weapon | null) {
    if (value) this.originalName = value.name;
    this.currentWeapon = Object.assign({}, value);
  }
  @Input() form: FormGroup;

  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();

  save(weapon: Weapon) {
    this.saved.emit(weapon);
  }

  cancel() {
    this.cancelled.emit();
  }

  saveForm(formDirective: FormGroupDirective) {
    if (formDirective.invalid) return;
    this.saved.emit(formDirective.value);
    formDirective.resetForm();
  }
}
