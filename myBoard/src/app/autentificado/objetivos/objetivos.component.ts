import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {
  objetivos: any = []
  objetivosAcademicos: any = []
  objetivosPersonales: any = []
  objetivosFisicos: any = []

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
      console.log(this.idUsuario);
      this.selectObjetivos()
      
    })
  }
  selectObjetivos(){
    this.selectObjetivo(this.idUsuario)
    this.selectObjetivosAcademicos(this.idUsuario)
    this.selectObjetivosPersonales(this.idUsuario)
    this.selectObjetivosFisicos(this.idUsuario)
  }
  //Obtener los objetivos de un usuario
  selectObjetivo(idUsuario: string) {
    this.appService.selectObjetivos(idUsuario).subscribe((result:any) => {
      this.objetivos = result
    });
  }
  //Obtener los objetivos Académicos de un usuario
  selectObjetivosAcademicos(idUsuario: string) {
    this.appService.selectObjetivosAcademicos(idUsuario).subscribe((result:any) => {
      this.objetivosAcademicos = result
    });
  }
  //Obtener los objetivos Personales de un usuario
  selectObjetivosPersonales(idUsuario: string) {
    this.appService.selectObjetivosPersonales(idUsuario).subscribe((result:any) => {
      this.objetivosPersonales = result
    });
  }
   //Obtener los objetivos Fisicos de un usuario
  selectObjetivosFisicos(idUsuario: string) {
    this.appService.selectObjetivosFisicos(idUsuario).subscribe((result:any) => {
      this.objetivosFisicos = result
    });
  }
  
  obtenerObjetivos(objetivos: any){
    this.objetivos = objetivos
    this.selectObjetivos()
  }
  obtenerObjetivosAcademicos(objetivosAcademicos: any){
    this.objetivosAcademicos = objetivosAcademicos
  }
 
}
