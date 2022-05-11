import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})

export class FormularioComponent implements OnInit {
  idUsuario!: string;
  titulo!: string;
  descripcion!: string;
  fecha!: any;
  /*objetivos: any = [];*/
  //Opciones de objetivos que aparecerán en la lista desplegable para crear objetivos
  tipos = [
    {valor:'Sin especificar', muestraValor:'Sin especificar'},
    {valor:'Academico', muestraValor:'Académico'},
    {valor:'Personal', muestraValor:'Personal'},
    {valor:'Fisico', muestraValor:'Físico'}
  ]
  tipo: string = this.tipos[0].valor;

  @Input() nombre: any;
  @Output() outputObjetivos = new EventEmitter()
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.obtenerIdUsuario(this.nombre["nombre"])
  }

  //Obtener los Objetivos de la BD de un usuario
  /*
  selectObjetivo(nombre: string) {
    this.appService.selectObjetivos(nombre)
    .subscribe((result:any) => {
      this.objetivos = result
      this.outputObjetivos.emit(this.objetivos)
    });
  }
  */
  //Obtener el id del usurario
  obtenerIdUsuario(nombre: string){
    this.appService.selectIdUsuario(nombre).subscribe((result:any) => {  
      let id = result[0][0]
      this.idUsuario=id
    })
  }

  //Obtiene los datos del formulario y añade dichos datos a un array, enviándolo al componente padre
  recogerNuevoObjetivo(){
    let idUsuario = this.idUsuario
    let titulo = this.titulo
    let tipo = this.tipo
    let descripcion = this.descripcion
    let fecha = new Date(this.fecha)
    let fechaFin =""
    if (titulo==null){
      titulo= "Sin título"
    }
    if (descripcion==null){
      descripcion= "Sin especificar"
    }
    
    if (this.fecha==null || (this.fecha[0]==undefined && this.fecha[1]==undefined && this.fecha[2]==undefined)){
      fechaFin = "Sin fecha límite"
    } else {
      fechaFin = this.fEspanna(fecha)
    }
    let objetivo = [idUsuario, titulo, descripcion, fechaFin] //Objeto con los datos introducidos

    //En función del tipo seleccionado llama a la función correspondiente de insertar objetivo
    switch(tipo){
      case "Academico":
        this.insertObjetivoAcademico(objetivo);
        break;
      case "Personal":
        this.insertObjetivoPersonal(objetivo);
        break;
      case "Fisico":
        this.insertObjetivoFisico(objetivo);
        break;
      default:
        Swal.fire({
          title: 'Tipo de objetivo no válido',
          text: 'Seleccione uno de la lista',
          icon: 'error',
          confirmButtonText: 'Aceptar'
        })
    }
  }

  //Recoge una fecha y devuelve un string con la fecha en formato español
  fEspanna(fecha: Date){
    let dias = ['Lunes','Martes','Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    let meses =['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let nomDiaSem = dias[fecha.getDay()-1]; //Menos uno para que el array empiece por lunes
    let nomMes = meses[fecha.getMonth()];

    return nomDiaSem + ", " + fecha.getDate() + " de " + nomMes + " de " + fecha.getFullYear();
  }

  //Inserta un nuevo objetivo en la BD
  insertObjetivo(objetivo: any) {
    this.appService.insertObjetivo(objetivo).subscribe((datos:any) => { 
      //this.selectObjetivo(objetivo[0]) 
      this.outputObjetivos.emit()
    })  
  }

  //Inserta un objetivo Académico en la BD
  insertObjetivoAcademico(objetivo: any) {
    this.appService.insertObjetivoAcademico(objetivo).subscribe((datos:any) => { 
      this.outputObjetivos.emit()
    })  
  }

  //Inserta un objetivo Personal en la BD
  insertObjetivoPersonal(objetivo: any) {
    this.appService.insertObjetivoPersonal(objetivo).subscribe((datos:any) => { 
      this.outputObjetivos.emit()
    })  
  }

  //Inserta un objetivo Físico en la BD
  insertObjetivoFisico(objetivo: any) {
    this.appService.insertObjetivoFisico(objetivo).subscribe((datos:any) => { 
      this.outputObjetivos.emit() 
    })  
  }
}
