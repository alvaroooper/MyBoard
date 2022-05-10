import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-objetivo-academico',
  templateUrl: './objetivo-academico.component.html',
  styleUrls: ['./objetivo-academico.component.css']
})
export class ObjetivoAcademicoComponent implements OnInit {

  objetivos: any = []
  idUsuario!: string;
  @Input() nombre: any;
  @Input() valor: any
  @Output() outputObjetivos = new EventEmitter()
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.obtenerIdUsuario(this.nombre["nombre"])
  }

  //Obtiene los objetivos académicos del usuario
  selectObjetivo(idUsuario: string) {
    this.objetivos = []
    this.appService.selectObjetivosAcademicos(idUsuario).subscribe((result:any) => {
      this.objetivos = result
      this.outputObjetivos.emit(this.objetivos)
    });
  }
  //Elimina el objetivo seleccionado en el array
  borrarObjetivoArray ( arr: any, item:any ) {
    var i = arr.indexOf( item );
    arr.splice( i, 1 );
    this.selectObjetivo(this.idUsuario)
  }
  
  //Recoge el id del objetivo a borrar y llama la la función de borrar
  recogerObjetivo(){
    let id = this.valor.id
    this.deleteObjetivo(id)
    this.selectObjetivo(this.idUsuario)
  }
  obtenerIdUsuario(nombre: string){
    this.appService.selectIdUsuario(nombre).subscribe((result:any) => {
      let id = result[0][0]
      this.idUsuario=id
    })
  }
  //Pregunta si se está seguro de borrar y si se acepta se borra de la BD
  deleteObjetivo(id: any) {
    //Pregunta borrar
    Swal.fire({
      title: `¿Quieres borrar el objetivo: "${this.valor.titulo}"?`,
      text: `Esta acción es irreversible`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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
              title: `Eliminado.`,
              text: `El objetivo "${this.valor.titulo}" se ha eliminado con éxito.`,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed){
                this.borrarObjetivoArray( this.objetivos, id )
                this.selectObjetivo(this.idUsuario)
                this.outputObjetivos.emit(this.objetivos)
              }
            })     
          }
        })
      }
    })   
  }
}
