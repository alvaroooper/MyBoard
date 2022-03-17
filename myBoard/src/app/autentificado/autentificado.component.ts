import { Component, OnInit } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-autentificado',
  templateUrl: './autentificado.component.html',
  styleUrls: ['./autentificado.component.css']
})
export class AutentificadoComponent implements OnInit {

  user={nombre:''}
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    //Obtener el nombre del usuario
    this.user = {
      nombre: this.route.snapshot.params['nombre'],
    }
  }

}
 
