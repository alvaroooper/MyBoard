import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  titulo!: string;
  descripcion!: string;
  fecha!: any;
  objetivos: any = []
  tipos = [
    {valor:'Sin especificar', muestraValor:'Sin especificar'},
    {valor:'Académico', muestraValor:'Academico'},
    {valor:'Personal', muestraValor:'Personal'},
    {valor:'Físico', muestraValor:'Físico'}
  ]
  tipo: string = this.tipos[0].valor;
  @Input() nombre: any;
  @Output() outputObjetivos = new EventEmitter()
  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

  //Obtener los Objetivos de la BD de un usuario
  selectObjetivo(nombre: string) {
    this.appService.selectObjetivos(nombre)
    .subscribe((result:any) => {
      this.objetivos = result
      this.outputObjetivos.emit(this.objetivos)
    });
  }
  //Obtiene los datos del formulario y añade dichos datos a un array, enviándolo al componente padre
  recogerNuevoObjetivo(){
    let nombre = this.nombre["nombre"]
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
    if (this.fecha==null){
      fechaFin = "Sin fecha límite"
    } else {
      fechaFin = this.fEspanna(fecha)
    }
    let objetivo = [nombre, titulo, tipo, descripcion, fechaFin]
    
    this.insertObjetivo(objetivo)
    this.objetivos.push(objetivo)
    this.selectObjetivo(objetivo[0])
  }

  //Inserta un nuevo objetivo en la BD
  insertObjetivo(objetivo: any) {
  
    this.appService.insertObjetivo(objetivo).subscribe((datos:any) => { 
      this.selectObjetivo(objetivo[0]) 
    })  
  }

  //Recoge una fecha y devuelve un string con la fecha en formato español
  fEspanna(fecha: Date){

    let dias = ['Lunes','Martes','Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    let meses =['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    let nomDiaSem = dias[fecha.getDay()-1];
    let nomMes = meses[fecha.getMonth()];

    return nomDiaSem + ", " + fecha.getDate() + " de " + nomMes + " de " + fecha.getFullYear();
  }

}
