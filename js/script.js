const btn = document.getElementById('menu-btn');
const overlay = document.getElementById('overlay');
const menu = document.getElementById('mobile-menu');
const counters = document.querySelectorAll('.counter');
let scrollStarted = false;

btn.addEventListener('click', navToggle);
overlay.addEventListener('click', navToggle);
document.addEventListener('scroll', scrollPage);
document.addEventListener('scroll', scrollHeader);

function navToggle() {
  btn.classList.toggle('open');
  overlay.classList.toggle('overlay-show');
  document.body.classList.toggle('stop-scrolling')
  menu.classList.toggle('show-menu');
}

function scrollHeader() {
  const header = document.querySelector('.main-header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
}

function scrollPage() {
    const scrollPos = window.scrollY;

    if (scrollPos > 100 && !scrollStarted) {
        countUp();
        scrollStarted = true;
    } else if(scrollPos < 100 && scrollStarted) {
    reset();
    scrollStarted = false;
    }
}

function countUp() {
  counters.forEach((counter) => {
  counter.innerText = '0';

  const updateCounter = () => {
    const target = +counter.getAttribute('data-target');

    const c = +counter.innerText;

    const increment = target / 100;

    if (c < target) {

      counter.innerText = `${Math.ceil(c + increment)}`;

     setTimeout(updateCounter, 75);
    } else {
        counter.innerText = target;
    }
  };
 

  updateCounter();
   });
}

function reset() {
    counters.forEach((counter => counter.innerHTML = '0'));
}

const musicContainer = document.querySelector('.music-container')
const playBtn = document.querySelector('#play')
const prevBtn = document.querySelector('#prev')
const nextBtn = document.querySelector('#next')
const audio = document.querySelector('#audio')
const progress = document.querySelector('.progress')
const progressContainer = document.querySelector('.progress-container')
const title = document.querySelector('#title')
const cover = document.querySelector('#cover')

// Song titles
const songs = ['jupiter', 'mars', 'moon', 'star']

// Keep track of songs
let songIndex = 2

// Initially load song info DOM
loadSong(songs[songIndex])

// Update song details
function loadSong(song) {
  title.innerText = song
  audio.src = `music/${song}.mp3`
  cover.src = `img/${song}.jpg` 
}

function playSong() {
    musicContainer.classList.add('play')
    playBtn.querySelector('i.fas').classList.remove('fa-play')
    playBtn.querySelector('i.fas').classList.add('fa-pause')

    audio.play()
}

function pauseSong() {
   musicContainer.classList.remove('play')
   playBtn.querySelector('i.fas').classList.add('fa-play')
   playBtn.querySelector('i.fas').classList.remove('fa-pause')
   
   audio.pause()
}

function prevSong() {
  songIndex--

  if (songIndex < 0) {
    songIndex = songs.length - 1
  }

  loadSong(songs[songIndex])
            
  playSong()          
}

function nextSong() {
    songIndex++

  if (songIndex > songs.length - 1) {
    songIndex = 0
  }

  loadSong(songs[songIndex])
            
  playSong()          
}

function updateProgress(e) {
  const { duration, currentTime } = e.srcElement
  const progressPercent = (currentTime / duration) * 100
  progress.style.width = `${progressPercent}%`
}

function setProgress(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const duration = audio.duration

    audio.currentTime = (clickX / width) * duration
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play')

    if(isPlaying) {
      pauseSong()
    } else {
      playSong()
    }
})

//Change song events
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

audio.addEventListener('timeupdate', updateProgress)


progressContainer.addEventListener('click', setProgress)

audio.addEventListener('ended', nextSong)