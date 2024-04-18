<?php
include 'db_connect.php';

// Function to sanitize input data
function test_input($data) {
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

?>

<!DOCTYPE html>
<html>
<head>
    <title>Create Person Record</title>
    <link rel="stylesheet" type="text/css" href="/src/styles.css" />
    <script src="/src/navbar/navbar-component.js" defer></script>
</head>
<body>
<header>
  <custom-navbar current-page="create-db"></custom-navbar>
</header>
    <h2>Enter Person Details</h2>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
        First Name: <input type="text" name="first_name" required><br>
        Last Name: <input type="text" name="last_name" required><br>
        Email Address: <input type="email" name="email_address" required><br>
        <input type="submit" name="submit" value="Submit">
    </form>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
        <input type="submit" name="display_records" value="Display Records">
    </form>
    <form method="post" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]);?>">
        Search by Last Name: <input type="text" name="search_term" required>
        <input type="submit" name="search" value="Search">
    </form>

<?php
// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if(isset($_POST["submit"])) {
        $first_name = test_input($_POST["first_name"]);
        $last_name = test_input($_POST["last_name"]);
        $email_address = test_input($_POST["email_address"]);

        // Prepare SQL and bind parameters
        $stmt = $conn->prepare("INSERT INTO Person (first_name, last_name, email_address) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $first_name, $last_name, $email_address);

        // Execute the query
        if ($stmt->execute()) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    } elseif(isset($_POST["display_records"])) {
        $sql = "SELECT first_name, last_name, email_address FROM Person ORDER BY last_name ASC";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            echo "<table><tr><th>First Name</th><th>Last Name</th><th>Email Address</th></tr>";
            // output data of each row
            while($row = $result->fetch_assoc()) {
                echo "<tr><td>".$row["first_name"]."</td><td>".$row["last_name"]."</td><td>".$row["email_address"]."</td></tr>";
            }
            echo "</table>";
        } else {
            echo "0 results";
        }
    } elseif(isset($_POST["search"]) && !empty($_POST["search_term"])) {
        $search_term = test_input($_POST['search_term']);
        $sql = "SELECT first_name, last_name, email_address FROM Person WHERE LOWER(last_name) = LOWER(?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $search_term);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo "<table><tr><th>First Name</th><th>Last Name</th><th>Email Address</th></tr>";
            while($row = $result->fetch_assoc()) {
                echo "<tr><td>".$row["first_name"]."</td><td>".$row["last_name"]."</td><td>".$row["email_address"]."</td></tr>";
            }
            echo "</table>";
        } else {
            echo "No results found for: ".$search_term;
        }
        $stmt->close();
    }
}

$conn->close();
?>
</body>
</html>

