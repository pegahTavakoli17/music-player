let track_index = 0;
let current_track = document.createElement("audio");
let track_pic = document.querySelector(".track-pic");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");
let now_playing = document.querySelector(".now-playing");
let current_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");
let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let playpause_btn = document.querySelector(".playpause-track");
let wave = document.getElementById("wave");
let random_icon = document.querySelector(".fa-random");
let repeat_icon = document.querySelector(".fa-repeat");
let isRandom = false;
let isPlaying = false;
let isRepeated = false;
let updateTimer;
const music_list = [
  {
    img: "image/sokoot-babak.jpeg",
    music: "music/sokoot.mp3",
    name: "sokoot",
    artist: "babak jahanbakhsh",
  },
  {
    img: "image/habibi.jpeg",
    music: "music/Habibi.mp3",
    name: "habibi",
    artist: "sogand & zakhmi",
  },
  {
    img: "image/Daste-Man-Nist.jpg",
    music: "music/daste-man-nist.mp3",
    name: "daste man nist",
    artist: "shadmehr",
  },
];
loadTrack(track_index);
function loadTrack(track_index) {
  clearInterval(updateTimer);
  reset();
  current_track.src = music_list[track_index].music;
  current_track.load();
  track_pic.style.backgroundImage = "url(" + music_list[track_index].img + ")";
  now_playing.textContent =
    "playing music " + (track_index + 1) + " of " + music_list.length;
  track_name.textContent = music_list[track_index].name;
  track_artist.textContent = music_list[track_index].artist;
  updateTimer = setInterval(() => {
    setUpdate();
  }, 1000);
  current_track.addEventListener("ended", nextTrack);
  random_bg_color();
}
function random_bg_color() {
  let hex = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "a",
    "b",
    "c",
    "d",
    "e",
  ];
  function populate(a) {
    for (let i = 0; i < 6; i++) {
      let x = Math.round(Math.random() * 14);
      let y = hex[x];
      a += y;
    }
    return a;
  }
  let color1 = populate("#");
  let color2 = populate("#");
  let direction = "to right";
  let gradient =
    "linear-gradient(" + direction + "," + color1 + "," + color2 + ")";
  document.body.style.background = gradient;
}
function reset() {
  current_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}
function randomTrack() {
  isRandom ? pauseRandom() : playRandom();
}
function playRandom() {
  isRandom = true;
  random_icon.classList.remove("text-white");
  random_icon.classList.add("activeIcon");
  let random_index = Math.floor(Math.random() * music_list.length);
  loadTrack(random_index);
}
function pauseRandom() {
  isRandom = false;
  random_icon.classList.remove("activeIcon");
  random_icon.classList.add("text-white");
}
function repeatTrack() {
  if (isRepeated) {
    isRepeated = false;
    repeat_icon.classList.remove("text-white");
    repeat_icon.classList.add("activeIcon");
    loadTrack(track_index); // Pass track_index instead of current_index
    playTrack();
  } else if (!isRepeated) {
    isRepeated = true;
    repeat_icon.classList.add("text-white");
    repeat_icon.classList.remove("activeIcon");
  }
}
function playpauseTrack() {
  isPlaying ? pauseTrack() : playTrack();
}
function playTrack() {
  current_track.play();
  isPlaying = true;
  track_pic.classList.add("rotate");
  wave.classList.add("loader");
  playpause_btn.innerHTML =
    '<i class="fas fa-pause-circle fa-5x text-white"></i>';
  seek_slider.style.color = blue;
}
function pauseTrack() {
  current_track.pause();
  isPlaying = false;
  track_pic.classList.remove("rotate");
  wave.classList.remove("loader");
  playpause_btn.innerHTML =
    '<i class="fas fa-play-circle fa-5x text-white"></i>';
  seek_slider.style.background =
    "linear-gradient(to right, blue " +
    seek_slider.value +
    "%, rgb(199, 199, 241) " +
    seek_slider.value +
    "%)";
}
function nextTrack() {
  if (
    track_index < music_list.length - 1 &&
    isRandom === false &&
    isRepeated === false
  ) {
    track_index += 1;
  } else if (
    track_index < music_list.length - 1 &&
    isRandom === true &&
    isRepeated === false
  ) {
    let random_index = Number.parseInt(Math.random() * music_list.length);
    track_index = random_index;
  } else if (
    track_index < music_list.length - 1 &&
    isRandom === false &&
    isRepeated === true
  ) {
    let repeat_index = track_index;
    track_index = repeat_index;
  } else {
    track_index = 0;
  }
  loadTrack(track_index);
  playTrack();
}
function prevTrack() {
  if (track_index == 0) {
    track_index = music_list.length - 1;
  } else {
    track_index -= 1;
  }
  loadTrack(track_index);
  playTrack();
}
function seekTo() {
  let seekToSecond = (current_track.duration / 100) * seek_slider.value;
  current_track.currentTime = seekToSecond;
}
function setVolume() {
  current_track.volume = volume_slider.value / 100;
  volume_slider.style.background = `linear-gradient(to right, blue ${volume_slider.value}% ,rgb(199, 199, 241) ${volume_slider.value}%)`;
}
function setUpdate() {
  let seekPosition = 0;
  let blue = "blue";
  if (!isNaN(current_track.duration)) {
    volume_slider.style.background = `linear-gradient(to right, blue ${volume_slider.value}% ,rgb(199, 199, 241) ${volume_slider.value}%)`;

    let progress = (current_track.currentTime / current_track.duration) * 100;
    seek_slider.style.background = `linear-gradient(to right, blue ${progress}%, rgb(199, 199, 241) ${progress}%)`;
    seekPosition = current_track.currentTime * (100 / current_track.duration);
    seek_slider.value = seekPosition;
    let currentMinute = Math.floor(current_track.currentTime / 60);
    let currentSecond = Math.floor(
      current_track.currentTime - currentMinute * 60
    );
    let durationMinute = Math.floor(current_track.duration / 60);
    let durationSecond = Math.floor(
      current_track.duration - durationMinute * 60
    );
    if (currentSecond < 10) {
      currentSecond = "0" + currentSecond;
    }
    if (currentMinute < 10) {
      currentMinute = "0" + currentMinute;
    }
    if (durationMinute < 10) {
      durationMinute = "0" + durationMinute;
    }
    if (durationSecond < 10) {
      durationSecond = "0" + durationSecond;
    }
    current_time.textContent = currentMinute + " : " + currentSecond;
    total_duration.textContent = durationMinute + " : " + durationSecond;
    seek_slider.style.color = blue;
  }
}
