import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  mensaje={titulo:'',descripcion:'',correo:''}

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  comprobarContacto(){ //Comprobar si los campos introducidos para registrarse son válidos
    let cor = this.mensaje.correo;
    if (this.validarCorreo(cor) == false){ //Comprobar la complejidad del correo
      Swal.fire({
        title: `Correo no válido`,
        text: 'Debe contener un @ y un .',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      }) 
    } else {
      this.insertarContacto(this.mensaje)
    }
  }

  //Comprobar requisitos de complejidad del correo
  validarCorreo(correo: any) {
    var valido = /\S+@\S+\.\S+/;
    return valido.test(correo);
  }

  insertarContacto(mensaje: any) {
    this.appService.annadirContacto(mensaje).subscribe((datos:any) => { //Insertar el mensaje en la BD
      if (datos['resultado']=='OK') {
        Swal.fire({ //Mensaje de añadido con exito
          title: `Enviado`,
          text: `Se le contactará en brebe`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        })     
      }
    });
  }
}
