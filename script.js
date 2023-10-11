document.addEventListener("DOMContentLoaded", function () {
  const audio = document.getElementById("audio");
  const playPauseButton = document.getElementById("play-pause");
  const prevButton = document.getElementById("prev");
  const nextButton = document.getElementById("next");
  const songTitle = document.querySelector(".song-title");
  const progressBar = document.getElementById("progress");
  const indicator = document.querySelector(".indicator");
  const timeDisplay = document.getElementById("time");
  const albumCover = document.getElementById("album-cover");

  let currentSongIndex = 0;
  let isPlaying = false;

  // Array of songs with titles and image URLs
  const songs = [
    { title: "Happy Song", src: "songs/happy-song.mp3", imgUrl: "" },
    { title: "Let it Go", src: "songs/let-it-go.mp3", imgUrl: "" },
    { title: "Summer Walk", src: "songs/summer-walk.mp3", imgUrl: "" },
  ];

  document.addEventListener("keydown", function (event) {
    console.log("keyyyy");
    switch (event.key) {
      case " ": // Spacebar for play/pause
        togglePlayPause();
        break;
      case "ArrowRight":
        playNextSong();
        break;
      case "ArrowLeft":
        playPreviousSong();
        break;
    }
  });
  

  // Function to load and play the current song
  function loadAndPlayCurrentSong() {
    audio.src = songs[currentSongIndex].src;
    audio.load();
    if (isPlaying) {
      audio.play();
    }
    playPauseButton.innerHTML = isPlaying
      ? '<i class="fas fa-pause"></i>'
      : '<i class="fas fa-play"></i>';
    songTitle.textContent = songs[currentSongIndex].title;

    // Load the next song's image in advance
    prefetchNextImage();
  }

  // Function to prefetch the image for the next song
  function prefetchNextImage() {
    const nextSongIndex = (currentSongIndex + 1) % songs.length;
    const aspectRatio = "280x200"; // Desired aspect ratio for the image (vertical rectangle)
    const searchTerm = "illustration"; // Change the search term to find illustrative images
    const unsplashUrl = `https://source.unsplash.com/random/${aspectRatio}/?${searchTerm}&${Date.now()}`;

    const nextSongImage = new Image();
    nextSongImage.src = unsplashUrl;

    // Ensure the image is fully loaded before changing the song
    nextSongImage.onload = function () {
      // Replace the album cover with the next song's image
      albumCover.src = nextSongImage.src;
    };
  }

  // Function to toggle play/pause
  function togglePlayPause() {
    // console.log("Toggle play/pause called");
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    isPlaying = !isPlaying;
    playPauseButton.innerHTML = isPlaying
      ? '<i class="fas fa-pause"></i>'
      : '<i class="fas fa-play"></i>';
  }
  //Function to update the duration of the audio when it is loaded
  audio.onloadeddata = function () {
    const currentTime = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    timeDisplay.textContent = currentTime + " / " + duration;
  }

  // Event listener for timeupdate to update the progress bar
  audio.addEventListener("timeupdate", function () {
    const progress = (audio.currentTime / audio.duration) * 100;
    const currentTime = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);

    progressBar.style.width = progress + "%";
    indicator.style.left = progress + "%";
    timeDisplay.textContent = currentTime + " / " + duration;
  });

  // Event listener for when the song changes
  audio.addEventListener("ended", function () {
    resetProgressBar();
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadAndPlayCurrentSong();
  });

  // Function to reset the progress bar when the song changes
  function resetProgressBar() {
    progressBar.style.width = "0%";
    indicator.style.left = "0%";
    timeDisplay.textContent = "0:00 / 0:00";
  }

  // Event listener for the play/pause button
  playPauseButton.addEventListener("click", togglePlayPause);

  function playNextSong() {
    resetProgressBar();
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadAndPlayCurrentSong();
  }

  // Event listener for the next button
  nextButton.addEventListener("click", playNextSong);

  function playPreviousSong() {
    resetProgressBar();
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadAndPlayCurrentSong();
  }

  // Event listener for the previous button
  prevButton.addEventListener("click", playPreviousSong);



  // Function to format time (e.g., "0:00")
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return formattedTime;
  }



    const fontButton = document.getElementById("font-button");

    fontButton.addEventListener("click", function () {
        changeFont();
    });

    function changeFont() {
        const fontSelector = document.getElementById('font-selector');
        const selectedFont = fontSelector.value;
        const musicPlayer = document.getElementById('Music');

        musicPlayer.style.fontFamily = selectedFont;
    }

    // Load and play the initial song
    loadAndPlayCurrentSong();

});

// Function to change the theme for the dropdown container
function changeDropdownTheme(selectedTheme) {
  const dropdownContainer = document.querySelector('.theme-dropdown-container');
  dropdownContainer.className = `theme-dropdown-container ${selectedTheme}`;
}

// Theme selector event listener
document.getElementById('theme-selector').addEventListener('change', function () {
  const selectedOption = this.options[this.selectedIndex];
  const selectedTheme = selectedOption.getAttribute('data-theme');

  // Apply the selected theme to the page and the dropdown container
  document.body.className = selectedTheme;
  document.getElementById('music').className = selectedTheme;
  changeDropdownTheme(selectedTheme);
});

// Set the initial theme based on the selected option
changeDropdownTheme(document.getElementById('theme-selector').options[0].getAttribute('data-theme'));

