import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cabecera-usuario',
  templateUrl: './cabecera-usuario.component.html',
  styleUrls: ['./cabecera-usuario.component.css']
})
export class CabeceraUsuarioComponent implements OnInit {
  @Input() valor: any;
  constructor() { }

  ngOnInit(): void {
  }
  

}
