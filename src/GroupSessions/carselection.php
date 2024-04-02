<?php
session_start();

if (isset($_POST['submit']) && isset($_POST['cars'])) {
    $_SESSION['selected_cars'] = $_POST['cars'];
    header('Location: cardisplay.php');
    exit();
}
?>