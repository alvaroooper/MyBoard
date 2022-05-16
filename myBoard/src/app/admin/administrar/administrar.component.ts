import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-administrar',
  templateUrl: './administrar.component.html',
  styleUrls: ['./administrar.component.css']
})
export class AdministrarComponent implements OnInit {
  usuarios: any = []
  constructor(private appService: AppService) { }

  ngOnInit(): void {
    this.selectTodosUsuarios()
  }

  selectTodosUsuarios() {
    this.appService.selectTodosUsuarios().subscribe((result:any) => {
      this.usuarios = result
      console.log(this.usuarios);
      
    });
  }

  eliminarUsuario(id: any){
    console.log(id);
    
  }
}
