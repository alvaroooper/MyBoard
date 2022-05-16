import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministrarComponent } from './administrar/administrar.component';



@NgModule({
  declarations: [
    AdministrarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [AdministrarComponent]
})
export class AdminModule { }
