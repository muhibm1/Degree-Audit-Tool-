<?php
$sql_inst = new mysqli("127.0.0.1", "api", "apiuserpassword", "cs_gr");
if($sql_inst->connect_error){
    exit('could not connect');
}

$uname = $_GET['u'];
$pass = $_GET['p'];

$req = "SELECT * FROM login";
$query = $sql_inst->prepare($req);
$query->execute();
$result=$query->get_result();
$resFetch = $result->fetch_assoc();
$resUser=$resFetch['username'];
$resPass=$resFetch['password'];
if($uname == $resUser){
    if($pass == $resPass){
        echo "0_";
    }else{
        echo "2_pass";
    }
}else{
    echo "1_uname";
}
$query->close();
?>