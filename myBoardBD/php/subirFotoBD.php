<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  $params = json_decode($json);
  $idUsuario = $params[0];
  $foto = $params[1];
  require("conexion.php");
  $con=retornarConexion();
  

  mysqli_query($con,"UPDATE `usuarios` SET `foto`= '$foto' WHERE id = $idUsuario");
    

  class Result {}

  $response = new Result();
  $response->resultado = 'OK';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>