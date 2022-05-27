import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  //Volver a la página de la portada
  salir(){
    this.router.navigate([`/portada`]) 
  }
}
