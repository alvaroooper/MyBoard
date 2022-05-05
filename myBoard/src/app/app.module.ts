import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms';

import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CabeceraComponent } from './inicio/cabecera/cabecera.component';
import { PrincipalComponent } from './inicio/principal/principal.component';
import { PortadaComponent } from './inicio/portada/portada.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PlanificarComponent } from './autentificado/planificar/planificar.component';
import { ObjetivosComponent } from './autentificado/objetivos/objetivos.component';
import { AutentificadoComponent } from './autentificado/autentificado.component';
import { InicioSesionComponent } from './inicio/principal/inicio-sesion/inicio-sesion.component';
import { TarjetaComponent } from './autentificado/planificar/tarjeta/tarjeta.component';
import { FormularioComponent } from './autentificado/objetivos/formulario/formulario.component';
import { ObjetivoComponent } from './autentificado/objetivos/objetivo/objetivo.component';
import { CabeceraUsuarioComponent } from './autentificado/cabecera-usuario/cabecera-usuario.component';



@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    PrincipalComponent,
    InicioSesionComponent,
    PortadaComponent,
    PlanificarComponent,
    ObjetivosComponent,
    AutentificadoComponent,
    TarjetaComponent,
    FormularioComponent,
    ObjetivoComponent,
    CabeceraUsuarioComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatTabsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatDialogModule,
    MatTableModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
