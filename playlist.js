
const audio = document.getElementById("audio");
const playlist = document.querySelectorAll("#playlist li");
const title = document.getElementById("song-title");
const playBtn = document.getElementById("play");
const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("prev");
const img = document.getElementById("song-image");

let currentIndex = -1;
let isPlaying = false;

function loadSong(index) {
  const song = playlist[index];
  const src = song.getAttribute("data-src");
  const image = song.getAttribute("data-image"); 

  audio.src = src;
  title.textContent = song.textContent;
  highlightActive(index);

  if (image) {
    img.src = image;
  }

  currentIndex = index;
}

function playSong() {
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
}

function pauseSong() {
  audio.pause();
  isPlaying = false;
  playBtn.textContent = "▶️";
}

function highlightActive(index) {
  playlist.forEach((li, i) => {
    li.classList.toggle("active", i === index);
  });
}

// زرار التشغيل
playBtn.addEventListener("click", () => {
  if (currentIndex === -1) {
    loadSong(0);
  }

  isPlaying ? pauseSong() : playSong();
});

// لما تدوسي على أغنية
playlist.forEach((song, index) => {
  song.addEventListener("click", () => {
    loadSong(index);
    playSong();
  });
});

// زر next
nextBtn.addEventListener("click", () => {
  if (currentIndex === -1) {
    loadSong(0);
  } else {
    let next = (currentIndex + 1) % playlist.length;
    loadSong(next);
  }
  playSong();
});

// زر prev
prevBtn.addEventListener("click", () => {
  if (currentIndex === -1) {
    loadSong(playlist.length - 1);
  } else {
    let prev = (currentIndex - 1 + playlist.length) % playlist.length;
    loadSong(prev);
  }
  playSong();
});

// لما الأغنية تخلص
audio.addEventListener("ended", () => {
  let next = (currentIndex + 1) % playlist.length;
  loadSong(next);
  playSong();
});
