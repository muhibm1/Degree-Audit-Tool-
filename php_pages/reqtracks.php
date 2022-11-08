<?php
$sql_inst = new mysqli("127.0.0.1", "api", "apiuserpassword", "cs_gr");
if($sql_inst->connect_error){
    exit('could not connect');
}

$fetch_id = $_GET['s'];

$count_stmt = "SELECT COUNT(id) FROM degree_tracks";
$count = $sql_inst->query($count_stmt);

if($fetch_id <= $count->fetch_assoc()['COUNT(id)']){
    $req_degreeinfo = "SELECT name FROM degree_tracks WHERE id=?";
    $query1 = $sql_inst->prepare($req_degreeinfo);
    $query1->bind_param("i", $fetch_id);
    $query1->execute();
    $result1=$query1->get_result();
    echo "{\"id\":";
    echo $fetch_id;
    echo ", ";
    echo "\"name\":\"";
    echo $result1->fetch_assoc()['name'];
    echo "\", \"level_courses\":[\"";
    $query1->close();

    $req_level = "SELECT courseID FROM level_courses WHERE degree=?";
    $query2 = $sql_inst->prepare($req_level);
    $query2->bind_param("i", $fetch_id);
    $query2->execute();
    $result2=$query2->get_result();
    for($i=0; $i<$result2->num_rows-1; $i++){
        echo $result2->fetch_assoc()['courseID'];
        echo "\",\"";
    }
    echo $result2->fetch_assoc()['courseID'];
    echo "\"], \"req_courses\":[\"";
    $query2->close();

    $req_requ = "SELECT courseID FROM required_courses WHERE degree=?";
    $query3 = $sql_inst->prepare($req_requ);
    $query3->bind_param("i", $fetch_id);
    $query3->execute();
    $result3=$query3->get_result();
    for($i=0; $i<$result3->num_rows-1; $i++){
        echo $result3->fetch_assoc()['courseID'];
        echo "\",\"";
    }
    echo $result3->fetch_assoc()['courseID'];
    echo "\"]}";
    $query3->close();
}else{
    echo "DONE";
}
$sql_inst->close();
?>