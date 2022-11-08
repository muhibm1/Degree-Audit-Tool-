<?php
$sql_inst = new mysqli("127.0.0.1", "adminapi", "adminPassword", "cs_gr");
if($sql_inst->connect_error){
    exit('could not connect');
}

$degreeID = $_GET['id'];
$degreeName = $_GET['n'];
$level_courses = explode(",", $_GET["lvl"]);
$req_courses = explode(",", $_GET["req"]);

$req = "UPDATE degree_tracks SET name=? WHERE id=?";
$query = $sql_inst->prepare($req);
$query->bind_param("ss", $courseName, $courseID);
$query->execute();
$query->close();

$stmt = "DELETE FROM level_courses WHERE degree=?";
$query = $sql_inst->prepare($stmt);
$query->bind_param("s", $degreeID);
$query->execute();
$query->close();
//
$stmt = "DELETE FROM required_courses WHERE degree=?";
$query = $sql_inst->prepare($stmt);
$query->bind_param("s", $degreeID);
$query->execute();
$query->close();

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