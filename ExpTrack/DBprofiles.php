<?php
   $dbhost = 'localhost';
   $dbuser = 'root';
   $dbpass = '';
   $dbname = "ExpTrackDB";

   // Create connection
   $conn = mysqli_connect($dbhost, $dbuser, $dbpass,$dbname);
     
    // Check connection
    if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
    }

    // sql to create table
    $sql = "CREATE TABLE Profiles (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(50) NOT NULL,
    pass VARCHAR(30) NOT NULL
    )";
   
    if ($conn->query($sql) === TRUE) {
      echo "Table Profiles created successfully";
    } else {
      echo "Error creating table: " . mysqli_error($conn);
    }
   
    mysqli_close($conn);
    ?>