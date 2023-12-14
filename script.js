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
  let supportsMediaSession = false;

  // Check the MediaSession API support of browser
  if ('mediaSession' in navigator) {
    supportsMediaSession = true;
    console.log('Media Session API is supported');
  }

  // Array of songs with titles and image URLs
  const songs = [
    { title: "Happy Song", src: "songs/happy-song.mp3", artist: "Artist 1" },
    { title: "Let it Go", src: "songs/let-it-go.mp3", artist: "Artist 2" },
    { title: "Summer Walk", src: "songs/summer-walk.mp3", artist: "Artist 3" },
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

  if (supportsMediaSession) {
    navigator.mediaSession.setActionHandler('nexttrack', () => {
      playNextSong();
      console.log('Next track button pressed');
    });

    navigator.mediaSession.setActionHandler('previoustrack', () => {
      playPreviousSong();
      console.log('Previous track button pressed');
    });

    navigator.mediaSession.setActionHandler('pause', () => {
      if (isPlaying) {
        togglePlayPause();
      }
      console.log('Pause button pressed');
    });

    navigator.mediaSession.setActionHandler('play', () => {
      if (!isPlaying) {
        togglePlayPause();
      }
      console.log('Play button pressed');
    });
  }

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

    if (supportsMediaSession) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: songs[currentSongIndex].title,
        artist: songs[currentSongIndex].artist,
        album: 'Example Album Name',
      });
    }

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
var color_selection=document.querySelectorAll('.select_color')
var color_array=['#81CACF','#E68398','#7EDE80'];
var container=document.querySelector('.container');
var image=document.querySelector('.image-container');
color_selection.forEach(item =>{
  item.addEventListener('click',()=>{
    var getItemNumber=item.getAttribute('data-number');
    document.body.style.background=color_array[getItemNumber-1];
    container.style.background='none';
  })
})
