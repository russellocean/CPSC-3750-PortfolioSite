<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    echo "<h1>Form Submission Results</h1>";
    echo "<p>Text: " . htmlspecialchars($_POST["text"]) . "</p>";
    echo "<p>Textarea: " . htmlspecialchars($_POST["textarea"]) . "</p>";
    echo "<p>Hidden Data: " . htmlspecialchars($_POST["hiddenData"]) . "</p>";
    echo "<p>Password: " . htmlspecialchars($_POST["password"]) . "</p>";
    
    echo "<p>Checkbox Array:</p><ul>";
    if (!empty($_POST["checkboxArray"])) {
        foreach ($_POST["checkboxArray"] as $checkboxValue) {
            echo "<li>" . htmlspecialchars($checkboxValue) . "</li>";
        }
    } else {
        echo "<li>None selected</li>";
    }
    echo "</ul>";
    
    echo "<p>Radio: " . (isset($_POST["radio"]) ? htmlspecialchars($_POST["radio"]) : "Not selected") . "</p>";
    echo "<p>Selection List: " . htmlspecialchars($_POST["selectionList"]) . "</p>";
    
    if (isset($_FILES["file"])) {
        $fileInfo = $_FILES["file"];
        echo "<p>File: " . htmlspecialchars($fileInfo["name"]) . "</p>";
    } else {
        echo "<p>No file uploaded</p>";
    }
    
    echo "<p>URL: " . htmlspecialchars($_POST["url"]) . "</p>";
}
?>
