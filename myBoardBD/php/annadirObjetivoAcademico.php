<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  $idUsuario = $params[0];
  $titulo = $params[1];
  $descripcion = $params[2];
  $fecha = $params[3];
  $metodo = $params[4];
  require("conexion.php");
  $con=retornarConexion();
  

  mysqli_query($con," INSERT INTO objetivos(`id`, `idUsuario`, `titulo`, `descripcion`, `fecha`, `idMet`) VALUES 
                   (NULL, '$idUsuario', '$titulo', '$descripcion', '$fecha', '$metodo')");
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>