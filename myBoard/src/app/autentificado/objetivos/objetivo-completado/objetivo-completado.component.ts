import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppService } from 'src/app/app.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-objetivo-completado',
  templateUrl: './objetivo-completado.component.html',
  styleUrls: ['./objetivo-completado.component.css']
})
export class ObjetivoCompletadoComponent implements OnInit {

  objetivos: any = []
  idUsuario!: string;
  @Input() nombre: any;
  @Input() valor: any;
  @Output() outputObjetivos = new EventEmitter()
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    
  }

}
