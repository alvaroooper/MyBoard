<?php
function retornarConexion() {
  $con=mysqli_connect("localhost","root","","myboard3");
  return $con;
}
?>