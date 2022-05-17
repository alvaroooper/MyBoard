import { Component, OnInit, ViewChild } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import {Md5} from 'ts-md5/dist/md5';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-autentificado',
  templateUrl: './autentificado.component.html',
  styleUrls: ['./autentificado.component.css']
})
export class AutentificadoComponent implements OnInit {
  user={nombre:''}
  idUsuario!: string
  contrasennaActual!: string
  cambiarContrasenna1!: string
  cambiarContrasenna2!: string
  correo!: string
  constructor(private route: ActivatedRoute, private appService: AppService, private router: Router) { }
  asideFlag:boolean=true;
  @ViewChild('aside') aside:any;

  ngOnInit(): void {
    //Obtener el nombre del usuario
    this.user = {
      nombre: this.route.snapshot.params['nombre'],
    }
    this.obtenerIdUsuario(this.user.nombre)
  }

   //Obtener el id del usurario y cargar los objetivos que le corresponden
   obtenerIdUsuario(nombre: string){
    this.appService.selectIdUsuario(nombre).subscribe((result:any) => {
      let id = result[0][0]
      this.idUsuario=id
    })
  }
  //Función para mostrar barra lateral al pulsar en el usuario
  handleAside(){
    if(this.asideFlag){     
      // operación vewchild dom   
      this.aside.nativeElement.style.transform = 'translate(0,0)';
      this.aside.nativeElement.style.display = 'block';
      this.asideFlag = false;
    }else{
      this.aside.nativeElement.style.transform = 'translate(100%,0)';
      this.aside.nativeElement.style.display = 'none';
      this.asideFlag = true;
    }
  }

  //Comprobar que se cumplen los requistos para cambiar la contraseña
  comprobarContrasennas(){
    const md5 = new Md5();
    var conAct = md5.appendStr(this.contrasennaActual+this.user.nombre+"camino").end();

    if (this.validarContrasenna(this.cambiarContrasenna1) == false) { //Comprobar complejidad contraseña
      Swal.fire({
        title: 'Contraseña no válida',
        text: 'La contraseña debe tener entre 5 y 15 caracteres',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })         
    } else {
      if (this.validarContrasennaIgual(this.cambiarContrasenna1) == false){ //Comprobar contraseñas coincidentes    
        Swal.fire({
          title: 'Las contraseñas no coinciden',
          text: 'Escriba la misma contraseña en las dos',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
      } else {
        this.appService.selectUsuario(this.user.nombre).subscribe((datos:any) => {
          let contrasenna = datos[0][3]
            if (contrasenna == conAct){  
              this.cambioContrasenna(this.cambiarContrasenna1)
            } else {
              //Mensaje de error si las contraseñas no coinciden
              Swal.fire({
                title: 'Contraseña actual incorrecta',
                text: 'Introduzca su contraseña actual',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              })
            } 
        })
      } 
    }
  }

  //Comprobar que se cumplen los requistos para cambiar el correo
  comprobarCorreo(){
    const md5 = new Md5();
    var conAct = md5.appendStr(this.contrasennaActual+this.user.nombre+"camino").end();

    if (this.validarCorreo(this.correo) == false) { //Comprobar complejidad contraseña
      Swal.fire({
        title: 'Correo no válido',
        text: 'El correo debe tener un "@" y un "." ',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })         
    } else {
      this.appService.selectUsuarioCorreo(this.correo).subscribe((datos:any) => {
        let correo = datos[0][2]
        if (correo == this.correo){ //Comprobar si existe el correo
          Swal.fire({
            title: `El correo ${this.correo} ya existe`,
            text: 'Pruebe con otro correo',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          })
        } else {

          this.appService.selectUsuario(this.user.nombre).subscribe((datos:any) => {
            let contrasenna = datos[0][3]
              if (contrasenna == conAct){  
                this.cambioCorreo(this.correo)
              } else {
                //Mensaje de error si las contraseñas no coinciden
                Swal.fire({
                  title: 'Contraseña actual incorrecta',
                  text: 'Introduzca su contraseña actual',
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                })
              } 
          })
          
        }
      })
    }
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
    if (con == this.cambiarContrasenna2){
      valida = true
    }
    return valida;
  }

  //Cambiar contraseña
  cambioContrasenna(conCamb: any){
    let cambCon = [this.idUsuario, this.user.nombre, conCamb]
    this.appService.cambiarContrasenna(cambCon).subscribe((datos:any) => { 
      Swal.fire({
        title: 'Contraseña cambiada',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    })
  }

  //Comprobar requisitos de complejidad del correo
  validarCorreo(correo: any) {
    var valido = /\S+@\S+\.\S+/;
    return valido.test(correo);
  }

  //Cambiar correo
  cambioCorreo(correo: any){
    let cambCorr = [this.idUsuario, correo]
    this.appService.cambiarCorreo(cambCorr).subscribe((datos:any) => { 
      Swal.fire({
        title: 'Correo cambiado',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
    })
  }

  //Salir a la página principal
  salir(){
    this.router.navigate([`/portada`]) 
  }

  //Llama a eliminar con el id del usuario a eliminar
  idParaEliminar(){
    this.eliminarUsuario(this.idUsuario)
  }

  //Elimiar la cuenta
  eliminarUsuario(id: any){
    //Pregunta borrar
    Swal.fire({
      title: `¿Estás seguro?`,
      text: `Esto eliminará la cuenta`,
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
            }) .then(() => {
              this.salir()
            })
          }
        })
      }
    }) 
  }

}
 
