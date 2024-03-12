songs_files = [
  '18021402-jazz-pop-piano-japan-afternoon-155522.mp3',
  'aesthetics-138637.mp3',
  'chill-lofi-song-8444.mp3',
  'after-you-176672.mp3',
  'close-study-relax-chillhop-calm-study-lofi-123089.mp3',
  'japanese-garden-139092.mp3',
  'jazzy-hip-hop-boom-bap-111861.mp3',
  'lofi-beat-140856.mp3',
  'chillhop-beat-quotthousand-milesquot-113254.mp3',
  'empty-mind-118973.mp3',
  'good-night-160166.mp3',
  'hip-hop-is-112772.mp3',
  'jazz-happy-110855.mp3',
  'a-jazz-piano-110481.mp3',
  'old-clock-chill-lofi-beats-instrumental-hip-hop-170542.mp3',
  'once-in-paris-168895.mp3',
  'soft-lofi-beat-95425.mp3',
  'still-lofi-chillhop-study-beat-164548.mp3',
  'sweet-breeze-167504.mp3',
  'lo-fi-chill-128218.mp3',
  'lofi-chill-140858.mp3',
  'melody-remastered-116741.mp3',
  'night-jazz-111372.mp3',
  'rain-and-nostalgia-version-60s-10820.mp3',
  'rampb-129648.mp3',
  'restaurant-music-110483.mp3',
  'street-food-112193.mp3',
  'sunset-vibes-lo-fichillhop-9503.mp3',
  'swing-110485.mp3'
];

class AudioControl {
    audio_object;
    allocate;
    currentIndex = 0;
    audioTime = 0;
    all_settings = [];
    LocalStorageKey = "settings";
    materialize;
    User_settings = {};

    constructor() {
        this.materialize = new Materialize();
        this.allocate = new AllocateData();
        this.createAudio();
        this.DefaultEventHandler();
        this.initSwitchFeature();
        this.makeUserSettings();
        this._this = this;
    }

    DefaultEventHandler() {
        this.audio_object.onended = () => {
            this.audio_object.pause();
            this.audio_object.currentTime = 0;
            this.setReportIcon("play_arrow");
        }

    }

    createAudio() {
        const file_name = songs_files[this.currentIndex];
        const file_path = `assets/songs/${file_name}`
        const audio = new Audio(file_path);
        this.audio_object = audio;
        this.setAudioTitle(file_name.replace(".mp3", ""));
        this.setReportIcon("play_arrow");
        this.setAudioTimeFormat();
    }

    switchButton() {
        if (this.audio_object.paused) {
            this.audio_object.play();
            this.setReportIcon("pause");
        } else {
            this.audio_object.pause();
            this.setReportIcon("play_arrow");

            if (this.getLocalStorage().collect_time) {
                this.allocate.saveAudioTime(this.audioTime, this.currentIndex);
            }
        }
    }

    nextAudio() {
        this.currentIndex += 1;
        let last_index = songs_files.length - 1;
        if (this.currentIndex > last_index) {
            this.currentIndex = 0;
        }
        this.changeAudio();
        this.audio_object.play();
    }

    previousAudio() {
        this.currentIndex -= 1;
        let last_index = songs_files.length - 1;
        if (this.currentIndex < 0) {
            this.currentIndex = last_index;
        }
        this.changeAudio();
        this.audio_object.play();
    }

    changeAudio() {
        this.audio_object.pause();
        this.audio_object.currentTime = 0;
        this.audio_object.src = `assets/songs/${songs_files[this.currentIndex]}`;
        const audio_name = songs_files[this.currentIndex].replace(".mp3", "");
        this.setAudioTitle(audio_name);
        this.setReportIcon("pause");

        if (this.getLocalStorage().notify_change) {
            this.notificationChange(null, audio_name, true);
        }

        if (this.getLocalStorage().collect_time) {
            console.log(this.audioTime);
            this.allocate.saveAudioTime(this.audioTime, this.currentIndex);
        }
    }

    setAudioTitle(title) {
        document.getElementById("name").innerText = title;
    }

    setReportIcon(icon) {
        document.getElementById("play_pause").innerText = icon;
    }

    audioTimeFormatConvertion(full_seconds) {
        let minuets = Math.floor(full_seconds / 60);
        let seconds = Math.floor(full_seconds % 60);

        let second_char = seconds >= 10 ? `${seconds}` : `0${seconds}`;
        return `${minuets}:${second_char}`;
    }

    setAudioTimeFormat() {
        this.audio_object.onloadedmetadata = () => {
            let full_time = this.audioTimeFormatConvertion(this.audio_object.duration);
            let display_format = "0:00" + " / " + full_time;
            document.getElementById("time").innerText = display_format;
        }
        this.audio_object.ontimeupdate = () => {
            let full_time = this.audioTimeFormatConvertion(this.audio_object.duration);
            let currentAudioTime = this.audioTimeFormatConvertion(this.audio_object.currentTime);
            this.audioTime = this.audio_object.currentTime;
            document.getElementById("time").innerText = currentAudioTime + " / " + full_time;
        }
    }

    initSwitchFeature() {
        const settings = document.getElementsByTagName("input");
        for (let i in settings) {
            let element = settings[i]
            if (element.type === "checkbox") {
                this.all_settings.push(element.id);
                element.onchange = (e) => {
                    this.triggerSwitchSettings(e);
                }
            }
        }
    }

    triggerSwitchSettings(event) {
        this.createLocalStorage(event.srcElement.id, event.srcElement.checked);
        if (event.srcElement.checked) {
            document.getElementById(event.srcElement.id).checked = true;
            this.makeUserSettings(event);
        } else {
            if (event.srcElement.name === "data") {
                this.allocate.removeFeatureData(event.srcElement.id);
            } else {
                this.createLocalStorage(event.srcElement.id, false);
            }
        }
    }

    createLocalStorage(feature_key, value) {
        const user_settings = this.getLocalStorage();
        user_settings[feature_key] = value;
        localStorage.setItem(this.LocalStorageKey, JSON.stringify(user_settings));
    }

    getLocalStorage() {
        let data_value = localStorage.getItem(this.LocalStorageKey);

        // Create default user settings.
        if (data_value === null) {
            const temp_obj = {};
            let collect_key = [];
            this.all_settings.forEach((key) => {
                temp_obj[key] = false;
            })
            const json_str = JSON.stringify(temp_obj);
            localStorage.setItem(this.LocalStorageKey, json_str);
            data_value = json_str;
        }

        return JSON.parse(data_value);
    }

    makeUserSettings(event) {
        this.User_settings = this.getLocalStorage();

        // Every functions is run only on document started.
        const features_function = {
            "autoplay": this.autoPlay,
            "notify_change": this.notificationChange,
            "collect_time": this.putBackAudioTime,
            "collect_video": this.collectVideo
        }

        // Call each features functions from localstorage.
        // Get enable features.
        for (const [key, value] of Object.entries(this.User_settings)) {
            const _this = this;
            if (value) {
                document.getElementById(key).checked = true;
                features_function[key](_this);
            }
        }
    }

    /**
     *  So, Every functions below this comment,
     *  Is's a music feature that about playing.
    **/
    notificationChange(_this, audio_name, state) {
        if (state) {
            M.toast({ html: `${audio_name} are playing`, classes: 'teal rounded' })
        }
    }

    putBackAudioTime(_this) {
        let audio_data = _this.allocate.getFeatureData();

        if (audio_data === null) {
            _this.allocate.createFeatureData("time", 0);
            audio_data = _this.allocate.createFeatureData("audio_index", 0);
        } else if ("time" in audio_data && "audio_index" in audio_data) {
            // Crete audio with data in localstorage.
            _this.audio_object.pause();
            _this.audio_object.currentTime = audio_data.time;
            _this.audio_object.src = `assets/songs/${songs_files[audio_data.audio_index]}`;
            const audio_name = songs_files[audio_data.audio_index].replace(".mp3", "");
            _this.setAudioTitle(audio_name);
            _this.setReportIcon("play_arrow");

            // Set audio state.
            _this.audioTime = audio_data.time;
            _this.currentIndex = audio_data.audio_index;
        }

    }

    collectVideo(_this) {
        let localData = _this.allocate.getFeatureData();
        const index = document.getElementById("video-select").options.selectedIndex;
        if (localData === null) {
            console.log(index);
            localData = _this.allocate.createFeatureData("video_index", index);
        } else {
            document.getElementById('video-select').options.selectedIndex = localData.video_index;
        }
    }

    autoPlay(_this) {
        _this.audio_object.onended = () => {
            const autoplay = _this.getLocalStorage().autoplay;
            if (autoplay) {
                _this.nextAudio();
            } else {
                this.audio_object.pause();
                this.audio_object.currentTime = 0;
                this.setReportIcon("play_arrow");
            }
        }
    }

}


class AllocateData {
    LocalStoragekey = "data";
    constructor() {};

    saveAudioTime(time, index) {
        console.log("Start save!");
        this.createFeatureData("time", time);
        this.createFeatureData("audio_index", index);

        return this.getFeatureData();
    }


    getFeatureData() {
        const data = localStorage.getItem(this.LocalStoragekey);
        return JSON.parse(data);
    }

    createFeatureData(feature_key, value) {
        let json_object = {};
        const localData = localStorage.getItem(this.LocalStoragekey);

        if (localData === null) {
            json_object[feature_key] = String(value);
        } else {
            const json = JSON.parse(localData);
            json[feature_key] = String(value);
            json_object = json;
        }
        localStorage.setItem(this.LocalStoragekey, JSON.stringify(json_object));

        return json_object;
    }

    removeFeatureData(feature_key) {
        const localData = this.getFeatureData();

        if (feature_key === "collect_time") {
            delete localData["audio_index"];
            delete localData["time"];
        } else if (feature_key === "collect_video"){
            delete localData["video_index"];
        }

        if (!Object.keys(localData).length) {
            this.removeData();
        } else {
            localStorage.setItem(this.LocalStoragekey, JSON.stringify(localData));
        }
    }

    removeData() {
        localStorage.removeItem(this.LocalStoragekey);
    }

}

class WebControl {
    materialize;
    allocate;
    user_settings;

    constructor() {
        this.materialize = new Materialize();
        this.allocate = new AllocateData();
        this.onSelect();
    };

    onSelect() {
        const select = document.getElementById("video-select");
        this.materialize.changeVideoBackground();

        select.onchange = (e) => {
            materialize.changeVideoBackground();
            const is_collect = JSON.parse(localStorage.getItem("settings")).collect_video;
            if (is_collect) {
                this.allocate.createFeatureData("video_index", e.srcElement.selectedIndex);
            }
        }
    }

}


class Materialize {
    constructor() {
        this.slideNavInit();
        this.selectInit();
    }

    slideNavInit() {
        const slidenav = document.querySelectorAll('.sidenav');
        M.Sidenav.init(slidenav, {
            inDuration: 350,
            outDuration: 350
        });
    }

    selectInit() {
        const select = document.querySelectorAll('select');
        M.FormSelect.init(select);
    }

    // Change by selected index.
    changeVideoBackground() {
        const video = document.getElementById("video_player");
        const select = document.getElementById("video-select");
        const selected_index = select.options.selectedIndex;
        const src = select[selected_index].value;
        video.src = src;
        video.load();
        video.play();
    }

}

const audio_control = new AudioControl();
const web_control = new WebControl();
const materialize = new Materialize();

document.onload = web_control;
document.onload = materialize;