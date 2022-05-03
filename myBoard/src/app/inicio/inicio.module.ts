import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './portada/portada.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { PrincipalComponent } from './principal/principal.component';
import { FuncionalidadesComponent } from './principal/funcionalidades/funcionalidades.component';
import { InicioSesionComponent } from './principal/inicio-sesion/inicio-sesion.component';



@NgModule({
  declarations: [
    PortadaComponent,
    CabeceraComponent,
    PrincipalComponent,
    FuncionalidadesComponent,
    InicioSesionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InicioModule { }
