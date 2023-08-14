const URL = 'https://apiii-tdx7.onrender.com/';
let audio;
let audioList;
let currentIndex;
let currentName;
let duration = 0;
let state = false;
let is_checked;
let videoSelect;
let currentVideo;

$(document).ready(function () {
    getAudioData();
    syncSetting();
});

async function getAudioData() {

    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const request = await fetch(URL + 'song', requestOptions);
    const json = await request.json();

    $('.audio-control').show();

    createAudio(json);
}

function createAudio(json) {
    audioList = json;
    rand_num = Rand_Audio(json);

    file_name = audioList[rand_num].src;
    src = URL + 'songs/' + file_name;
    audio = new Audio(src);

    currentIndex = rand_num;
    currentName = audioList[rand_num].name;
    $('#name').html(currentName);

    onEvent();
}

function onEvent() {

    $(audio).on("loadedmetadata", function () {
        loadedMetadata();
    });

    $(audio).on('ended', function () {
        next(audio);
    });

    $(audio).on('timeupdate', function () {
        ontimeUpdate();
    });

    $('#play_pause').on('click', function () {
        toggleAudio(audio);
    });

    $('#next').on('click', function () {
        next(audio);
    });

    $('#previous').on('click', function () {
        previous(audio);
    });

    $('#select').on('change', function () {
        changeBg();
    });

    $('#remember').change(function () {
        toggleSetting();
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

    if (currentIndex === audioList.length - 1) {
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
    song_name = audio_data.name;

    file_name = audio_data.src;
    src = URL + 'songs/' + file_name;
    audio.src = src;

    audio.load();
    audio.play();

    setInfo(song_name, 'pause');

    state = true;
}

function setInfo(name, icon) {
    $('#name').html(name);
    $('#play_pause').attr('class', `bi bi-${icon}`);
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

function changeBg() {
    videoSelect = $('#select').val();
    currentVideo = $('#select').prop('selectedIndex');
    $('video').attr('src', videoSelect);
    if (is_checked) {
        keep_settings();
    };
}

function loadedMetadata() {
    duration = audio.duration;
    time_info = `00:00 / ${timeFormat(duration)}`;
    $('#time').html(time_info);
}

function syncSetting() {
    let user_setting = localStorage.getItem('user_settings');
    let detail = JSON.parse(user_setting);
    let checkbox = $('#remember');

    if (detail !== null) {
        is_checked = detail.remember;
        syncData();
    }

    function syncData() {
        checkbox.prop('checked', true);
        $('video').attr('src', detail.video_src);
        $(`#select option:eq(${detail.video_current})`).prop('selected', true);
    }
}

function toggleSetting() {
    let checkbox = $('#remember');
    let is_checked = checkbox[0].checked;

    if (is_checked) {
        keep_settings();
    } else {
        restore_settings();
    }
}

function keep_settings() {
    let object = {
        remember: true,
        video_src: videoSelect,
        video_current: currentVideo
    }

    localStorage.setItem('user_settings', JSON.stringify(object));
    is_checked = true;
}

function restore_settings() {
    localStorage.removeItem('user_settings');
    is_checked = false;
}