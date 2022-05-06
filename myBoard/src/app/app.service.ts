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
  selectUsuarioCorreo(correo: any) {
    return this.http.get(`${this.url}seleccionarUsuarioCorreo.php?correo=${correo}`);
  }
  insertUsuario(usuario:any) {
    return this.http.post(`${this.url}annadirUsuario.php`, JSON.stringify(usuario));    
  }
  selectIdUsuario(nombre: any){
    return this.http.get(`${this.url}seleccionarIdUsuario.php?nombre=${nombre}`)
  }

  selectObjetivos(idUsuario: any) {
    return this.http.get(`${this.url}selectObjetivos.php?idUsuario=${idUsuario}`);
  }
  insertObjetivo(objetivo: any) {
    return this.http.post(`${this.url}annadirObjetivo.php`, JSON.stringify(objetivo));
  }
  deleteObjetivo(id: any){
    return this.http.get(`${this.url}eliminarObjetivo.php?id=${id}`)
  }
}
