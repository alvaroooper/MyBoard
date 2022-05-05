import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './portada/portada.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PrincipalComponent } from './principal/principal.component';

import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';



@NgModule({
  declarations: [
    PortadaComponent,
    CabeceraComponent,
    PrincipalComponent,
    InicioSesionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InicioModule { }
