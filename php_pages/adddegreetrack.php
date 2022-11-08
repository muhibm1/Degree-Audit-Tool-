<?php
$sql_inst = new mysqli("127.0.0.1", "adminapi", "adminPassword", "cs_gr");
if($sql_inst->connect_error){
    exit('could not connect');
}

$degreeID = $_GET['id'];
$degreeName = $_GET['n'];
$level_courses = explode(",", $_GET["lvl"]);
$req_courses = explode(",", $_GET["req"]);

$insert = "INSERT INTO degree_tracks VALUES (?,?);";
$query1 = $sql_inst->prepare($insert);
$query1->bind_param("ss", $degreeID, $degreeName);
$query1->execute();
$query1->close();

foreach ($level_courses as $crs) {
    $ins2 = "INSERT INTO level_courses VALUES (?,?);";
    $query2 = $sql_inst->prepare($ins2);
    $query2->bind_param("ss", $degreeID, $crs);
    $query2->execute();
    $query2->close();
}

foreach ($req_courses as $crs) {
    $ins3 = "INSERT INTO required_courses VALUES (?,?);";
    $query3 = $sql_inst->prepare($ins3);
    $query3->bind_param("ss", $degreeID, $crs);
    $query3->execute();
    $query3->close();
}
?>