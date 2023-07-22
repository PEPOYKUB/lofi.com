document.getElementById('pause').style.display = 'none';
document.getElementById('play').style.display = 'block';

let auTime = localStorage.getItem('auTime');
let state = false;

if (auTime === null) {
    window.localStorage.setItem('auTime', 0);
}

const auUrl = `
    https://codenameapp-d9342.web.app/static/media/DanceWithMe.9a1a56b1fb707555b523.mp3#t=${auTime}
`;

const auPlayer = new Audio(auUrl);

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secondsRemain = Math.floor(seconds % 60);
    const minutesDisplay = String(minutes).padStart(2, '0');
    const secondsDisplay = String(secondsRemain).padStart(2, '0');
    return `${minutesDisplay}:${secondsDisplay}`;
}

function updateAudioTimeIndicator() {
    const currentTime = auPlayer.currentTime;
    const duration = auPlayer.duration;
    if (!isNaN(duration)) {
        document.getElementById('audioTimeIndicator').innerText = `${formatTime(currentTime)} / ${formatTime(duration)}`;
    }
}

function toggleSound() {
    state = !state;

    if (state) {
        auPlayer.play();
        document.getElementById('play').style.display = 'block';
        document.getElementById('pause').style.display = 'none';

        auPlayer.ontimeupdate = function () {
            auTime = auPlayer.currentTime;
            updateAudioTimeIndicator();
        };
    } else {
        auPlayer.pause();
        document.getElementById('play').style.display = 'none';
        document.getElementById('pause').style.display = 'block';

        window.localStorage.setItem("auTime", auTime);
    }
}

function whenClose() {
    if (state) {
        return "";
    }
}

document.getElementById('btn-play-pause').addEventListener('click', () => {
    toggleSound();
});

auPlayer.addEventListener('loadedmetadata', updateAudioTimeIndicator);