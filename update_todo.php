<?php
header('Content-Type: application/json');
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = intval($_POST['id']);
    $is_done = intval($_POST['is_done']);  // 0 or 1

    $stmt = $conn->prepare("UPDATE todos SET is_done = ? WHERE id = ?");
    $stmt->bind_param("ii", $is_done, $id);
    $stmt->execute();
    $stmt->close();

    echo json_encode(["success" => true]);
}

$conn->close();
?>
