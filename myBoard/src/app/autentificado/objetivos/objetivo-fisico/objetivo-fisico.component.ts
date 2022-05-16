import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-objetivo-fisico',
  templateUrl: './objetivo-fisico.component.html',
  styleUrls: ['./objetivo-fisico.component.css']
})
export class ObjetivoFisicoComponent implements OnInit {

  objetivos: any = []
  idUsuario!: string;
  rutinaDeId= []
  @Input() nombre: any;
  @Input() valor: any;
  @Output() outputObjetivos = new EventEmitter()
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.obtenerIdUsuario(this.nombre["nombre"])
  }
  //Obtener el id del usuario actual
  obtenerIdUsuario(nombre: string){
    this.appService.selectIdUsuario(nombre).subscribe((result:any) => {
      let id = result[0][0]
      this.idUsuario=id
    })
  }
 
  //Recoge el id del objetivo a borrar y llama la la función de borrar
  recogerObjetivoAbandonar(){
    let id = this.valor.id
    this.abandonarObjetivo(id)
  }
  //Recoge el id del objetivo a borrar y llama la la función de completar
  recogerObjetivoCompletar(){
    let id = this.valor.id
    this.completarObjetivo(id)
  }
  
 //Obtener el id de la rutina seleccionado
 obtenerIdRutina(){
  let id = this.valor["idRut"]
  this.seleccionarRutinaId(id)
}
//Obtiene la rutina correspondiente a un ID
seleccionarRutinaId(id: any){
  this.appService.selectRutinaId(id).subscribe((result:any) => {  
    this.rutinaDeId = result
    Swal.fire({
      title: this.rutinaDeId[0][1],
      text: this.rutinaDeId[0][2],
      icon: 'info',
      confirmButtonText: 'Aceptar'
    })
  })
}

  //Pregunta si se está seguro de borrar y si se acepta se borra de la BD
  abandonarObjetivo(id: any) {
    //Pregunta borrar
    Swal.fire({
      title: `¿Quieres abandonar el objetivo: "${this.valor.titulo}"?`,
      text: `Esto lo borrará y es irreversible`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      backdrop: `rgba(255, 249, 83,0.1)`,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      //Si se acepta
      if (result.isConfirmed) {
        //Se elimina de la BD
        this.appService.deleteObjetivo(id).subscribe((datos:any) => {
          if (datos['resultado']=='OK') {
            //Mostrar que se ha borrado
            Swal.fire({
              title: `Otra vez será :(`,
              text: `Has abandonado el objetivo ${this.valor.titulo} `,
              icon: 'success',
              iconColor: `rgba(255, 72, 72,0.7)`,
              confirmButtonText: 'Aceptar',
              backdrop: `rgba(255, 72, 72,0.1)`
            }).then((result) => {
              if (result.isConfirmed){
                this.outputObjetivos.emit(this.objetivos)
              }
            })     
          }
        })
      }
    })   
  }
  //Pregunta si se está seguro de borrar y si se acepta se borra de la BD
  completarObjetivo(id: any) {
    //Pregunta terminar
    Swal.fire({
      title: `¿Quieres completar el objetivo: "${this.valor.titulo}"?`,
      text: `Ya no podrás accder a el`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      backdrop: `rgba(255, 249, 83,0.1)`,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      //Si se acepta
      if (result.isConfirmed) {
        //Se elimina de la BD
        this.appService.completeObjetivo(id).subscribe((datos:any) => {
          if (datos['resultado']=='OK') {
            //Mostrar que se ha borrado
            Swal.fire({
              title: `¡Enhorabuena! :)`,
              text: `Has completado el objetivo ${this.valor.titulo} ¡Sige así!.`,
              icon: 'success',
              confirmButtonText: 'Aceptar',
              backdrop: `rgba(72, 255, 109,0.1)`
            }).then((result) => {
              if (result.isConfirmed){
                this.outputObjetivos.emit(this.objetivos)
              }
            })     
          }
        })
      }
    })   
  }

}
