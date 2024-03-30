<?php
session_start(); // Start a new session or resume the existing one. This is essential for tracking user sessions and managing cookies.

// Check if it's the user's first time using the app based on a cookie
if (!isset($_COOKIE['first_visit'])) {
    // Set a cookie to mark the user's first visit. This helps in identifying new users and initializing necessary files for them.
    setcookie('first_visit', '1', time() + (86400 * 30), "/"); // 86400 = 1 day

    // File names to be created
    $files = ['prime.txt', 'armstrong.txt', 'fibonacci.txt', 'none.txt'];

    // Create each file if it doesn't already exist. This is to store numbers based on their mathematical properties.
    foreach ($files as $file) {
        $filePath = __DIR__ . '/../PHPFile/' . $file;
        if (!file_exists($filePath)) {
            $handle = fopen($filePath, 'w'); // Open file for writing
            fclose($handle); // Close the file handler
        }
    }
}

// Function to check if a number is prime
function isPrime($number) {
    if ($number <= 1) {
        return false;
    }
    for ($i = 2; $i <= sqrt($number); $i++) {
        if ($number % $i == 0) {
            return false;
        }
    }
    return true; // A number is prime if it is greater than 1 and has no divisors other than 1 and itself.
}

// Function to check if a number is Armstrong
function isArmstrong($number) {
    $sum = 0;
    $numberStr = strval($number);
    $length = strlen($numberStr);
    for ($i = 0; $i < $length; $i++) {
        $sum += pow((int)$numberStr[$i], $length);
    }
    return $sum == $number; // A number is Armstrong if the sum of its own digits each raised to the power of the number of digits is equal to the number itself.
}

// Function to check if a number is Fibonacci
function isFibonacci($number) {
    $isPerfectSquare = function($x) {
        $s = (int)(sqrt($x));
        return ($s * $s == $x);
    };

    // A number is Fibonacci if one or both of (5*n^2 + 4) or (5*n^2 - 4) is a perfect square
    return $isPerfectSquare(5 * $number * $number + 4) || $isPerfectSquare(5 * $number * $number - 4);
}

// Function to add number to file
function addNumberToFile($number, $fileName) {
    $filePath = __DIR__ . '/../PHPFile/' . $fileName;
    file_put_contents($filePath, $number . PHP_EOL, FILE_APPEND); // Adds a number to the specified file, appending it to any existing content.
}

// Function to get numbers from file
function getNumbersFromFile($fileName) {
    $filePath = __DIR__ . '/../PHPFile/' . $fileName;
    return file_get_contents($filePath); // Retrieves numbers stored in the specified file.
}

// Function to reset the application
function resetApplication() {
    $files = ['prime.txt', 'armstrong.txt', 'fibonacci.txt', 'none.txt'];
    foreach ($files as $file) {
        $filePath = __DIR__ . '/../PHPFile/' . $file;
        if (file_exists($filePath)) {
            unlink($filePath); // Delete the file
        }
    }
    // Clear the cookie
    setcookie('first_visit', '', time() - 3600, "/"); // Resets the application by clearing the first_visit cookie and deleting all files.
}

// Handle form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    switch ($action) {
        case 'check':
            $numbers = explode(',', $_POST['numbers']);
            $response = ''; // Initialize response string
            foreach ($numbers as $number) {
                $number = trim($number);
                if (!is_numeric($number)) {
                    $response .= $number . ' is not a valid number.<br>';
                    continue;
                }
                $number = (int)$number;
                $categorized = false;
                if (isPrime($number)) {
                    addNumberToFile($number, 'prime.txt');
                    $categorized = true;
                }
                if (isArmstrong($number)) {
                    addNumberToFile($number, 'armstrong.txt');
                    $categorized = true;
                }
                if (isFibonacci($number)) {
                    addNumberToFile($number, 'fibonacci.txt');
                    $categorized = true;
                }
                if (!$categorized) {
                    addNumberToFile($number, 'none.txt');
                }
                $response .= $number . ' checked and categorized.<br>';
            }
            echo $response;
            break;
        case 'display':
            $category = $_POST['category'];
            $fileName = $category . '.txt';
            echo nl2br(getNumbersFromFile($fileName));
            break;
        case 'reset':
            resetApplication();
            echo 'Application reset. Please refresh the page.';
            break;
    }
    exit; // Terminate the script to prevent further execution after form submission handling.
}
?>
