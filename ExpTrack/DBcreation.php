<?php
$host = 'localhost';
$user = 'root';
$pass = '';

$conn = mysqli_connect($host,$user,$pass);
if(! $conn)
{
    die('Could not connect: '. mysqli_error());
}

$sql ="CREATE DATABASE ExpTrackDB";
if(mysqli_query($conn,$sql)){
    echo 'ExpTrackDB Datatbase created succesfully';
}
else{
    echo "Error creating database: " . mysqli_error($conn);
}
mysqli_close($conn);
?>