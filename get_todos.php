<?php
header('Content-Type: application/json');
require 'db.php';

$result = $conn->query("SELECT id, text, is_done FROM todos ORDER BY id DESC");

$todos = [];
while ($row = $result->fetch_assoc()) {
    $todos[] = $row;
}

echo json_encode($todos);
$conn->close();
?>
