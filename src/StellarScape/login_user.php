<?php
require_once 'db_connect.php';
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (!empty($email) && !empty($password)) {
        // Prepare SQL statement to prevent SQL injection
        $stmt = $conn->prepare('SELECT user_id, name, password, login_count, failed_attempts, account_locked FROM Users WHERE email = ?');
        $stmt->bind_param('s', $email);
        $stmt->execute();
        $stmt->store_result();

        if ($stmt->num_rows == 1) {
            $stmt->bind_result($user_id, $name, $hashed_password, $login_count, $failed_attempts, $account_locked);
            $stmt->fetch();

            // Check if the account is locked
            if ($account_locked) {
                echo 'Account is locked. Please reset your password to unlock.';
            } else {
                // Verify the password
                if (password_verify($password, $hashed_password)) {
                    // Update last login and increment login count
                    $stmt = $conn->prepare('UPDATE Users SET last_login = NOW(), login_count = login_count + 1 WHERE user_id = ?');
                    $stmt->bind_param('i', $user_id);
                    $stmt->execute();

                    // Set session variables
                    $_SESSION['user_id'] = $user_id;
                    $_SESSION['name'] = $name;
                    $_SESSION['email'] = $email;

                    // Redirect to Mars Gallery
                    header('Location: mars_gallery.html');
                    exit;
                } else {
                    // Increment failed attempts
                    $failed_attempts++;
                    $stmt = $conn->prepare('UPDATE Users SET failed_attempts = ? WHERE user_id = ?');
                    $stmt->bind_param('ii', $failed_attempts, $user_id);
                    $stmt->execute();

                    if ($failed_attempts >= 3) {
                        // Lock the account
                        $stmt = $conn->prepare('UPDATE Users SET account_locked = TRUE WHERE user_id = ?');
                        $stmt->bind_param('i', $user_id);
                        $stmt->execute();
                        echo 'Account locked due to multiple failed login attempts. Please reset your password.';
                    } else {
                        echo 'Incorrect password. Please try again.';
                    }
                }
            }
        } else {
            echo 'No user found with that email address.';
        }

        $stmt->close();
    } else {
        echo 'Please enter both email and password.';
    }
}

$conn->close();
?>
