<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  $nombre = $params->nombre;
  $correo = $params->correo;
  $contrasenna = $params->contrasenna;
  $sumacontrasenna = $contrasenna.$nombre."camino";
  $contrasenna = md5($sumacontrasenna);
  require("conexion.php");
  $con=retornarConexion();
  

  mysqli_query($con,"insert into usuarios(nombre,correo,contrasenna) values
                  ('$nombre','$correo','$contrasenna')");
    

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';
  $response->mensaje = $params->nombre;

  header('Content-Type: application/json');
  echo json_encode($response);  
?>