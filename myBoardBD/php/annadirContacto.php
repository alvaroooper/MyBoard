<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  $titulo = $params->titulo;
  $descripcion = $params->descripcion;
  $correo = $params->correo;
  require("conexion.php");
  $con=retornarConexion();
  

  mysqli_query($con,"insert into contacto(titulo,descripcion,correo) values
                  ('$titulo','$descripcion','$correo')");
    

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>