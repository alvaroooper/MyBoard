import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import{Plugin,Capacitor,Plugins}from'@capacitor/core';
import{CameraResultType,CameraSource,CameraPhoto}from '@capacitor/camera';
import{FilesystemDirectory}from'@capacitor/filesystem';
const{Camera,Filesystem,Storage}=Plugins;

@Injectable({
  providedIn: 'root'
})


export class AppService {

  url='http://myboard.site:80/myBoardBD/php/'; //Ruta común para todos los PHP

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
  selectIdUsuario(nombre: any){
    return this.http.get(`${this.url}seleccionarIdUsuario.php?nombre=${nombre}`)
  }
  selectTodosUsuarios() {
    return this.http.get(`${this.url}seleccionarTodosUsuarios.php`);
  }
  /*Insertar Usuarios*/
  insertUsuario(usuario:any) {
    return this.http.post(`${this.url}annadirUsuario.php`, JSON.stringify(usuario));    
  }
  /*Eliminar usuario*/
  eliminarUsuario(id: any) {
    return this.http.get(`${this.url}eliminarUsuario.php?id=${id}`)
  }
  /*Cambiar datos del usuario*/
  cambiarContrasenna(datos:any){
    return this.http.post(`${this.url}cambiarContrasenna.php`, JSON.stringify(datos));    
  }
  cambiarCorreo(datos: any){
    return this.http.post(`${this.url}cambiarCorreo.php`, JSON.stringify(datos));    
  }
  subirFotoBD(datos:any){
    return this.http.post(`${this.url}subirFotoBD.php`, JSON.stringify(datos)); 
  }
  seleccionarFotoBD(id :any){
    return this.http.get(`${this.url}seleccionarFotoBD.php?id=${id}`);
  }

  /**
   * METODOS DE OBJETIVOS
   */

  /*Seleccionar Objetivos*/
  selectObjetivos(idUsuario: any) {
    return this.http.get(`${this.url}seleccionarObjetivos.php?idUsuario=${idUsuario}`);
  }
  selectObjetivosAcademicos(idUsuario: any) {
    return this.http.get(`${this.url}seleccionarObjetivosAcademicos.php?idUsuario=${idUsuario}`);
  }
  selectObjetivosPersonales(idUsuario: any) {
    return this.http.get(`${this.url}seleccionarObjetivosPersonales.php?idUsuario=${idUsuario}`);
  }
  selectObjetivosFisicos(idUsuario: any) {
    return this.http.get(`${this.url}seleccionarObjetivosFisicos.php?idUsuario=${idUsuario}`);
  }
  selectObjetivosCompletados(idUsuario: any) {
    return this.http.get(`${this.url}seleccionarObjetivosCompletados.php?idUsuario=${idUsuario}`);
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
    return this.http.get(`${this.url}seleccionarMetodos.php`);
  }
  selectRecompensas() {
    return this.http.get(`${this.url}seleccionarRecompensas.php`);
  }
  selectRutinas() {
    return this.http.get(`${this.url}seleccionarRutinas.php`);
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

  
  /**
   * METODOS DE CONTACTO
   */
  annadirContacto(contacto: any) {
    return this.http.post(`${this.url}annadirContacto.php`, JSON.stringify(contacto));    
  }
  seleecionarMensajes() {
    return this.http.get(`${this.url}seleccionarMensajes.php`);
  }
  eliminarMensaje(id: any) {
    return this.http.get(`${this.url}eliminarMensaje.php?id=${id}`)
  }

  /**
   * METODOS DE SACAR FOTO
   */
   public async addPhoto(){
      const capturedPhoto=await Camera['getPhoto']({
        resultType:CameraResultType.Uri,
        source:CameraSource.Camera,
        quality:100
      });
    }
}
