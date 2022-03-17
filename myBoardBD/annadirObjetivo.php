<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  $usuario = $params[0];
  $titulo = $params[1];
  $tipo = $params[2];
  $descripcion = $params[3];
  $fecha = $params[4];
  require("conexion.php");
  $con=retornarConexion();
  

  mysqli_query($con," INSERT INTO objetivos(`id`, `usuario`, `titulo`, `tipo`, `descripcion`, `fecha`) VALUES 
                   (NULL, '$usuario', '$titulo', '$tipo', '$descripcion', '$fecha')");
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>