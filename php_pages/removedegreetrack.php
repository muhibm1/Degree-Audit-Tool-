<?php
$sql_inst = new mysqli("127.0.0.1", "adminapi", "adminPassword", "cs_gr");
if($sql_inst->connect_error){
    exit('could not connect');
}

$degreeID = $_GET['id'];

$count_stmt = "SELECT COUNT(id) FROM degree_tracks";
$result = $sql_inst->query($count_stmt);
$result = $result->fetch_array();
$count = intval($result[0]);

for ($i = $degreeID; $i <= $count; $i++){
    if($i == $degreeID){
        $stmt = "DELETE FROM degree_tracks WHERE id=?";
        $query = $sql_inst->prepare($stmt);
        $query->bind_param("s", $degreeID);
        $query->execute();
        $query->close();
        //
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
    }else{
        $stmt = "UPDATE degree_tracks SET id=? WHERE id=?";
        $query = $sql_inst->prepare($req);
        $query->bind_param("ss", $i-1, $i);
        $query->execute();
        $query->close();
        //
        $stmt = "UPDATE level_courses SET degree=? WHERE degree=?";
        $query = $sql_inst->prepare($req);
        $query->bind_param("ss", $i-1, $i);
        $query->execute();
        $query->close();
        //
        $stmt = "UPDATE required_courses SET degree=? WHERE degree=?";
        $query = $sql_inst->prepare($req);
        $query->bind_param("ss", $i-1, $i);
        $query->execute();
        $query->close();
    }
}
echo "Success";
?>