import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url='http://localhost:80/myBoardBD/';

  constructor(private http: HttpClient) { }

  selectTodos() {
    return this.http.get(`${this.url}recuperartodos.php`);
  }
  selectUsuario(nombre: any) {
    return this.http.get(`${this.url}seleccionarUsuario.php?nombre=${nombre}`);
  }
  insertUsuario(articulo:any) {
    return this.http.post(`${this.url}annadirUsuario.php`, JSON.stringify(articulo));    
  }

  selectObjetivos(nombre: any) {
    return this.http.get(`${this.url}selectObjetivos.php?nombre=${nombre}`);
  }
  insertObjetivo(objetivo: any) {
    return this.http.post(`${this.url}annadirObjetivo.php`, JSON.stringify(objetivo));
  }
  deleteObjetivo(id: any){
    return this.http.get(`${this.url}eliminarObjetivo.php?id=${id}`)
  }
}
