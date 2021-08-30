import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@tools/material';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { RoutingModule } from './routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WeaponsComponent } from './weapons/weapons.component';
import { WeaponsListComponent } from './weapons/weapons-list/weapons-list.component';
import { WeaponDetailsComponent } from './weapons/weapon-details/weapon-details.component';
import { CoreStateModule } from '@tools/core-state';
import { UiLibraryModule } from '@tools/ui-library';
import { CoreDataModule } from '@tools/core-data';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    WeaponsComponent,
    WeaponsListComponent,
    WeaponDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CoreStateModule,
    CoreDataModule,
    UiLibraryModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
