<?php
$dbhost = 'localhost';
$dbuser = 'root';
$dbpass = '';
$dbname = "ExpTrackDB";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $Email = $_POST['email1'];
    $Password = $_POST['pass1'];

    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    } else {
        // Prepare and bind the SQL statement
        $sql = $conn->prepare("INSERT INTO Profiles(email,pass) VALUES (?, ?)");
        
        if ($sql) {
            // Bind parameters
            $sql->bind_param("ss", $Email, $Password);
            
            // Execute the statement
            if ($sql->execute()) {
                echo "Login successful...";
            } else {
                echo "Error: " . $sql->error;
            }
            
            $sql->close();
        } else {
            echo "Error preparing SQL statement: " . $conn->error;
        }

        mysqli_close($conn);
    }
    header("Location: expense.html");
    exit();
}
?>
