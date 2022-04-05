import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {
  objetivos: any = []
  idUsuario!: string;
  @Input() valor: any;
  constructor(private appService: AppService) { }

  ngOnInit(): void {   
    let nombre = this.valor["nombre"]
    this.obtenerIdUsuario(nombre)
    

  }
  //Obtener el id del usurario
  obtenerIdUsuario(nombre: string){
    this.appService.selectIdUsuario(nombre)
    .subscribe((result:any) => {
      let id = result[0][0]
      this.idUsuario=id
      this.selectObjetivo(this.idUsuario)
    })
  }
  //Obtener los objetivos de un usuario
  selectObjetivo(idUsuario: string) {
    this.appService.selectObjetivos(idUsuario)
    .subscribe((result:any) => {
      this.objetivos = result
    });
  }
  obtenerObjetivos(objetivos: any){
    this.objetivos = objetivos
  }
 
}
