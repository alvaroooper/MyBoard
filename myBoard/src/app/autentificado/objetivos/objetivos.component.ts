import { Component, Input, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {
  objetivos: any = []
  objetivosTotales: any = []
  objetivosAcademicos: any = []
  objetivosPersonales: any = []
  objetivosFisicos: any = []
  objetivosCompletados: any = []

  idUsuario!: string;
  @Input() valor: any;
  constructor(private appService: AppService) { }

  ngOnInit(): void {   
    let nombre = this.valor["nombre"]
    this.obtenerIdUsuario(nombre)
  }
  //Obtener el id del usurario y cargar los objetivos que le corresponden
  obtenerIdUsuario(nombre: string){
    this.appService.selectIdUsuario(nombre).subscribe((result:any) => {
      let id = result[0][0]
      this.idUsuario=id
      this.selectObjetivos()
    })
  }
  //Guardar todos los tipos de objetivos
  selectObjetivos(){
    this.selectObjetivo(this.idUsuario)
    this.selectObjetivosTotales(this.idUsuario)
    this.selectObjetivosAcademicos(this.idUsuario)
    this.selectObjetivosPersonales(this.idUsuario)
    this.selectObjetivosFisicos(this.idUsuario)
    this.selectObjetivosCompletados(this.idUsuario)
  }
  //Obtener los objetivos de un usuario
  selectObjetivo(idUsuario: string) {
    this.appService.selectObjetivos(idUsuario).subscribe((result:any) => {
      this.objetivos = result
    });
  }
  //Obtener los objetivos del usuario para ser mostrados
  selectObjetivosTotales(idUsuario: string) {
    this.appService.selectObjetivos(idUsuario).subscribe((result:any) => {
      this.objetivosTotales = result
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

  //Obtener los objetivos que ha completado el usuario
  selectObjetivosCompletados(idUsuario: string) {
    this.appService.selectObjetivosCompletados(idUsuario).subscribe((result:any) => {
      this.objetivosCompletados = result
    });
  }
  
  //Llamada desde el html para recargar los objetivos que aparecen
  obtenerObjetivos(objetivos: any){
    this.objetivos = objetivos
    this.selectObjetivos()
  }

 
}
