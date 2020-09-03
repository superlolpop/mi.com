<?php
    include("./conn.php");

    $username=$_REQUEST['username'];
    $password=$_REQUEST['password'];
    $phone=$_REQUEST['phone'];

    $sql = "select * from users where username = '$username'";

    $result = $mysqli->query($sql);

    if($result->num_rows>0){
        echo '{"has":true,"status":false}';
        $mysqli->close();
        die();
    }else{
        $insert = "insert into users (`username`,`password`,`email`,`phone`,`address`) values ('$username','$password','','$phone','')";
        
        $mysqli->query($insert);
        
        $mysqli->close();
        
        echo '{"has":false,"status":true}';
    }
?>