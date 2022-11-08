<?php
$sql_inst = new mysqli("127.0.0.1", "adminapi", "adminPassword", "cs_gr");
if($sql_inst->connect_error){
    exit('could not connect');
}

$courseID = $_GET['id'];
$courseName = $_GET['n'];

$req = "INSERT INTO course_list VALUES (?,?);";
$query = $sql_inst->prepare($req);
$query->bind_param("ss", $courseID, $courseName);
$query->execute();
$query->close();
?>