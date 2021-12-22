<?php
    $ficheros=array_diff(scandir('../../alberto/competiciones'),array('.','..'));
    $json=new stdClass();
    $json->competiciones=[];
    foreach($ficheros as $fichero){
        $trozos=explode('.',$fichero);
        array_push($json->competiciones,[$trozos[0],$fichero]);
    }
    header('Content-Type: application/json');
    echo json_encode($json);
