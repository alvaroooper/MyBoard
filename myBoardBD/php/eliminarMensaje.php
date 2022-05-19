<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  $json = file_get_contents('php://input');
 
  
  $id = $_GET['id'];
  require("conexion.php");
  $con=retornarConexion();
  

  mysqli_query($con,"DELETE FROM contacto WHERE id = $id");
    
  
  class Result {}

  $response = new Result();
  $response->resultado = 'OK';

  header('Content-Type: application/json');
  echo json_encode($response);  
?>