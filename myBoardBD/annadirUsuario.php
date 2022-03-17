<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  $nombre = $params->nombre;
  $contrasenna = md5($params->contrasenna);
  require("conexion.php");
  $con=retornarConexion();
  

  mysqli_query($con,"insert into usuarios(nombre,contrasenna) values
                  ('$nombre','$contrasenna')");
    
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = $params->nombre;

  header('Content-Type: application/json');
  echo json_encode($response);  
?>