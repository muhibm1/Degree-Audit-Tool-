<?php
$sql_inst = new mysqli("127.0.0.1", "api", "apiuserpassword", "cs_gr");
if($sql_inst->connect_error){
    exit('could not connect');
}

$req = "SELECT courseID, name FROM course_list";
$query = $sql_inst->prepare($req);
$query->execute();
$result=$query->get_result();
while($row = $result->fetch_assoc()){
    $php_arr[] = $row;
}
echo json_encode($php_arr);
$query->close();
?>