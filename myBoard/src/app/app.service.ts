import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url='http://localhost:80/myBoardBD/'; //Ruta común para todos los PHP

  constructor(private http: HttpClient) { }

  /**
   * METODOS DE USUARIOS
   */

  /*Seleccionar Usuarios*/
  selectTodos() {
    return this.http.get(`${this.url}recuperartodos.php`);
  }
  selectUsuario(nombre: any) {
    return this.http.get(`${this.url}seleccionarUsuario.php?nombre=${nombre}`);
  }
  selectUsuarioCorreo(correo: any) {
    return this.http.get(`${this.url}seleccionarUsuarioCorreo.php?correo=${correo}`);
  }
  /*Insertar Usuarios*/
  insertUsuario(usuario:any) {
    return this.http.post(`${this.url}annadirUsuario.php`, JSON.stringify(usuario));    
  }
  selectIdUsuario(nombre: any){
    return this.http.get(`${this.url}seleccionarIdUsuario.php?nombre=${nombre}`)
  }
  selectTodosUsuarios() {
    return this.http.get(`${this.url}seleccionarTodosUsuarios.php`);
  }
  eliminarUsuario(id: any) {
    return this.http.get(`${this.url}eliminarUsuario.php?id=${id}`)
  }
  cambiarContrasenna(datos:any){
    return this.http.post(`${this.url}cambiarContrasenna.php`, JSON.stringify(datos));    
  }
  cambiarCorreo(datos: any){
    return this.http.post(`${this.url}cambiarCorreo.php`, JSON.stringify(datos));    
  }

  /**
   * METODOS DE OBJETIVOS
   */

  /*Seleccionar Objetivos*/
  selectObjetivos(idUsuario: any) {
    return this.http.get(`${this.url}selectObjetivos.php?idUsuario=${idUsuario}`);
  }
  selectObjetivosAcademicos(idUsuario: any) {
    return this.http.get(`${this.url}selectObjetivosAcademicos.php?idUsuario=${idUsuario}`);
  }
  selectObjetivosPersonales(idUsuario: any) {
    return this.http.get(`${this.url}selectObjetivosPersonales.php?idUsuario=${idUsuario}`);
  }
  selectObjetivosFisicos(idUsuario: any) {
    return this.http.get(`${this.url}selectObjetivosFisicos.php?idUsuario=${idUsuario}`);
  }
  selectObjetivosCompletados(idUsuario: any) {
    return this.http.get(`${this.url}selectObjetivosCompletados.php?idUsuario=${idUsuario}`);
  }
  /*Insertar Objetivos*/
  insertObjetivo(objetivo: any) {
    return this.http.post(`${this.url}annadirObjetivo.php`, JSON.stringify(objetivo));
  }
  insertObjetivoAcademico(objetivo: any) {
    return this.http.post(`${this.url}annadirObjetivoAcademico.php`, JSON.stringify(objetivo));
  }
  insertObjetivoPersonal(objetivo: any) {
    return this.http.post(`${this.url}annadirObjetivoPersonal.php`, JSON.stringify(objetivo));
  }
  insertObjetivoFisico(objetivo: any) {
    return this.http.post(`${this.url}annadirObjetivoFisico.php`, JSON.stringify(objetivo));
  }
  /*Eliminar Objetivos*/
  deleteObjetivo(id: any){
    return this.http.get(`${this.url}eliminarObjetivo.php?id=${id}`)
  }
  /*Completar Objetivos*/
  completeObjetivo(id: any){
    return this.http.get(`${this.url}completarObjetivo.php?id=${id}`)
  }
  
  
   /**
   * METODOS DE AYUDAS PARA OBJETIVOS
   */
  selectMetodos() {
    return this.http.get(`${this.url}selectMetodos.php`);
  }
  selectRecompensas() {
    return this.http.get(`${this.url}selectRecompensas.php`);
  }
  selectRutinas() {
    return this.http.get(`${this.url}selectRutinas.php`);
  }
  
  /*Seleccionar ayuda dado un ID */
  selectMetodoId(id: any) {
    return this.http.get(`${this.url}seleccionarMetodoId.php?id=${id}`);
  }
  selectRecompensaId(id: any) {
    return this.http.get(`${this.url}seleccionarRecompensaId.php?id=${id}`);
  }
  selectRutinaId(id: any) {
    return this.http.get(`${this.url}seleccionarRutinaId.php?id=${id}`);
  }
  
}
