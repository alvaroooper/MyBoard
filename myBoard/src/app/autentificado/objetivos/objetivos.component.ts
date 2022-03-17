import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {
  objetivos: any = []
  @Input() valor: any;
  constructor(private appService: AppService) { }

  ngOnInit(): void {   
    let nombre = this.valor["nombre"]
    this.selectObjetivo(nombre)
  }
  //Obtener los objetivos de un usuario
  selectObjetivo(nombre: string) {
    this.appService.selectObjetivos(nombre)
    .subscribe((result:any) => {
      this.objetivos = result
    });
  }
  obtenerObjetivos(objetivos: any){
    this.objetivos = objetivos
  }
 
}
