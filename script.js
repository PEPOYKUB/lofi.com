songs_files = [
    'a-jazz-piano-110481.mp3',
    'aesthetics-138637.mp3',
    'chill-lofi-song-8444.mp3',
    'chillhop-beat-quotthousand-milesquot-113254.mp3',
    'empty-mind-118973.mp3',
    'good-night-160166.mp3',
    'hip-hop-is-112772.mp3',
    'jazz-happy-110855.mp3',
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
    current_index = 0;
    all_settings = [];
    LocalStorageKey = "settings";
    materialize;
    User_settings = {};

    constructor() {
        this.materialize = new Materialize();
        this.allocate = new AllocateData();
        this.createAudio();
        this.EventHandler();
        this.initSwitchFeature();
        this.makeUserSettings();
    }

    EventHandler() {
        if (!this.User_settings.autoplay) {
            this.audio_object.onended = () => {
                this.audio_object.pause();
                this.audio_object.currentTime = 0;
                this.setReportIcon("play_arrow");
            }
        }
    }

    createAudio() {
        const file_name = songs_files[this.current_index];
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
        }
    }

    nextAudio() {
        this.current_index += 1;
        let last_index = songs_files.length - 1;
        if (this.current_index > last_index) {
            this.current_index = 0;
        }
        this.changeAudio(this.current_index);
    }

    previousAudio() {
        this.current_index -= 1;
        let last_index = songs_files.length - 1;
        if (this.current_index < 0) {
            this.current_index = last_index;
        }
        this.changeAudio(this.current_index);
    }

    changeAudio(index) {
        this.audio_object.pause();
        this.audio_object.currentTime = 0;
        this.audio_object.src = `assets/songs/${songs_files[index]}`;
        this.audio_object.play();

        let audio_name = songs_files[index].replace(".mp3", "");
        this.setAudioTitle(audio_name);
        this.setReportIcon("pause");

        notify_change = this.getLocalStorage().notify_change;
        if (notify_change) {
            this.notificationChange(null, audio_name, true);
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

        if (data_value === null) {
            const temp_obj = {};
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
        // console.log(this.User_settings);

        const features_function = {
            "autoplay": this.autoPlay,
            "notify_change": this.notificationChange,
            "collect_time": this.collectTime,
            "collect_video": this.collectVideo
        }

        // call each features functions from localstorage.
        for (const [key, value] of Object.entries(this.User_settings)) {
            const _this = this;
            if (value) {
                document.getElementById(key).checked = true;
                features_function[key](_this);
            }
        }
    }

    notificationChange(_this, audio_name, state) {
        if (state) {
            M.toast({ html: `${audio_name} are playing`, classes: 'teal rounded' })
        }
    }

    collectTime(event, audio_object, time) {
        console.log("Collect Time!");
    }

    // Run when document is load.
    // Run when collect video swtich button turn on.
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
        console.log("AutoPlay run!")
        _this.audio_object.onended = () => {
            if (_this.User_settings.autoplay) {
                _this.nextAudio();
            }
        }
    }

}


class AllocateData {
    LocalStoragekey = "data";
    constructor() {};

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
        delete localData[feature_key];
        if (!localData.length) {
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
        const video = document.getElementById("video");
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
