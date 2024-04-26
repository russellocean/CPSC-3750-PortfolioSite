<?php
require_once 'db_connect.php';
session_start();

header('Content-Type: application/json');

if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];

    // Prepare SQL statement to prevent SQL injection
    $stmt = $conn->prepare('SELECT item_id, title, image_url FROM Favorites WHERE user_id = ?');
    $stmt->bind_param('i', $userId);
    if (!$stmt->execute()) {
        echo json_encode(['success' => false, 'error' => 'Failed to execute statement: ' . $stmt->error]);
        exit;
    }
    $result = $stmt->get_result();

    $favorites = [];
    while ($row = $result->fetch_assoc()) {
        $favorites[] = $row;
    }

    echo json_encode(['success' => true, 'favorites' => $favorites]);
} else {
    echo json_encode(['success' => false, 'error' => 'User not logged in']);
}

$conn->close();
?>
