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
/**
 * นำ button เข้ามาใช้งาน
 */
const button = document.getElementById('b-ctrl');

if (audioTime > 0) {
    button.innerHTML = "เล่นต่อที่ค้างไว้...";
}

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
         * จะสั่งให้เล่นเพลง และเปลี่ยนคำใน button จากเล่น เป็นหยุด 
         */
        audioPlayer.play();
        button.innerHTML = "Pause"
    }
    /**
     * หากว่าไม่ได้เล่นเพลงอยู่ บรรทัดด้านล่างนี้ จะถูกทำงาน
     */
    else {
        /**
         * จะสั่งให้หยุดเพลง และเปลี่ยนคำใน button จากหยุด เป็นเล่น
         */
        audioPlayer.pause();
        button.innerHTML = "Play"
    }
    /**
     * ให้เก็บเวลาปัจจุบัน
     */
    keepTime();
}

function keepTime() {
    if (state) {
        /**
         * จะกำหนดให้ค่าของตัวแปร audioTime เก็บเวลาครั้งล่าสุด เมื่อเวลาของเพลงเปลี่ยน
         */
        audioPlayer.ontimeupdate = function () {
            audioTime = audioPlayer.currentTime;
        }
    } else {
        /**
         * เมื่อกดหยุดเพลง จะให้เก็บค่าล่าสุดเอาไว้ที่ localStorage (ที่เก็บข้อมูลบนเว็บ)
         */
        window.localStorage.setItem("currentTime", audioTime);
    }
}

/**
 * ส่วนนี้ จะถูกทำงาน 
 * เมื่อผู้ใช้งานปิดแท็ปขณะฟังเพลง 
 * จะแจ้งเตือนให้ทราบอีกครั้งว่า
 * เวลาจะไม่ถูกบันทึก
 */
window.onbeforeunload = confirmExit;
function confirmExit() {
    if (state) {
        return "You have attempted to leave this page";
    }

}

function clearTime() {
    /**
     * หากว่าเล่นเพลงอยู่ในหยุดเพลง 
     * หากไม่ได้เล่น สั่งว่าไม่ต้องทำอะไร
     * ใช้การเขียนแบบ Ternary Operator ดูได้อีกที่ 
     * "https://www.techstarthailand.com/blog/detail/Write-Minified-Code-with-The-Ternary-Operator/865"
     */
    state ? audioPlayer.pause() : null;
    /**
     *  สั่งให้เปลี่ยนเวลาเป็น 0
     */
    audioPlayer.currentTime = 0;
    /**
     * สั่งให้เก็บเวลาเป็น 0
     */
    localStorage.setItem("currentTime", 0);
    /**
     * เปลี่ยนสถานะการเล่นเป็น false หมายความว่า
     * เพลงไม่ได้เล่น
     */
    state = false;
    /**
     * สั่งให้หน้าเว็บโหลดใหม่ทั้งหมด
     */
    window.location.reload();
}

