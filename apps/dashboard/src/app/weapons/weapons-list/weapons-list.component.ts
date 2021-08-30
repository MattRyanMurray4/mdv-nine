import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Weapon } from '@tools/api-interfaces';

@Component({
  selector: 'tools-weapons-list',
  templateUrl: './weapons-list.component.html',
  styleUrls: ['./weapons-list.component.scss'],
})
export class WeaponsListComponent {
  @Input() weapons: Weapon[] | null;
  @Input() readonly = false;
  @Output() selected = new EventEmitter();
  @Output() deleted = new EventEmitter();
}
