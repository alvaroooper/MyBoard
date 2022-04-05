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

  //Obtener todos los usuarios
  selectTodos() {
    this.appService.selectTodos()
    .subscribe((result:any) => this.usuarios = result);
  }

  //Obtener datos de un usuario dado un nombre
  selectUsuario(nombre: string) {
    this.appService.selectUsuario(nombre)
    .subscribe((result:any) => this.usuarios = result);
  }
  
  //Comprobar que los datos para iniciar sesión son correctos
  comprobarInicio(){
    const md5 = new Md5();
    var nom = this.usr.nombre;
    var con = md5.appendStr(this.usr.contrasenna).end();
    
    //Obtener datos del usuario con el nombre establecido
    this.appService.selectUsuario(nom).subscribe((datos:any) => {
      
      let nombre = datos[0][1]
      let contrasenna = datos[0][2]

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


  //Comprobar si los campos introducidos para registrarse son válidos
  comprobarRegistro(){
    let nom = this.usr.nombre;
    let con = this.usr.contrasenna;
    //Obtener los datos de un usuario dado el nombre para ver si existe
    this.appService.selectUsuario(nom).subscribe((datos:any) => {
        let nombre = datos[0][1]
        console.log(nombre)
        console.log(nom)
        if (this.validarNombre(nom) == false){
          //Error si el nombre no cumple los requisitos de complejidad
          Swal.fire({
            title: `Nombre no válido`,
            text: 'El nombre debe tener entre 1 y 20 caracteres',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        } else {
          if (nombre == nom){
            //Error si el usuario ya existe
            Swal.fire({
              title: `El usuario ${nom} ya existe`,
              text: 'Pruebe con otro nombre',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          } else {
            if (this.validarContrasenna(con) == true) {
              this.insertUsuario(this.usr)    
            } else {
              //Error si la contraseña no cumple los requisitos de complejidad
              Swal.fire({
                title: 'Contraseña no válida',
                text: 'La contraseña debe tener entre 5 y 15 caracteres',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })
            }
          }
        }
    }) 
  }
  //Comprobar los requisitos de complejidad de la contraseña
  validarContrasenna(con: string){
    let valida = false
    if(con.length >= 5 && con.length <= 15){
      valida = true
    }
    return valida;
  }
  //Comprobar los requisitos de complejidad del nombre
  validarNombre(nom: string){
    let valida = false
    if(nom.length >=1 && nom.length <= 20){
      valida = true
    }
    return valida;
  }
  //Confirmación de insertar e insertar el usuario en la BD
  insertUsuario(user: any) {
    //Mensaje de confirmación
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Esto creará el usuario ${user.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        //Insertar el usuario en la BD
        this.appService.insertUsuario(user).subscribe((datos:any) => {
          if (datos['resultado']=='OK') {
            //Mensaje de añadido con exito
            Swal.fire({
              title: `Añadido`,
              text: `El usuario ${user.nombre} se ha añadido con éxito`,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed){
                //Ir a la página del usuario
                this.cambiarIniciar(user.nombre)
              }
            })     
          }
        });
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
