import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PrincipalComponent } from './inicio/principal/principal.component';
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
    path: 'inicio',
    component: PrincipalComponent
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
