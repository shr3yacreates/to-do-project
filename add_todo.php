<?php
header('Content-Type: application/json');
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $text = isset($_POST['text']) ? trim($_POST['text']) : '';

    if ($text !== '') {
        $stmt = $conn->prepare("INSERT INTO todos (text) VALUES (?)");
        $stmt->bind_param("s", $text);
        $stmt->execute();

        $inserted_id = $stmt->insert_id;
        $stmt->close();

        echo json_encode([
            "success" => true,
            "id" => $inserted_id,
            "text" => $text,
            "is_done" => 0
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Empty text"]);
    }
}

$conn->close();
?>
