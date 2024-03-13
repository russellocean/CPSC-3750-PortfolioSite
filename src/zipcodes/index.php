<?php
    session_start();

    // Zipcode Datafile
    $file = "zipcodes.txt";

    // Array of all zips
    $zips = array();

    class Zipcode {
        public $zip = '';
        public $long = '';
        public $lat = '';

        function __construct($zip, $long, $lat){
            $this->zip = $zip;
            $this->long = $long;
            $this->lat = $lat;
        }
    }

    function debugValues($zip1, $zip2){
        global $zips;
        $counter = 1;
        foreach ($zips as $zip) {
            if ($counter > 10) break;
            echo $counter . ". Zip: " . $zip->zip . " Long: " . $zip->long . " Lat: " . $zip->lat . "<br>";
            $counter++;
        }

        echo "<br><br>";

        echo "Zip1 Longitude: " . $zips[$zip1]->long . "<br>";
        echo "Zip1 Latitude: " . $zips[$zip1]->lat . "<br>";
        echo "Zip2 Longitude: " . $zips[$zip2]->long . "<br>";
        echo "Zip2 Latitude: " . $zips[$zip2]->lat . "<br>";
        
        echo "<br>";

        echo "Distance Formula (Haversine Formula): <br>";
        echo "dlat = lat2 - lat1 <br>";
        echo "a = sin(dlat / 2)^2 + cos(lat1) * cos(lat2) * sin(dlong / 2)^2 <br>";
        echo "c = 2 * asin(sqrt(a)) <br>";
        echo "r = 6371 <br>";

        echo "<br>";
    }

    function calculateDistances($zip1, $zip2, $debugMode = false) {
        global $zips;

        // Check if the zip codes exist in the array to prevent undefined index warnings.
        if (!isset($zips[$zip1]) || !isset($zips[$zip2])) {
            // Throw an error if the zip code does not exist.
            echo "One or both of the zip codes do not exist.";
            echo "Zip1: " . print_r($zip1);
            echo "Zip2: " . print_r($zip2);
            return null;
        }


        // Execute debug information output if Debug Mode is enabled
        if ($debugMode === "true") {
            echo "Debug Mode: <br>";
            debugValues($zip1, $zip2);
        }

        // Extract longitude and latitude for both zip codes.
        $long1 = $zips[$zip1]->long;
        $lat1 = $zips[$zip1]->lat;
        $long2 = $zips[$zip2]->long;
        $lat2 = $zips[$zip2]->lat;

        // Convert from degrees to radians.
        $long1 = deg2rad($long1);
        $lat1 = deg2rad($lat1);
        $long2 = deg2rad($long2);
        $lat2 = deg2rad($lat2);
    
        // Haversine formula to calculate the distance.
        $dlong = $long2 - $long1;
        $dlat = $lat2 - $lat1;
        $a = pow(sin($dlat / 2), 2) + cos($lat1) * cos($lat2) * pow(sin($dlong / 2), 2);
        $c = 2 * asin(sqrt($a));
        $r = 6371; // Radius of Earth in kilometers.

        return $c * $r;
    }

    function readInData(){
        global $file, $zips;

        // Open the file for reading
        $file_handle = fopen($file, 'r');
        
        // Skip the first line of dummy data
        fgets($file_handle);

        while (!feof($file_handle)) {
            $line = explode (",", fgets($file_handle));
            $zip = new Zipcode((int)$line[0], (floatval($line[2])), (floatval($line[1])));
            $zips[(int)$line[0]] = $zip;        
        }

        fclose($file_handle);
    }

    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        readInData();
        $_SESSION['zips'] = $zips;
    } else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $zip1 = $_POST['zip1'];
        $zip2 = $_POST['zip2'];
        $debugMode = $_POST['debugMode'];

        $zips = $_SESSION['zips'];
        $distance = calculateDistances($zip1, $zip2, $debugMode);
        
        // Format the output to display the distance between the two zip codes nicely
        echo "<h2>Distance Calculation</h2>";
        echo "<p>The distance between zip code <strong>$zip1</strong> and zip code <strong>$zip2</strong> is approximately <strong>$distance kilometers</strong>.</p>";
    }
?>

