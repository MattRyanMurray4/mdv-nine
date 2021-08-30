import { Component } from '@angular/core';

@Component({
  selector: 'tools-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Tools-Application';
  links = [
    { path: '/', icon: 'home', title: 'Login' },
    { path: 'weapons', icon: 'view_list', title: 'Weapons-List' },
  ];
}
