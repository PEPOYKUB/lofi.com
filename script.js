let audioList;
let audio;
let state = false;
let currentIndex;
let currentName;
let duration = 0;

$(document).ready(function() {
    getAudioData();
});

async function getAudioData() {
    const url = "https://apiii-tdx7.onrender.com/song";

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const request = await fetch(url, requestOptions);
    const json = await request.json();

    createAudio(json);
}

function createAudio(json) {
    audioList = json;
    rand_num = Rand_Audio(json);

    file_name = audioList[rand_num].src;
    src = `assets/songs/${file_name}`;
    audio = new Audio(src);

    currentIndex = rand_num;
    currentName = audioList[rand_num].name;
    $('#name').html(currentName);

    onEvent();
}

function onEvent() {

    $(audio).on("loadedmetadata", function () {
        duration = audio.duration;
        time_info = `00:00 / ${timeFormat(duration)}`;
        $('#time').html(time_info);
    });

    $(audio).on('ended', function() {
        next(audio);
    });

    $(audio).on('timeupdate', function() {
        ontimeUpdate();
    });

    $('#play_pause').on('click', function() {
        toggleAudio(audio);
    });

    $('#next').on('click', function() {
        next(audio);
    });

    $('#previous').on('click', function() {
        previous(audio);
    });
}

function toggleAudio(audio) {

    state = !state;

    if (state) {
        $('#play_pause').attr('class', 'bi bi-pause');
        audio.play();
    } else {
        $('#play_pause').attr('class', 'bi bi-play');
        audio.pause();
    }
}

function next(audio) {

    if (currentIndex === audioList.length-1) {
        currentIndex = 0;
    } else {
        currentIndex += 1;
    }

    onChange(currentIndex, audio);
}

function previous(audio) {

    if (currentIndex === 0) {
        currentIndex = audioList.length - 1;
    } else {
        currentIndex -= 1;
    }

    onChange(currentIndex, audio);
}

function onChange(to, audio) {
    audio_data = audioList[to];
    name = audio_data.name;

    file_name = audio_data.src;
    src = `assets/songs/${file_name}`;
    audio.src = src;
    
    audio.load();
    audio.play();
    setInfo(name, 'pause');
}

function setInfo(name, icon) {
    $('#name').html(name);
    $('#icon').attr('class', `bi bi-${icon}`)
}

function Rand_Audio(json) {
    const rand_num = Math.floor(Math.random() * json.length);
    return rand_num;
}

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

function ontimeUpdate() {
    const minutes = `${timeFormat(audio.currentTime)}`;
    const seconds = `${timeFormat(duration)}`;
    const time = `${minutes} / ${seconds}`;
    $('#time').html(time);
}