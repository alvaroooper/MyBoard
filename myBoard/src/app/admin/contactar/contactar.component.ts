import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-contactar',
  templateUrl: './contactar.component.html',
  styleUrls: ['./contactar.component.css']
})
export class ContactarComponent implements OnInit {

  mensajes: any = []
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.seleecionarMensajes()
  }

  seleecionarMensajes() {
    this.appService.seleecionarMensajes().subscribe((result:any) => {
      this.mensajes = result
      console.log(this.mensajes);
      
    });
  }

  eliminarMensaje(id: any){
    //Pregunta borrar
    Swal.fire({
      title: `¿Estás seguro?`,
      text: `Esto eliminará el mensaje`,
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
        this.appService.eliminarMensaje(id).subscribe((datos:any) => {
          if (datos['resultado']=='OK') {
            //Mostrar que se ha borrado
            Swal.fire({
              title: `Mensaje eliminado`,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed){
                this. seleecionarMensajes()
              }
            })     
          }
        })
      }
    }) 
  }

}
