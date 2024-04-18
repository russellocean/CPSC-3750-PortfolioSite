<?php
// Define the path to the words file
$wordsFilePath = "./words.txt";

// Function to count vowels in a word
function countVowels($word) {
    $vowels = ['a', 'e', 'i', 'o', 'u'];
    $count = 0;
    foreach (str_split(strtolower($word)) as $letter) {
        if (in_array($letter, $vowels)) {
            $count++;
        }
    }
    return $count;
}

// Read the words from the file and organize them by vowel count
$wordsByVowelCount = [];
if ($file = fopen($wordsFilePath, "r")) {
    while(!feof($file)) {
        $word = trim(fgets($file));
        $vowelCount = countVowels($word);
        if ($vowelCount > 0) { // Change to ensure only words with at least 1 vowel are considered
            if (!isset($wordsByVowelCount[$vowelCount])) {
                $wordsByVowelCount[$vowelCount] = [];
            }
            $wordsByVowelCount[$vowelCount][] = $word;
        }
    }
    fclose($file);
}

// Sort the arrays by word length
foreach ($wordsByVowelCount as &$words) {
    usort($words, function($a, $b) {
        return strlen($a) - strlen($b);
    });
}

// Frontend part (HTML)
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Word Vowel Counter</title>
    <link rel="stylesheet" href="/src/styles.css" />
    <style>
        [draggable] {
          -moz-user-select: none;
          -khtml-user-select: none;
          -webkit-user-select: none;
          user-select: none;
          -khtml-user-drag: element;
          -webkit-user-drag: element;
        }

        #columns {
          list-style-type: none;
          max-height: 200px;
          overflow-y: scroll;
        }

        .column {
          width: 162px;
          padding-bottom: 5px;
          padding-top: 5px;
          text-align: center;
          cursor: move;
        }
        .column header {
          height: 20px;
          width: 150px;
          color: black;
          background-color: #ccc;
          padding: 5px;
          border-bottom: 1px solid #ddd;
          border-radius: 10px;
          border: 2px solid #666666;
        }

        .column.dragElem {
          opacity: 0.4;
        }
        .column.over {
          border-top: 2px solid blue;
        }
        #dropArea {
          border: 2px dashed #666;
          padding: 20px;
          text-align: center;
          margin: 20px;
          background-color: #f9f9f9;
          list-style-type: none; 
          min-height: 150px;
          color: black;
        }
        #wordCounter {
          margin-top: 20px;
          font-size: 20px;
          font-weight: bold; 
        }
    </style>
<script src="/src/navbar/navbar-component.js" defer></script>
</head>
<header>
  <custom-navbar current-page="exam-2"></custom-navbar>
</header>
<body>
    <div>
        <h1>Word Vowel Counter</h1>
        <p>Select a vowel count to display words:</p>
        <?php foreach ($wordsByVowelCount as $vowelCount => $words): ?>
            <button onclick="showWords(<?php echo $vowelCount; ?>)"><?php echo $vowelCount . ' Vowels'; ?></button>
        <?php endforeach; ?>
    </div>
    <ul id="columns">
        <p>Drag and drop the words into the drop area below:</p>
        <?php foreach ($wordsByVowelCount as $vowelCount => $words): ?>
            <?php foreach ($words as $word): ?>
                <li class="column" draggable="true"><header><?php echo $word; ?></header></li>
            <?php endforeach; ?>
        <?php endforeach; ?>
    </ul>
    <div id="dropArea">Drop words here</div>
    <div id="wordCounter">Words dropped: <span id="count">0</span></div>
    <script>
        function showWords(vowelCount) {
            var words = <?php echo json_encode($wordsByVowelCount); ?>;
            var list = document.getElementById('columns');
            list.innerHTML = '';
            if (words[vowelCount]) {
                words[vowelCount].forEach(function(word) {
                    var item = document.createElement('li');
                    item.innerHTML = '<header>' + word + '</header>';
                    item.className = 'column';
                    item.draggable = true;
                    list.appendChild(item);
                    addDnDHandlers(item); // Apply event handlers to each new item
                });
            }
        }

        var dragSrcEl = null;

        function handleDragStart(e) {
        dragSrcEl = this;

        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/html', this.outerHTML);

        this.classList.add('dragElem');
        }
        function handleDragOver(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        this.classList.add('over');

        e.dataTransfer.dropEffect = 'move';

        return false;
        }

        function handleDragEnter(e) {
        }

        function handleDragLeave(e) {
        this.classList.remove('over');
        }

        function handleDrop(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }

        if (dragSrcEl != this) {
            this.parentNode.removeChild(dragSrcEl);
            var dropHTML = e.dataTransfer.getData('text/html');
            this.insertAdjacentHTML('beforebegin',dropHTML);
            var dropElem = this.previousSibling;
            addDnDHandlers(dropElem);
            
        }
        this.classList.remove('over');
        return false;
        }

        function handleDragEnd(e) {
        this.classList.remove('over');
        }

        function addDnDHandlers(elem) {
        elem.addEventListener('dragstart', handleDragStart, false);
        elem.addEventListener('dragenter', handleDragEnter, false)
        elem.addEventListener('dragover', handleDragOver, false);
        elem.addEventListener('dragleave', handleDragLeave, false);
        elem.addEventListener('drop', handleDrop, false);
        elem.addEventListener('dragend', handleDragEnd, false);
        }

        document.addEventListener('DOMContentLoaded', function () {
            var cols = document.querySelectorAll('#columns .column');
            [].forEach.call(cols, addDnDHandlers);
            var dropArea = document.getElementById('dropArea');
            var wordCounter = document.getElementById('count');

            dropArea.addEventListener('dragover', function(e) {
                e.preventDefault();
                this.className = 'over';
            }, false);

            dropArea.addEventListener('dragenter', function(e) {
                this.className = 'over';
                return false;
            }, false);

            dropArea.addEventListener('dragleave', function(e) {
                this.className = '';
            }, false);

            dropArea.addEventListener('drop', function(e) {
                e.preventDefault();
                this.className = '';
                var data = e.dataTransfer.getData('text/html');
                this.innerHTML += data;
                wordCounter.innerText = parseInt(wordCounter.innerText) + 1;
            }, false);
        });
    </script>
</body>
</html>
