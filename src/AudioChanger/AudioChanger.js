document.addEventListener("DOMContentLoaded", function () {
  // Initialize audio player and control elements
  const audioPlayer = document.getElementById("audioPlayer");
  const playlist = document.getElementById("playlist");
  const currentTimeDisplay = document.getElementById("currentTime");
  const rewindButton = document.getElementById("rewind");
  const forwardButton = document.getElementById("forward");
  const togglePlayButton = document.getElementById("togglePlay");
  const addTitleButton = document.getElementById("addTitle");
  const removeTitleButton = document.getElementById("removeTitle");

  // Track play state
  let isPlaying = false;
  // Define playlist titles and metadata
  let titles = [
    {
      title: "Introduction to Resilience and Success",
      start: 0,
      end: 68,
      description:
        "Arnold discusses the importance of failures and pain in learning and becoming stronger, leading into his introduction and the vast influence of his life.",
    },
    {
      title: "Growing Up With Strict Parents In A War Torn Austria",
      start: 68,
      end: 447,
      description:
        "Arnold reflects on his early life, including the strict discipline of his father, the impact of post-war conditions, and the development of his ambitions.",
    },
    {
      title: "Lessons Learned From Joining The Military",
      start: 447,
      end: 650,
      description:
        "Arnold shares his experiences and the tough but valuable lessons learned from his time in the military, highlighting the benefits of such discipline and self-sufficiency.",
    },
    {
      title: "Arnold’s First Impressions Of America",
      start: 650,
      end: 801,
      description:
        "Arnold narrates his first experiences in America, contrasting his expectations with reality, particularly focusing on his initial visit to Miami and later California.",
    },
    {
      title: "Challenges and Realizations",
      start: 801,
      end: 875,
      description:
        "Discussing the stark difference between his expectations of Hollywood and the reality, Arnold reflects on his initial disappointment and subsequent adaptation.",
    },
    {
      title: "The Pursuit of Bodybuilding and New Beginnings",
      start: 875,
      end: 900,
      description:
        "Arnold describes his journey towards starting a career in bodybuilding in America, adjusting to a new life, and the cultural differences he encountered.",
    },
  ];

  // Updates the playlist display with titles and descriptions
  function updatePlaylist() {
    playlist.innerHTML = "";
    titles.forEach((title, index) => {
      let button = document.createElement("button");
      button.textContent = title.title;
      button.onclick = function () {
        console.log("Playing", title);
        playSegment(title.start, title.end);
      };
      playlist.appendChild(button);
      // Adding description below each title button
      let description = document.createElement("p");
      description.textContent = title.description;
      playlist.appendChild(description);
      // Adding styled timestamps
      let timestamp = document.createElement("span");
      timestamp.textContent = `[${formatTime(title.start)} - ${formatTime(
        title.end
      )}]`;
      timestamp.className = "timestamp";
      description.appendChild(timestamp);
    });
  }

  // Formats time in seconds to HH:MM:SS format
  function formatTime(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  // Plays a specific segment of the audio
  function playSegment(start, end) {
    console.log("Playing segment", start, end);
    audioPlayer.currentTime = start;
    console.log("Playing from", audioPlayer.currentTime);
    audioPlayer.play();
    isPlaying = true;
    togglePlayButton.textContent = "Pause";

    // Stops playback when the end of the segment is reached
    let playUntilEnd = setInterval(function () {
      if (audioPlayer.currentTime >= end || !isPlaying) {
        audioPlayer.pause();
        clearInterval(playUntilEnd);
      }
    }, 1000);
  }

  // Toggles play/pause state
  function togglePlay() {
    if (isPlaying) {
      audioPlayer.pause();
      togglePlayButton.textContent = "Play";
    } else {
      audioPlayer.play();
      togglePlayButton.textContent = "Pause";
    }
    isPlaying = !isPlaying;
  }

  // Rewinds the audio by 5 seconds
  function rewind() {
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 5);
  }

  // Fast forwards the audio by 5 seconds
  function forward() {
    audioPlayer.currentTime = Math.min(
      audioPlayer.duration,
      audioPlayer.currentTime + 5
    );
  }

  // Updates the current time display
  function updateCurrentTime() {
    currentTimeDisplay.textContent = new Date(audioPlayer.currentTime * 1000)
      .toISOString()
      .substr(14, 5);
  }

  // Adds a new title to the playlist
  function addTitle() {
    let title = prompt("Enter title:");
    let start = audioPlayer.currentTime;
    // Assuming end time is 30 seconds after start for simplicity
    let end = start + 30;
    titles.push({ title, start, end });
    titles.sort((a, b) => a.start - b.start);
    updatePlaylist();
  }

  // Removes the title currently being played from the playlist
  function removeTitle() {
    let currentTitleIndex = titles.findIndex(
      (title) =>
        audioPlayer.currentTime >= title.start &&
        audioPlayer.currentTime <= title.end
    );
    if (currentTitleIndex !== -1) {
      titles.splice(currentTitleIndex, 1);
      updatePlaylist();
    }
  }

  // Initial playlist and current time update
  updatePlaylist();
  setInterval(updateCurrentTime, 1000);

  // Event listeners for control buttons
  rewindButton.onclick = rewind;
  forwardButton.onclick = forward;
  togglePlayButton.onclick = togglePlay;
  addTitleButton.onclick = addTitle;
  removeTitleButton.onclick = removeTitle;
});
