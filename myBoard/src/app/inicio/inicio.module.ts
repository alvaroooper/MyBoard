import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortadaComponent } from './portada/portada.component';
import { CabeceraComponent } from './cabecera/cabecera.component';

import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './registro/registro.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ContactoComponent } from './contacto/contacto.component';



@NgModule({
  declarations: [
    PortadaComponent,
    CabeceraComponent,
    InicioSesionComponent,
    RegistroComponent,
    ServiciosComponent,
    ContactoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class InicioModule { }
