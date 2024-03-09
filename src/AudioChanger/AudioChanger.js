document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audioPlayer");
  const playlist = document.getElementById("playlist");
  const currentTimeDisplay = document.getElementById("currentTime");
  const rewindButton = document.getElementById("rewind");
  const forwardButton = document.getElementById("forward");
  const togglePlayButton = document.getElementById("togglePlay");
  const addTitleButton = document.getElementById("addTitle");
  const removeTitleButton = document.getElementById("removeTitle");

  let isPlaying = false;
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

  function formatTime(seconds) {
    return new Date(seconds * 1000).toISOString().substr(11, 8);
  }

  function playSegment(start, end) {
    console.log("Playing segment", start, end);
    audioPlayer.currentTime = start;
    console.log("Playing from", audioPlayer.currentTime);
    audioPlayer.play();
    isPlaying = true;
    togglePlayButton.textContent = "Pause";

    let playUntilEnd = setInterval(function () {
      if (audioPlayer.currentTime >= end || !isPlaying) {
        audioPlayer.pause();
        clearInterval(playUntilEnd);
      }
    }, 1000);
  }

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

  function rewind() {
    audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 5);
  }

  function forward() {
    audioPlayer.currentTime = Math.min(
      audioPlayer.duration,
      audioPlayer.currentTime + 5
    );
  }

  function updateCurrentTime() {
    currentTimeDisplay.textContent = new Date(audioPlayer.currentTime * 1000)
      .toISOString()
      .substr(14, 5);
  }

  function addTitle() {
    let title = prompt("Enter title:");
    let start = audioPlayer.currentTime;
    // Assuming end time is 30 seconds after start for simplicity
    let end = start + 30;
    titles.push({ title, start, end });
    titles.sort((a, b) => a.start - b.start);
    updatePlaylist();
  }

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

  updatePlaylist();
  setInterval(updateCurrentTime, 1000);

  rewindButton.onclick = rewind;
  forwardButton.onclick = forward;
  togglePlayButton.onclick = togglePlay;
  addTitleButton.onclick = addTitle;
  removeTitleButton.onclick = removeTitle;
});
