import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myboard';

  mostrar(valido: any){
    console.log("a")
    console.log("3" +valido)
  }
}


