<?php
$sql_inst = new mysqli("127.0.0.1", "adminapi", "adminPassword", "cs_gr");
if($sql_inst->connect_error){
    exit('could not connect');
}

$courseID = $_GET['id'];

$req = "DELETE FROM course_list WHERE courseID=?";
$query = $sql_inst->prepare($req);
$query->bind_param("s", $courseID);
$query->execute();
$query->close();
?>