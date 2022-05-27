import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {
  usuarios: any = []
  objetivosUsr: any = []
  verOb!: boolean
  idUsuario!: string
  constructor(private appService: AppService, private router: Router) { }
  

  ngOnInit(): void {
    this.seleccionarTodosUsuarios()
  }

  //Obtiene todos los usuarios y lo guarda en un array
  seleccionarTodosUsuarios() {
    this.appService.selectTodosUsuarios().subscribe((result:any) => {
      this.usuarios = result
      
    });
  }

  //Selecciona todos los objetivos dado el id de un usuario
  seleccionarObjetivos(id: any){
    this.idUsuario = id
    this.verOb = true
    this.appService.selectObjetivos(id).subscribe((datos:any) => {
      this.objetivosUsr = datos
    })
  }

  //Elimina el usuario en el que se encuentra el botón de eliminar
  eliminarUsuario(id: any){
    //Pregunta borrar
    Swal.fire({
      title: `¿Estás seguro?`,
      text: `Esto eliminará el usuario`,
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
        this.appService.eliminarUsuario(id).subscribe((datos:any) => {
          if (datos['resultado']=='OK') {
            //Mostrar que se ha borrado
            Swal.fire({
              title: `Usuario eliminado`,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed){
                this.seleccionarTodosUsuarios()
                this.seleccionarObjetivos(id)
              }
            })     
          }
        })
      }
    }) 
  }

  //Elimina el objetivo seleecionado del usuario seleccionado previamente
  eliminarObjetivo(id: any) {
    //Pregunta borrar
    Swal.fire({
      title: `¿Estás seguro?`,
      text: `Esto eliminará el objetivo`,
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
              title: `Objetivo eliminado`,
              icon: 'success',
              confirmButtonText: 'Aceptar',
            }).then((result) => {
              if (result.isConfirmed){
                this.seleccionarObjetivos(this.idUsuario)
              }
            })     
          }
        })
      }
    })   
  }
  //Volver a la página de la portada
  salir(){
    this.router.navigate([`/portada`]) 
  }
}
