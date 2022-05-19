import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { AdministrarComponent } from './administrar/administrar.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { ContactarComponent } from './contactar/contactar.component';



@NgModule({
  declarations: [
    AdministrarComponent,
    CabeceraComponent,
    ContactarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule
  ],
  exports: [AdministrarComponent]
})
export class AdminModule { }
