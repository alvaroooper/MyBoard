import { Component, OnInit, ViewChild } from '@angular/core';
import {ThemePalette} from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/app.service';
import {Md5} from 'ts-md5/dist/md5';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import{Camera,CameraResultType,CameraSource}from'@capacitor/camera';
import{DomSanitizer,SafeResourceUrl}from'@angular/platform-browser';


//formulario
import { FormGroup, FormControl, Validators } from '@angular/forms';

//para hacer la llamada de subir
import { HttpClient } from '@angular/common/http';

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

  public dataUrlImage: any;
  photo!:SafeResourceUrl;
  //Variables para la barra lateral
  asideFlag:boolean=true;
  @ViewChild('aside') aside:any;
  
  //url donde estan las fotos del servidor
  urlFotos = 'http://myboard.site/myBoardBD/img/';
  //nombre de la foto seleccionada en el servidor
  nombreArchivo = '';
  foto: any

  //Variables para camara
  
  constructor(private route: ActivatedRoute, private appService: AppService, private router: Router, private http: HttpClient, private sanitizer:DomSanitizer) { }
  

  ngOnInit(): void {
    //Obtener el nombre del usuario
    this.user = {nombre: this.route.snapshot.params['nombre']}
    this.obtenerIdUsuario(this.user.nombre)
    this.dataUrlImage=localStorage.getItem('photo')

    
  }

   //Obtener el id del usurario y cargar los objetivos que le corresponden
   obtenerIdUsuario(nombre: string){
    this.appService.selectIdUsuario(nombre).subscribe((result:any) => {
      let id = result[0][0]
      this.idUsuario=id
      this.seleccionarFotoBD(this.idUsuario)
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
        text: 'La contraseña debe tener entre 5 y 30 caracteres',
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
    if(con.length >= 5 && con.length <= 30){
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


  /**
   * SUBIR FOTO AL SERVIDOR Y A LA BD
   */

  //subir la foto
  myForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  //Funcion realizada al seleccionar un archivo para subir
  onFileSelected(event: any) {
    //archivo que recojo
    const file: File = event.target.files[0];
    if (file) {
      //nombre del archivo
      this.nombreArchivo = file.name;
      //formato
      const formData = new FormData();
      formData.append("thumbnail", file);
      //subir el archivo al php
      const upload$ = this.http.post("http://myboard.site/myBoardBD/php/subirFotos.php", formData);
      upload$.subscribe();
    }
  }
  //valor retornado en caso de que falte el archivo
  get f() {
    return this.myForm.controls;
  }
  //cuando cambia el input del archivo
  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.myForm.patchValue({
        fileSource: file
      });
    }
  }

   //subir la foto
   submit() {
    const formData = new FormData();
    console.log(this.myForm.get('fileSource')?.value);
    
    formData.append('file', this.myForm.get('fileSource')?.value);
    this.http.post('http://myboard.site/myBoardBD/php/subirFotos.php', formData).subscribe((datos: any) => {
      if (datos['mensaje']) {

        this.foto = datos['nombreCompleto']
        let subFot = [this.idUsuario, this.foto]
        this.appService.subirFotoBD(subFot).subscribe((datos:any) => { //Lamar al servicio de subi fotos
          Swal.fire({
            title: 'Se ha cambiado su foto de perfil',
            icon: 'success',
          })
        })
      } else {
        Swal.fire({
          title: 'El archivo debe ser una imagen',
          icon: 'error',
        })
      }
    })
  }

  //Seleccionar foto
  seleccionarFotoBD(id: string){
    this.appService.seleccionarFotoBD(id).subscribe((result:any) => {      
      this.foto = result[0][0]
    })
  }

  //Sacar foto con la camara del dispositivo
/*
  async takePicture(){

    const image=await Camera.getPhoto({
      quality:100,
      allowEditing:false,
      resultType:CameraResultType.Uri,
      source:CameraSource.Camera
    });
    this.dataUrlImage=image;
    console.log(this.dataUrlImage);
    
    
    var imageUrl = image.webPath;
    this.foto = imageUrl
  console.log(imageUrl);
  
    this.dataUrlImage=image.dataUrl;
    localStorage.setItem('photo',this.dataUrlImage)
    const body={
      photo:this.dataUrlImage,
      id:this.idUsuario
    }
    this.photo=this.sanitizer.bypassSecurityTrustResourceUrl(image &&(this.dataUrlImage))

  }     
  */
}


 
