const audioSource = [
    {
        "src": "assets/songs/lofi-chill-140858.mp3",
        "name": "lofi-chill"
    },
    {
        "src": "assets/songs/aesthetics-138637.mp3",
        "name": "aesthetics"
    },
    {
        "src": "assets/songs/empty-mind-118973.mp3",
        "name": "empty-mind"
    },
    {
        "src": "assets/songs/fashion-show-113553.mp3",
        "name": "fashion-show"
    },
    {
        "src": "assets/songs/a-jazz-piano-110481.mp3",
        "name": "a-jazz-piano"
    },
    {
        "src": "assets/songs/hip-hop-is-112772.mp3",
        "name": "hip-hop-is"
    },
    {
        "src": "assets/songs/lo-fi-chill-128218.mp3",
        "name": "lo-fi-chill"
    },
    {
        "src": "assets/songs/soon-fool-moon-151644.mp3",
        "name": "soon-fool-moon"
    },
    {
        "src": "assets/songs/sunset-vibes-lo-fichillhop-9503.mp3",
        "name": "sunset-vibes-lo-fichillhop"
    },
    {
        "src": "assets/songs/jazz-happy-110855.mp3",
        "name": "jazz-happy"
    },
];

let display_time = document.getElementById("time");
let toggleButton = document.getElementById("tb");
let currentSong = audioSource[0];
let songName = currentSong.name;
let songSrc = currentSong.src;
let audio = new Audio(songSrc);
let state = false;
let duration = 0;

$(document).ready(function () {
    $(audio).on("loadedmetadata", function () {
        duration = audio.duration;
        display_time.innerHTML = `00:00 / ${timeFormat(duration)}`;
    });

    $(audio).on("ended", function () {
        toggleSound("next");
    });

    $('#pb').on("click", function () {
        toggleSound("previous");
    });

    $('#nb').on("click", function () {
        toggleSound("next");
    });

    $('#tb').on("click", function (e) {
        toggleSound("toggle");
    });
    $('#dn').html(songName);
});

function timeFormat(default_duration) {
    if (!isNaN(default_duration)) {
        const minutes = Math.floor(default_duration / 60);
        const minutesFormat = minutes < 10 ? `0${minutes}` : `${minutes}`;

        const seconds = Math.floor(default_duration % 60);;
        const secondsFormat = seconds < 10 ? `0${seconds}` : `${seconds}`;

        return `${minutesFormat}:${secondsFormat}`;
    } else {
        return "00:00";
    }
}

function toggleSound(query) {
    state = !state;
    let currentIndex = audioSource.findIndex((ele) => ele.name === currentSong.name);

    if (query === "toggle") {
        togglePlay();
        return;
    }

    if (query === "next") {
        next();
        return;
    }

    if (query === "previous") {
        previous();
        return;
    }

    function togglePlay() {
        if (state) {
            audio.play();
            toggleButton.innerHTML = "Pause";

            audio.ontimeupdate = function () {
                const minutes = `${timeFormat(audio.currentTime)}`;
                const seconds = `${timeFormat(duration)}`;
                display_time.innerHTML = `${minutes} / ${seconds}`;
            }
        } else {
            audio.pause();
            toggleButton.innerHTML = "Play";
        }
    }

    function onChange() {
        songSrc = currentSong.src;
        songName = currentSong.name;
        $('#dn').html(songName);
        audio.src = songSrc;
        audio.load();
        togglePlay();
    }

    function next() {
        state = !state;

        if (currentIndex === audioSource.length - 1) {
            currentSong = audioSource[0];
        } else {
            currentSong = audioSource[currentIndex + 1];
        }

        onChange();
    }

    function previous() {
        state = !state;

        if (currentIndex === 0) {
            currentSong = audioSource[audioSource.length - 1];
        } else {
            currentSong = audioSource[currentIndex - 1];
        }

        onChange();
    }
}