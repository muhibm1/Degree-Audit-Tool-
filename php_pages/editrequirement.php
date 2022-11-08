<?php
$sql_inst = new mysqli("127.0.0.1", "adminapi", "adminPassword", "cs_gr");
if($sql_inst->connect_error){
    exit('could not connect');
}

$req_name = $_GET['n'];
$req_gpa = $_GET['gpa'];

$req = "UPDATE requirements SET requirement_gpa=? WHERE requirement_name=?";
$query = $sql_inst->prepare($req);
$query->bind_param("ss", $req_gpa, $req_name);
$query->execute();
$query->close();
?>