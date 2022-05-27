<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Allow: GET, POST, OPTIONS, PUT, DELETE");

    require("conexion.php");
    $conexion=retornarConexion();
    $datos = [];
    if($conexion->connect_error){
        print "Fallo al conectar con la base de datos. ".$conexion->connect_error;
    }else{
        $sql = 'SELECT * FROM rutinas';
        $resultados=mysqli_query($conexion,$sql) or die(mysqli_error());
        while ( $fila = mysqli_fetch_array($resultados, MYSQLI_ASSOC))
            {
            $datos[]=$fila;
            }

        echo(json_encode($datos));
              
        mysqli_close($conexion);
    }

?>

