<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  $id = $params[0];
  $nombre = $params[1];
  $contrasenna = $params[2];
  $sumacontrasenna = $contrasenna.$nombre."camino";
  $contrasenna = md5($sumacontrasenna);
  require("conexion.php");
  $con=retornarConexion();
  

  mysqli_query($con,'UPDATE `usuarios` SET `contrasenna`="'.$contrasenna.'" WHERE id ='.$id);
    

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>