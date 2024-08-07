const fileInput = document.getElementById('file-input');
const songList = document.getElementById('song-list');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const songTitle = document.getElementById('song-title');
const songImage = document.getElementById('song-image');

const builtInSongs = [
    {
        title: 'Song 1',
        file: 'songs/song1.mp3',
        image: 'images/dummy1.png'
    },
    {
        title: 'Song 2',
        file: 'songs/song2.mp3',
        image: 'images/dummy2.png'
    },
    {
        title: 'Song 3',
        file: 'songs/song3.mp3',
        image: 'images/dummy3.png'
    }
];

let songs = [...builtInSongs];
let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();

window.onload = () => {
    songs.forEach(song => addSongToList(song.title));
};

fileInput.addEventListener('change', (e) => {
    const files = e.target.files;
    for (let file of files) {
        const song = {
            title: file.name,
            file: URL.createObjectURL(file),
            image: 'images/default.jpg' // Default image for uploaded songs
        };
        songs.push(song);
        addSongToList(file.name);
    }
});

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = 'Play';
    } else {
        if (audio.src) {
            audio.play();
        } else if (songs.length > 0) {
            playSong(songs[currentSongIndex]);
        }
        playPauseBtn.textContent = 'Pause';
    }
    isPlaying = !isPlaying;
});

prevBtn.addEventListener('click', () => {
    if (songs.length > 0) {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        playSong(songs[currentSongIndex]);
    }
});

nextBtn.addEventListener('click', () => {
    if (songs.length > 0) {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        playSong(songs[currentSongIndex]);
    }
});

songList.addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
        const index = Array.from(songList.children).indexOf(e.target);
        currentSongIndex = index;
        playSong(songs[currentSongIndex]);
    }
});

function addSongToList(songName) {
    const li = document.createElement('li');
    li.textContent = songName;
    songList.appendChild(li);
}

function playSong(song) {
    audio.src = song.file;
    audio.play();
    songTitle.textContent = song.title;
    songImage.src = song.image;
    playPauseBtn.textContent = 'Pause';
    isPlaying = true;
}
