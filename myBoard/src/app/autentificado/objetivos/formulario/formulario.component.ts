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
    {valor:'Sin especificar', muestraValor:'Seleccione'},
    {valor:'Academico', muestraValor:'Académico'},
    {valor:'Personal', muestraValor:'Personal'},
    {valor:'Fisico', muestraValor:'Físico'}
  ]
  tipo: string = this.tipos[0].valor;
  metodos = [];
  metodo!: string;
  metodoDeId= [];
  recompensas = [];
  recompensa!: string
  recompensaDeId= [];
  rutinas = [];
  rutina!: string;
  rutinaDeId= [];

  @Input() nombre: any;
  @Output() outputObjetivos = new EventEmitter()
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.obtenerIdUsuario(this.nombre["nombre"])
  }

  //Obtener el id del usurario
  obtenerIdUsuario(nombre: string){
    this.appService.selectIdUsuario(nombre).subscribe((result:any) => {  
      let id = result[0][0]
      this.idUsuario=id
      this.obtenerAyudas()
    })
  }

  //Llama a todos los métodod de obtener ayudas
  obtenerAyudas(){
    this.obtenerMetodos()
    this.obtenerRecompensas()
    this.obtenerRutinas()
  }
  //Obtiene los métodos
  obtenerMetodos(){
    this.appService.selectMetodos().subscribe((result:any) => {  
      this.metodos = result
    })
  }
  //Obtiene las recompensas
  obtenerRecompensas(){
    this.appService.selectRecompensas().subscribe((result:any) => {  
      this.recompensas = result
    })
  }
  //Obtiene las rutinas
  obtenerRutinas(){
    this.appService.selectRutinas().subscribe((result:any) => {  
      this.rutinas = result
    })
  }

  /**
   * VISUALIZAR AYUDAS
   */

  //Obtener el id del metodo seleccionado
  obtenerIdMetodo(){
    let id = this.metodo
    if(id == null){
      Swal.fire({
        title: 'Método no seleccionado',
        text: 'Seleccione uno de la lista',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    } else {
      this.seleccionarMetodoId(id)
    }
    
  }
  //Obtiene el metodo correspondiente a un ID
  seleccionarMetodoId(id: any){
    this.appService.selectMetodoId(id).subscribe((result:any) => {  
      this.metodoDeId = result
      Swal.fire({
        title: this.metodoDeId[0][1],
        text: this.metodoDeId[0][2],
        icon: 'info',
        confirmButtonText: 'Aceptar'
      })
      
    })
  }
  //Obtener el id de la Recompensa seleccionado
  obtenerIdRecompensa(){
    let id = this.recompensa
    if(id == null){
      Swal.fire({
        title: 'Recompensa no seleccionado',
        text: 'Seleccione uno de la lista',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    } else {
      this.seleccionarRecompensaId(id)
    }
  }
  //Obtiene la Recompensa correspondiente a un ID
  seleccionarRecompensaId(id: any){
    this.appService.selectRecompensaId(id).subscribe((result:any) => {  
      this.recompensaDeId = result
      Swal.fire({
        title: this.recompensaDeId[0][1],
        text: this.recompensaDeId[0][2],
        icon: 'info',
        confirmButtonText: 'Aceptar'
      }) 
    })
  }
  //Obtener el id de la rutina seleccionado
  obtenerIdRutina(){
    let id = this.rutina
    if(id == null){
      Swal.fire({
        title: 'Rutina no seleccionado',
        text: 'Seleccione uno de la lista',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    } else {
      this.seleccionarRutinaId(id)
    }
  }
  //Obtiene la rutina correspondiente a un ID
  seleccionarRutinaId(id: any){
    this.appService.selectRutinaId(id).subscribe((result:any) => {  
      this.rutinaDeId = result
      Swal.fire({
        title: this.rutinaDeId[0][1],
        text: this.rutinaDeId[0][2],
        icon: 'info',
        confirmButtonText: 'Aceptar'
      })
    })
  }

  /**
   * INSERTAR
   */
  
  //Obtiene los datos del formulario y añade dichos datos a un array, enviándolo al componente padre
  recogerNuevoObjetivo(){
    let idUsuario = this.idUsuario
    let titulo = this.titulo
    let tipo = this.tipo
    let descripcion = this.descripcion
    let fecha = new Date(this.fecha)
    let fechaFin =""
    let metodo = this.metodo
    let recompensa = this.recompensa
    let rutina = this.rutina
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
    //Ararys con los datos correspondientes a cada tipo de objetivo
    let objetivoA = [idUsuario, titulo, descripcion, fechaFin, metodo] 
    let objetivoP = [idUsuario, titulo, descripcion, fechaFin, recompensa]
    let objetivoF = [idUsuario, titulo, descripcion, fechaFin, rutina]

    //En función del tipo seleccionado llama a la función correspondiente de insertar objetivo
    switch(tipo){
      case "Academico":
        this.insertObjetivoAcademico(objetivoA);
        break;
      case "Personal":
        this.insertObjetivoPersonal(objetivoP);
        break;
      case "Fisico":
        this.insertObjetivoFisico(objetivoF);
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
    let dias = ['Domingo','Lunes','Martes','Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    let meses =['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let nomDiaSem = dias[fecha.getDay()]; //Menos uno para que el array empiece por lunes
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
    if(objetivo[4] == null){
      Swal.fire({
        title: 'Método no seleccionado',
        text: 'Seleccione uno de la lista',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    } else {
      this.appService.insertObjetivoAcademico(objetivo).subscribe((datos:any) => { 
        this.outputObjetivos.emit()
      })  
    }
    
  }

  //Inserta un objetivo Personal en la BD
  insertObjetivoPersonal(objetivo: any) {
    if(objetivo[4] == null){
      Swal.fire({
        title: 'Recompensa no seleccionada',
        text: 'Seleccione una de la lista',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    } else {

    }
    this.appService.insertObjetivoPersonal(objetivo).subscribe((datos:any) => { 
      this.outputObjetivos.emit()
    })  
  }

  //Inserta un objetivo Físico en la BD
  insertObjetivoFisico(objetivo: any) {
    if(objetivo[4] == null){
      Swal.fire({
        title: 'Rutina no seleccionada',
        text: 'Seleccione uno de la lista',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
    } else {
      this.appService.insertObjetivoFisico(objetivo).subscribe((datos:any) => { 
        this.outputObjetivos.emit() 
      }) 
    }
     
  }
}
