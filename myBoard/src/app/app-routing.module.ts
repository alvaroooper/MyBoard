import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioSesionComponent } from './inicio/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './inicio/registro/registro.component';
import { PlanificarComponent } from './autentificado/planificar/planificar.component';
import { ObjetivosComponent } from './autentificado/objetivos/objetivos.component';
import { AutentificadoComponent } from './autentificado/autentificado.component';
import { PortadaComponent } from './inicio/portada/portada.component';


const routes: Routes = [
  {
    path: '',
    component: PortadaComponent
  },
  {
    path: 'inicioSesion',
    component: InicioSesionComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
    path: 'portada',
    component: PortadaComponent
  },
  {
    path: 'autentificado/:nombre',
    component: AutentificadoComponent
  },
  {
    path:'planificar',
    component:PlanificarComponent
  },
  {
    path:'objetivos',
    component:ObjetivosComponent
  },
  {
    path:'autentificado',
    component:AutentificadoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
