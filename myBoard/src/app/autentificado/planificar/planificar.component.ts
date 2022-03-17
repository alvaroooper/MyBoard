import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import listadePlanificaciones from 'src/assets/json/planificaciones.json';
@Component({
  selector: 'app-planificar',
  templateUrl: './planificar.component.html',
  styleUrls: ['./planificar.component.css']
})
export class PlanificarComponent implements OnInit {

  //Obtener las planificaciones del JSON
  planificaciones: any = listadePlanificaciones;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

}
