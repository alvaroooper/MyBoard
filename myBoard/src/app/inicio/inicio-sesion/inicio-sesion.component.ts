import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import { empty } from 'rxjs';

@Component({
  selector: 'app-inicio-sesion',
  templateUrl: './inicio-sesion.component.html',
  styleUrls: ['./inicio-sesion.component.css']
})
export class InicioSesionComponent implements OnInit {
  valido: any = false;
  usuarios: any;
  usr={nombre:'', contrasenna:''}

  constructor(
    private appService: AppService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }
  
  //Comprobar que los datos para iniciar sesión son correctos
  comprobarInicio(){
    const md5 = new Md5();
    var nom = this.usr.nombre;
    var con = md5.appendStr(this.usr.contrasenna+nom+"camino").end();
    
    //Obtener datos del usuario con el nombre establecido
    this.appService.selectUsuario(nom).subscribe((datos:any) => {
      
      let nombre = datos[0][1]
      let contrasenna = datos[0][3]
      if (nombre == nom){
        if (contrasenna == con){  
          this.cambiarIniciar(nombre)
        } else {
          //Mensaje de error si las contraseñas no coinciden
          Swal.fire({
            title: 'Contraseña Incorrecta',
            text: 'Introduzca la contraseña correcta',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        }
      } else {
        //Mensaje de error si el usuario no existe
        Swal.fire({
          title: 'El usuario no existe',
          text: 'Introduzca un usuario existente',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      }
    })
  }

  //Acceder a la página del usuario
  cambiarIniciar(nombre: any){
    this.valido=true
    this.router.navigate([`/autentificado/${nombre}`]) 
  }
  //https://sweetalert2.github.io/
  //https://blog.endeos.com/demo/sweetalert/index.html

  
}
