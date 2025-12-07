<?php
$host = "localhost";
$user = "root";      // XAMPP default
$pass = "";          // XAMPP default (empty)
$dbname = "todo_app";

$conn = new mysqli($host, $user, $pass, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
