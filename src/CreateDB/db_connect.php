<?php
$servername = "localhost";
$username = "usyvizg41gahk";
$password = "hzlggqtowywg";
$dbname = "dbqce8xcbt3dyr";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
echo "Connected successfully";
?>
