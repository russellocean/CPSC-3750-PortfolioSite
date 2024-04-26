<?php
require_once 'db_connect.php';
session_start();

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST' && isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];
    // Decode JSON data into PHP array
    $data = json_decode(file_get_contents('php://input'), true);
    $photoId = $data['photoId'] ?? '';
    $title = $data['cameraFullName'] . ' ' . $photoId; // Construct title from camera full name and photo ID
    $imageUrl = $data['imgSrc']; // Image URL from the data

    if (!empty($photoId) && !empty($title) && !empty($imageUrl)) {
        // Check database connection
        if ($conn->connect_error) {
            echo json_encode(['success' => false, 'error' => 'Database connection error: ' . $conn->connect_error]);
            exit;
        }

        // Prepare SQL statement to prevent SQL injection
        $stmt = $conn->prepare('INSERT INTO Favorites (user_id, item_id, title, image_url) VALUES (?, ?, ?, ?)');
        if (!$stmt) {
            echo json_encode(['success' => false, 'error' => 'Prepare statement error: ' . $conn->error]);
            exit;
        }

        $stmt->bind_param('iiss', $userId, $photoId, $title, $imageUrl);

        // Execute the statement
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to add to favorites: ' . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Photo ID, title or image URL is missing']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Unauthorized access or missing user session']);
}

$conn->close();
?>
