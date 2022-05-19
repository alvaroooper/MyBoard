<?php
function retornarConexion() {
  $con=mysqli_connect("localhost","root","","myboard");
  return $con;
}
?>