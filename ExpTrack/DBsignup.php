<?php
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = "ExpTrackDB";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Email2 = $_POST['email2'];
    $password2 = $_POST["pass2"];
    $confirm_password2 = $_POST["con_pass2"];
    if ($password2 === $confirm_password2) {
        
        $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
        if ($conn->connect_error) {
            die("Connection failed: " . $conn->connect_error);
        }
        $sql = $conn->prepare("INSERT INTO Profiles(email, pass) VALUES (?, ?)");
        
        if ($sql) {
            $sql->bind_param("ss", $Email2, $confirm_password2);
            
            if ($sql->execute()) {
                echo "Registration successful...";
            } else {
                echo "Error: " . $sql->error;
            }
            
            $sql->close();
        } else {
            echo "Error preparing SQL statement: " . $conn->error;
        }

        mysqli_close($conn);
    }else {
        echo "Passwords do not match. Please try again.";
    }
    header("Location: expense.html");
    exit();
}

