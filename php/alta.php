<?php
    $json=file_get_contents('php://input');
    $competicion=json_decode($json);
    echo file_put_contents("../competiciones/".$competicion->nombre.".json", $json);