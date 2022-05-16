import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { PortadaComponent } from './inicio/portada/portada.component';
import { InicioSesionComponent } from './inicio/inicio-sesion/inicio-sesion.component';
import { RegistroComponent } from './inicio/registro/registro.component';
import { ServiciosComponent } from './inicio/servicios/servicios.component';
import { ObjetivosComponent } from './autentificado/objetivos/objetivos.component';
import { AutentificadoComponent } from './autentificado/autentificado.component';
import { AdministrarComponent } from './admin/administrar/administrar.component';



const routes: Routes = [
  {
    path: '',
    component: PortadaComponent
  },
  {
    path: 'portada',
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
    path: 'servcios',
    component: ServiciosComponent
  },
  {
    path: 'autentificado/:nombre',
    component: AutentificadoComponent
  },
  {
    path:'objetivos',
    component:ObjetivosComponent
  },
  {
    path:'autentificado',
    component:AutentificadoComponent
  },
  {
    path:'administrar/:nombre',
    component: AdministrarComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
