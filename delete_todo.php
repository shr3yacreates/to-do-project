<?php
header('Content-Type: application/json');
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id = isset($_POST['id']) ? intval($_POST['id']) : 0;

    if ($id > 0) {
        $stmt = $conn->prepare("DELETE FROM todos WHERE id = ?");
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->close();

        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "message" => "Invalid id"]);
    }
}

$conn->close();
?>
