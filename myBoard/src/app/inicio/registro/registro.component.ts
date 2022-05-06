import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { AppService } from 'src/app/app.service';
import { Router } from '@angular/router';
import {Md5} from 'ts-md5/dist/md5';
import { empty } from 'rxjs';

//Al buscar el correo en la base de datos busca el de un usuario que existe antes por lo que no funciona
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  valido: any = false;
  usr={nombre:'', correo:'', contrasenna:''}
  comprobar={ contrasenna:''}

  constructor(
    private appService: AppService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  
  comprobarRegistro(){ //Comprobar si los campos introducidos para registrarse son válidos
    let nom = this.usr.nombre;
    let con = this.usr.contrasenna;
    let cor = this.usr.correo;
    
    this.appService.selectUsuario(nom).subscribe((datos:any) => { //Obtener los datos de un usuario dado
        let nombre = datos[0][1]
        

        if (this.validarNombre(nom) == false){ //Comprobar la complejidad del nombre
          Swal.fire({
            title: `Nombre no válido`,
            text: 'El nombre debe tener entre 1 y 20 caracteres',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        } else {
          
          if (nombre == nom){ //Comprobar si exite el nombre
            Swal.fire({
              title: `El usuario ${nom} ya existe`,
              text: 'Pruebe con otro nombre',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            })
          } else {
            if (this.validarCorreo(cor) == false){ //Comprobar la complejidad del correo
              Swal.fire({
                title: `Correo no válido`,
                text: 'Debe contener un @ y un .',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })
            } else {
              this.appService.selectUsuarioCorreo(cor).subscribe((datos:any) => {
                let correo = datos[0][2]
                if (correo == cor){ //Comprobar si existe el correo
                  Swal.fire({
                    title: `El correo ${cor} ya existe`,
                    text: 'Pruebe con otro correo',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  })
                } else {
                  if (this.validarContrasenna(con) == false) { //Comprobar complejidad contraseña
                    Swal.fire({
                      title: 'Contraseña no válida',
                      text: 'La contraseña debe tener entre 5 y 15 caracteres',
                      icon: 'error',
                      confirmButtonText: 'Aceptar'
                    })         
                  } else {
                    if (this.validarContrasennaIgual(con) == false){ //Comprobar contraseñas coincidentes    
                      Swal.fire({
                        title: 'Las contraseñas no coinciden',
                        text: 'Escriba la misma contraseña en las dos',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                      })
                    } else {
                      this.insertUsuario(this.usr) //Se inserta el usuario una vez pasados los filtros.
                    } 
                  }
                }
              })
                
            }    
          }
        }
    }) 
  }

  //Comprobar los requisitos de complejidad del nombre
  validarNombre(nom: string){
    let valida = false
    if(nom.length >=1 && nom.length <= 20){
      valida = true
    }
    return valida;
  }

  //Comprobar requisitos de complejidad del correo
  validarCorreo(correo: any) {
    var valido = /\S+@\S+\.\S+/;
    return valido.test(correo);
  }

  //Comprobar los requisitos de complejidad de la contraseña
  validarContrasenna(con: string){
    let valida = false
    if(con.length >= 5 && con.length <= 15){
      valida = true
    }
    return valida;
  }
  
  //Comprobar que las contraseñas coincidan
  validarContrasennaIgual(con: string){
    let valida = false
    if (con == this.comprobar.contrasenna){
      valida = true
    }
    return valida;
  }
  
  //Confirmación de insertar e insertar el usuario en la BD
  insertUsuario(user: any) {
    Swal.fire({ //Mensaje de confirmación
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
        this.appService.insertUsuario(user).subscribe((datos:any) => { //Insertar el usuario en la BD
          if (datos['resultado']=='OK') {
            Swal.fire({ //Mensaje de añadido con exito
              title: `Añadido`,
              text: `El usuario ${user.nombre} se ha añadido con éxito`,
              icon: 'success',
              confirmButtonText: 'Aceptar'
            }).then((result) => {
              if (result.isConfirmed){      
                this.cambiarIniciar(user.nombre) //Ir a la página del usuario
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
