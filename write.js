const fs = require('fs');

// p = fs.readdirSync("songs/");

// // const file_name = "song.json"

// // WriteToFile("{\n")

// songs = [];

// for (let i in p) {
//     // key = `"${i}"`
//     // value = `"${p[i]}"`

//     // if (i != p.length-1) {
//     //     value = `${value},`
//     // }

//     // content = `${key}:${value}\n`
//     // WriteToFile(content);
    
// 	songs.push(p[i].replace(".mp3", ""));

// }

// console.log(songs)
// // WriteToFile("}")

// // function WriteToFile(content) {
// //     fs.writeFileSync(file_name, content, { flag: 'a'});
// // }


// // console.log(p)


const songs = ['18021402-jazz-pop-piano-japan-afternoon-155522',
    'aesthetics-138637.mp3',
    'chill-lofi-song-8444.mp3',
    'after-you-176672',
    'close-study-relax-chillhop-calm-study-lofi-123089',
    'japanese-garden-139092',
    'jazzy-hip-hop-boom-bap-111861',
    'lofi-beat-140856',
    'chillhop-beat-quotthousand-milesquot-113254.mp3',
    'empty-mind-118973.mp3',
    'good-night-160166.mp3',
    'hip-hop-is-112772.mp3',
    'jazz-happy-110855.mp3',
    'a-jazz-piano-110481.mp3',
    'old-clock-chill-lofi-beats-instrumental-hip-hop-170542',
    'once-in-paris-168895',
    'soft-lofi-beat-95425',
    'still-lofi-chillhop-study-beat-164548',
    'sweet-breeze-167504',
    'lo-fi-chill-128218.mp3',
    'lofi-chill-140858.mp3',
    'melody-remastered-116741.mp3',
    'night-jazz-111372.mp3',
    'rain-and-nostalgia-version-60s-10820.mp3',
    'rampb-129648.mp3',
    'restaurant-music-110483.mp3',
    'street-food-112193.mp3',
    'sunset-vibes-lo-fichillhop-9503.mp3',
    'swing-110485.mp3'];


songs.forEach((element, i) => {
	
	if (element.indexOf(".mp3") < 0) {
		songs[i] = element + ".mp3";
	}


})


console.log(songs.length)