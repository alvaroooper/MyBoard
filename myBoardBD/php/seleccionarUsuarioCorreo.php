<?php 
  header('Access-Control-Allow-Origin: *'); 
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
  
  require("conexion.php");
  $con=retornarConexion();

  
  $registros=mysqli_query($con,'select * from usuarios where correo="'.$_GET["correo"].'"');
    
  if ($reg=mysqli_fetch_array($registros))  
  {
    $vec[]=$reg;
  } else {
    $vec=[""];
  }
  
  $cad=json_encode($vec);
  echo $cad;
  header('Content-Type: application/json');
?>