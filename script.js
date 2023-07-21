// song func

document.getElementById('pause-sound').style.display = 'block'
document.getElementById('play-sound').style.display = 'none'

/**
 * ดึงค่าเวลา มาจาก localStorage (ที่เก็บข้อมูลบนเว็บ)
 */
let audioTime = localStorage.getItem("currentTime");
let state = false;

/**
 * หากเวลาที่เก็บไว้ใน localStorage (ที่เก็บข้อมูลบนเว็บ) ไม่พบ จะให้เก็บข้อมูลเวลา เป็น 0
 */
if (audioTime === null) {
    window.localStorage.setItem("currentTime", 0);
}

const soundUrl = `
    https://codenameapp-d9342.web.app/static/media/DanceWithMe.9a1a56b1fb707555b523.mp3#t=${audioTime}
`;

const audioPlayer = new Audio(soundUrl);

function toggleSound() {
    /**
     * เปลี่ยนจากสถานะการฟัง เป็นอีกสถานะหนึ่ง
     */
    state = !state;

    /**
     * เช็คว่าค่าปัจจุบัน มีการเล่น หรือ หยุด
     */
    if (state) {
        /**
         * จะสั่งให้เล่นเพลง และ เปลี่ยนค่า css บางอย่าง
         */
        audioPlayer.play();
        document.getElementById('play-sound').style.display = 'block';
        document.getElementById('pause-sound').style.display = 'none';
        /**
         * จะกำหนดให้ค่าของตัวแปร audioTime เก็บเวลาครั้งล่าสุด เมื่อเวลาของเพลงเปลี่ยน
         */
        audioPlayer.ontimeupdate = function () {
            audioTime = audioPlayer.currentTime;
        }
    }
    /**
     * หากว่าไม่ได้เล่นเพลงอยู่ บรรทัดด้านล่างนี้ จะถูกทำงาน
     */
    else {
        /**
         * จะสั่งให้หยุดเพลง และ เปลี่ยนค่า css บางอย่าง
         */
        audioPlayer.pause();
        document.getElementById('play-sound').style.display = 'none';
        document.getElementById('pause-sound').style.display = 'block';

        /**
         * เมื่อกดหยุดเพลง จะให้เก็บค่าล่าสุดเอาไว้ที่ localStorage (ที่เก็บข้อมูลบนเว็บ)
         */
        window.localStorage.setItem("currentTime", audioTime);
    }
}

/**
 * บรรทัดนี้ จะถูกทำงาน 
 * เมื่อผู้ใช้งานปิดแท็ปขณะฟังเพลง 
 * เวลาจะไม่ถูกบันทึก
 */
function whenClose() {
    if (state) {
        return "";
    }
}