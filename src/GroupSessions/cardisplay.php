<?php
session_start();

// Clear selected cars if clear action is triggered
if (isset($_GET['action']) && $_GET['action'] == 'clear') {
    unset($_SESSION['selected_cars']);
    header('Location: carselection.html');
    exit();
}

$selected_cars = isset($_SESSION['selected_cars']) ? $_SESSION['selected_cars'] : array();
?>

<!DOCTYPE html>
<html>
<head>
    <title>Car Display Page</title>
    <link rel="stylesheet" href="/src/styles.css" />
    <script src="/src/navbar/navbar-component.js" defer></script>
</head>

<header>
  <custom-navbar current-page="group-sessions"></custom-navbar>
</header>
<body>
    <h1>Selected Cars</h1>
    <?php if (!empty($selected_cars)): ?>
        <ul>
            <?php foreach ($selected_cars as $car): ?>
                <li><?= htmlspecialchars($car) ?></li>
            <?php endforeach; ?>
        </ul>
        <a href="?action=clear">Clear Selection</a>
    <?php else: ?>
        <p>No cars selected.</p>
    <?php endif; ?>
    <a href="carselection.html">Back to Car Selection Page</a>
</body>
</html>
